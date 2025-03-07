from typing import Dict, List
from loguru import logger
from crewai import Agent
from backend.memory.mem0 import Mem0
import requests
import os

class NewsScrapingAgent(Agent):
    def __init__(self, mem0: Mem0):
        self.mem0 = mem0
        self.exa_api_key = os.getenv('EXA_API_KEY')
        self.exa_api_url = 'https://api.exa.ai/news/search'
        
        super().__init__(
            name="News Scraping Agent",
            goal="Fetch and summarize news articles using Exa.ai API",
            backstory="I am an agent specialized in gathering and summarizing financial news"
        )
    
    def fetch_news(self, symbol: str) -> Dict:
        """Fetch news articles for a specific symbol"""
        try:
            headers = {
                'Authorization': f'Bearer {self.exa_api_key}',
                'Content-Type': 'application/json'
            }
            
            params = {
                'query': f'{symbol} stock news',
                'limit': 10,
                'sort_by': 'date',
                'sort_order': 'desc'
            }
            
            response = requests.get(
                self.exa_api_url,
                headers=headers,
                params=params
            )
            
            if response.status_code == 200:
                articles = response.json()['articles']
                
                # Process and summarize articles
                summarized_news = {
                    'symbol': symbol,
                    'articles': [{
                        'title': article['title'],
                        'source': article['source'],
                        'date': article['date'],
                        'url': article['url'],
                        'summary': article.get('summary', '')
                    } for article in articles]
                }
                
                # Store in Mem0
                self.mem0.store_news(symbol, summarized_news)
                
                return summarized_news
            else:
                raise Exception(f"Failed to fetch news: {response.text}")
                
        except Exception as e:
            logger.error(f"Failed to fetch news for {symbol}: {str(e)}")
            raise
    
    def execute_task(self, task: str) -> Dict:
        """Execute the assigned task"""
        try:
            # For demo, using a predefined list of symbols
            symbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'META']
            results = {}
            
            for symbol in symbols:
                results[symbol] = self.fetch_news(symbol)
            
            return results
            
        except Exception as e:
            logger.error(f"Task execution failed: {str(e)}")
            raise