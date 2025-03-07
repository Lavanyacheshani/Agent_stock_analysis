from typing import Dict, List
from loguru import logger
from crewai import Agent
from backend.memory.mem0 import Mem0

class SynthesisAgent(Agent):
    def __init__(self, mem0: Mem0):
        self.mem0 = mem0
        
        super().__init__(
            name="Synthesis & Recommendation Agent",
            goal="Synthesize data from all agents to produce final stock recommendations",
            backstory="I am an agent specialized in analyzing multiple data sources to make investment recommendations"
        )
    
    def synthesize_data(self, symbol: str) -> Dict:
        """Synthesize all available data for a specific symbol"""
        try:
            # Retrieve all data from Mem0
            market_data = self.mem0.get_market_data(symbol)
            technical_analysis = self.mem0.get_technical_analysis(symbol)
            sentiment_analysis = self.mem0.get_sentiment(symbol)
            
            if not all([market_data, technical_analysis, sentiment_analysis]):
                raise Exception(f"Missing data for {symbol}")
            
            # Calculate recommendation score (0-100)
            score = self._calculate_score(
                technical_analysis['indicators'],
                sentiment_analysis['sentiment_analysis']
            )
            
            # Generate recommendation
            recommendation = {
                'symbol': symbol,
                'company_name': market_data['company_name'],
                'sector': market_data['sector'],
                'current_price': market_data['current_price'],
                'score': score,
                'technical_summary': technical_analysis['interpretation'],
                'sentiment_summary': sentiment_analysis['sentiment_analysis'],
                'recommendation': self._get_recommendation(score)
            }
            
            return recommendation
            
        except Exception as e:
            logger.error(f"Failed to synthesize data for {symbol}: {str(e)}")
            raise
    
    def _calculate_score(self, technical_indicators: Dict, sentiment_analysis: str) -> float:
        """Calculate overall recommendation score"""
        try:
            # Technical score (0-50 points)
            technical_score = 0
            
            # RSI score (0-15 points)
            rsi = technical_indicators['rsi']
            if 40 <= rsi <= 60:
                technical_score += 15
            elif 30 <= rsi <= 70:
                technical_score += 10
            
            # MACD score (0-20 points)
            if technical_indicators['macd'] > 0:
                technical_score += 20
            
            # Moving averages score (0-15 points)
            if technical_indicators['sma_20'] > technical_indicators['sma_50']:
                technical_score += 15
            
            # Sentiment score (0-50 points)
            sentiment_score = 0
            if 'positive' in sentiment_analysis.lower():
                sentiment_score = 50
            elif 'neutral' in sentiment_analysis.lower():
                sentiment_score = 25
            
            return technical_score + sentiment_score
            
        except Exception as e:
            logger.error(f"Failed to calculate score: {str(e)}")
            return 0
    
    def _get_recommendation(self, score: float) -> str:
        """Convert score to recommendation"""
        if score >= 80:
            return "Strong Buy"
        elif score >= 60:
            return "Buy"
        elif score >= 40:
            return "Hold"
        elif score >= 20:
            return "Sell"
        else:
            return "Strong Sell"
    
    def execute_task(self, task: str) -> Dict:
        """Execute the assigned task"""
        try:
            # For demo, using a predefined list of symbols
            symbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'META']
            results = {}
            
            for symbol in symbols:
                results[symbol] = self.synthesize_data(symbol)
            
            # Sort results by score
            sorted_results = dict(sorted(
                results.items(),
                key=lambda x: x[1]['score'],
                reverse=True
            ))
            
            return sorted_results
            
        except Exception as e:
            logger.error(f"Task execution failed: {str(e)}")
            raise