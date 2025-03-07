from typing import Dict, List
from loguru import logger
from crewai import Agent
from backend.memory.mem0 import Mem0
import google.generativeai as genai
import os

class SentimentAnalysisAgent(Agent):
    def __init__(self, mem0: Mem0):
        self.mem0 = mem0
        genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
        self.model = genai.GenerativeModel('gemini-pro')
        
        super().__init__(
            name="Sentiment Analysis Agent",
            goal="Analyze news sentiment using Gemini AI API",
            backstory="I am an agent specialized in determining market sentiment from news"
        )
    
    def analyze_sentiment(self, symbol: str) -> Dict:
        """Analyze sentiment for a specific symbol"""
        try:
            # Get news data from Mem0
            news_data = self.mem0.get_news(symbol)
            if not news_data:
                raise Exception(f"No news data found for {symbol}")
            
            # Prepare news text for analysis
            news_text = "\n".join([f"Title: {article['title']}\nSummary: {article['summary']}" 
                                  for article in news_data['articles']])
            
            # Generate prompt for Gemini AI
            prompt = f"""Analyze the sentiment of these news articles about {symbol} stock:
            {news_text}
            
            Please provide:
            1. Overall sentiment (positive, neutral, or negative)
            2. Confidence score (0-1)
            3. Key sentiment drivers
            
            Format the response as a JSON object."""
            
            # Get sentiment analysis from Gemini AI
            response = self.model.generate_content(prompt)
            sentiment_analysis = response.text
            
            # Process and store results
            analysis_result = {
                'symbol': symbol,
                'sentiment_analysis': sentiment_analysis,
                'raw_news_count': len(news_data['articles'])
            }
            
            # Store in Mem0
            self.mem0.store_sentiment(symbol, analysis_result)
            
            return analysis_result
            
        except Exception as e:
            logger.error(f"Failed to analyze sentiment for {symbol}: {str(e)}")
            raise
    
    def execute_task(self, task: str) -> Dict:
        """Execute the assigned task"""
        try:
            # For demo, using a predefined list of symbols
            symbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'META']
            results = {}
            
            for symbol in symbols:
                results[symbol] = self.analyze_sentiment(symbol)
            
            return results
            
        except Exception as e:
            logger.error(f"Task execution failed: {str(e)}")
            raise