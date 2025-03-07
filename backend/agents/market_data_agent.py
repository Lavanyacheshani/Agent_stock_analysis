import yfinance as yf
from alpaca.trading.client import TradingClient
from alpaca.data.historical import StockHistoricalDataClient
from typing import Dict, List
from loguru import logger
from crewai import Agent
from backend.memory.mem0 import Mem0

class MarketDataAgent(Agent):
    def __init__(self, mem0: Mem0):
        self.mem0 = mem0
        self.alpaca_trading = TradingClient(api_key=os.getenv('ALPACA_API_KEY'), secret_key=os.getenv('ALPACA_SECRET_KEY'))
        self.alpaca_data = StockHistoricalDataClient(api_key=os.getenv('ALPACA_API_KEY'), secret_key=os.getenv('ALPACA_SECRET_KEY'))
        
        super().__init__(
            name="Market Data Agent",
            goal="Fetch and combine market data from Yahoo Finance and Alpaca APIs",
            backstory="I am an agent specialized in gathering market data from multiple sources"
        )
    
    def fetch_market_data(self, symbol: str) -> Dict:
        """Fetch market data from both Yahoo Finance and Alpaca"""
        try:
            # Fetch data from Yahoo Finance
            yf_data = yf.Ticker(symbol)
            yf_info = yf_data.info
            yf_history = yf_data.history(period='1mo')
            
            # Fetch data from Alpaca
            alpaca_asset = self.alpaca_trading.get_asset(symbol)
            alpaca_bars = self.alpaca_data.get_stock_bars(
                symbol,
                timeframe='1Day',
                start='2023-01-01'
            ).df
            
            # Combine data
            combined_data = {
                'symbol': symbol,
                'company_name': yf_info.get('longName'),
                'sector': yf_info.get('sector'),
                'current_price': yf_info.get('currentPrice'),
                'market_cap': yf_info.get('marketCap'),
                'pe_ratio': yf_info.get('forwardPE'),
                'dividend_yield': yf_info.get('dividendYield'),
                'volume': yf_info.get('volume'),
                'alpaca_tradable': alpaca_asset.tradable,
                'price_history': yf_history.to_dict(),
                'alpaca_bars': alpaca_bars.to_dict()
            }
            
            # Store in Mem0
            self.mem0.store_market_data(symbol, combined_data)
            
            return combined_data
            
        except Exception as e:
            logger.error(f"Failed to fetch market data for {symbol}: {str(e)}")
            raise
    
    def execute_task(self, task: str) -> Dict:
        """Execute the assigned task"""
        try:
            # For demo, using a predefined list of symbols
            symbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'META']
            results = {}
            
            for symbol in symbols:
                results[symbol] = self.fetch_market_data(symbol)
            
            return results
            
        except Exception as e:
            logger.error(f"Task execution failed: {str(e)}")
            raise