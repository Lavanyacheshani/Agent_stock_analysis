import redis
from typing import Any, Dict
from loguru import logger

class Mem0:
    def __init__(self):
        try:
            # Initialize Redis connection
            self.redis_client = redis.Redis(
                host='localhost',
                port=6379,
                db=0,
                decode_responses=True
            )
            
        except Exception as e:
            logger.error(f"Failed to initialize Mem0: {str(e)}")
            raise
    
    def store(self, key: str, value: Any) -> bool:
        """Store data in shared memory"""
        try:
            self.redis_client.set(key, str(value))
            return True
        except Exception as e:
            logger.error(f"Failed to store data in Mem0: {str(e)}")
            return False
    
    def retrieve(self, key: str) -> Any:
        """Retrieve data from shared memory"""
        try:
            value = self.redis_client.get(key)
            return value
        except Exception as e:
            logger.error(f"Failed to retrieve data from Mem0: {str(e)}")
            return None
    
    def store_market_data(self, symbol: str, data: Dict) -> bool:
        """Store market data for a specific symbol"""
        return self.store(f"market_data:{symbol}", data)
    
    def store_news(self, symbol: str, news: Dict) -> bool:
        """Store news data for a specific symbol"""
        return self.store(f"news:{symbol}", news)
    
    def store_technical_analysis(self, symbol: str, analysis: Dict) -> bool:
        """Store technical analysis results for a specific symbol"""
        return self.store(f"technical:{symbol}", analysis)
    
    def store_sentiment(self, symbol: str, sentiment: Dict) -> bool:
        """Store sentiment analysis results for a specific symbol"""
        return self.store(f"sentiment:{symbol}", sentiment)
    
    def get_market_data(self, symbol: str) -> Dict:
        """Retrieve market data for a specific symbol"""
        return self.retrieve(f"market_data:{symbol}")
    
    def get_news(self, symbol: str) -> Dict:
        """Retrieve news data for a specific symbol"""
        return self.retrieve(f"news:{symbol}")
    
    def get_technical_analysis(self, symbol: str) -> Dict:
        """Retrieve technical analysis results for a specific symbol"""
        return self.retrieve(f"technical:{symbol}")
    
    def get_sentiment(self, symbol: str) -> Dict:
        """Retrieve sentiment analysis results for a specific symbol"""
        return self.retrieve(f"sentiment:{symbol}")