from loguru import logger
from typing import List, Dict
from crewai import Crew, Agent, Task
from langfuse.client import Langfuse
from backend.agents.market_data_agent import MarketDataAgent
from backend.agents.news_scraping_agent import NewsScrapingAgent
from backend.agents.technical_analysis_agent import TechnicalAnalysisAgent
from backend.agents.sentiment_analysis_agent import SentimentAnalysisAgent
from backend.agents.synthesis_agent import SynthesisAgent
from backend.memory.mem0 import Mem0

class MultiAgentOrchestrator:
    def __init__(self):
        # Initialize shared memory
        self.mem0 = Mem0()
        
        # Initialize telemetry
        self.telemetry = Langfuse()
        
        # Initialize agents
        self.market_data_agent = MarketDataAgent(self.mem0)
        self.news_scraping_agent = NewsScrapingAgent(self.mem0)
        self.technical_analysis_agent = TechnicalAnalysisAgent(self.mem0)
        self.sentiment_analysis_agent = SentimentAnalysisAgent(self.mem0)
        self.synthesis_agent = SynthesisAgent(self.mem0)
        
    def run_analysis(self, sector_filter: str = None) -> Dict:
        """Run the complete multi-agent analysis workflow"""
        try:
            # Create CrewAI crew
            crew = Crew(
                agents=[
                    self.market_data_agent,
                    self.news_scraping_agent,
                    self.technical_analysis_agent,
                    self.sentiment_analysis_agent,
                    self.synthesis_agent
                ],
                tasks=[
                    Task(description="Fetch market data from Yahoo Finance and Alpaca"),
                    Task(description="Retrieve and summarize news from Exa.ai"),
                    Task(description="Compute technical indicators"),
                    Task(description="Analyze news sentiment"),
                    Task(description="Synthesize final recommendations")
                ]
            )
            
            # Execute the workflow
            results = crew.kickoff()
            
            # Apply sector filter if specified
            if sector_filter:
                results = self._filter_by_sector(results, sector_filter)
            
            return results
            
        except Exception as e:
            logger.error(f"Analysis workflow failed: {str(e)}")
            raise
            
    def _filter_by_sector(self, results: Dict, sector: str) -> Dict:
        """Filter results by sector"""
        try:
            filtered_results = {k: v for k, v in results.items() if v.get('sector') == sector}
            return dict(sorted(filtered_results.items(), key=lambda x: x[1]['score'], reverse=True)[:5])
        except Exception as e:
            logger.error(f"Sector filtering failed: {str(e)}")
            raise