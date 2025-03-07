from typing import Dict, List
from loguru import logger
from crewai import Agent
from backend.memory.mem0 import Mem0
import pandas as pd
import ta

class TechnicalAnalysisAgent(Agent):
    def __init__(self, mem0: Mem0):
        self.mem0 = mem0
        
        super().__init__(
            name="Technical Analysis Agent",
            goal="Compute and analyze technical indicators for stock data",
            backstory="I am an agent specialized in technical analysis of financial markets"
        )
    
    def compute_indicators(self, symbol: str) -> Dict:
        """Compute technical indicators for a specific symbol"""
        try:
            # Get market data from Mem0
            market_data = self.mem0.get_market_data(symbol)
            if not market_data:
                raise Exception(f"No market data found for {symbol}")
            
            # Convert price history to DataFrame
            df = pd.DataFrame(market_data['price_history'])
            
            # Calculate technical indicators
            analysis = {
                'symbol': symbol,
                'indicators': {
                    'rsi': ta.momentum.RSIIndicator(df['Close']).rsi().iloc[-1],
                    'macd': ta.trend.MACD(df['Close']).macd().iloc[-1],
                    'sma_20': ta.trend.SMAIndicator(df['Close'], window=20).sma_indicator().iloc[-1],
                    'sma_50': ta.trend.SMAIndicator(df['Close'], window=50).sma_indicator().iloc[-1],
                    'bollinger_high': ta.volatility.BollingerBands(df['Close']).bollinger_hband().iloc[-1],
                    'bollinger_low': ta.volatility.BollingerBands(df['Close']).bollinger_lband().iloc[-1]
                },
                'interpretation': self._interpret_indicators(df)
            }
            
            # Store in Mem0
            self.mem0.store_technical_analysis(symbol, analysis)
            
            return analysis
            
        except Exception as e:
            logger.error(f"Failed to compute indicators for {symbol}: {str(e)}")
            raise
    
    def _interpret_indicators(self, df: pd.DataFrame) -> str:
        """Interpret the technical indicators"""
        try:
            rsi = ta.momentum.RSIIndicator(df['Close']).rsi().iloc[-1]
            macd = ta.trend.MACD(df['Close']).macd().iloc[-1]
            signal = ta.trend.MACD(df['Close']).macd_signal().iloc[-1]
            
            interpretation = []
            
            # RSI interpretation
            if rsi > 70:
                interpretation.append("Overbought conditions (RSI > 70)")
            elif rsi < 30:
                interpretation.append("Oversold conditions (RSI < 30)")
            
            # MACD interpretation
            if macd > signal:
                interpretation.append("Bullish MACD crossover")
            elif macd < signal:
                interpretation.append("Bearish MACD crossover")
            
            return " | ".join(interpretation) if interpretation else "Neutral technical indicators"
            
        except Exception as e:
            logger.error(f"Failed to interpret indicators: {str(e)}")
            return "Unable to interpret indicators"
    
    def execute_task(self, task: str) -> Dict:
        """Execute the assigned task"""
        try:
            # For demo, using a predefined list of symbols
            symbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'META']
            results = {}
            
            for symbol in symbols:
                results[symbol] = self.compute_indicators(symbol)
            
            return results
            
        except Exception as e:
            logger.error(f"Task execution failed: {str(e)}")
            raise