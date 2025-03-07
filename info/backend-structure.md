# Backend Structure

## Overview

The backend is designed as a modular multi-agent system that orchestrates multiple specialized agents via LangGraph and CrewAI. It leverages a shared memory module (Mem0) to store and retrieve intermediate data, integrates with several external APIs (Yahoo Finance, Exa.ai, Gemini AI, and Alpaca), and uses Langfuse for telemetry and monitoring. This structure ensures scalability, maintainability, and efficient data flow from initial collection to final recommendation synthesis.

## Architecture Components

### Agent Components

- **Market Data Agent**
  - **Function:** Connects to both the Yahoo Finance and Alpaca APIs to fetch real-time stock data (prices, historical trends, fundamentals, trading insights).
  - **Output:** Combines the retrieved data and stores it in Mem0.
  - **Location:** `/backend/agents/market_data_agent.py`

- **News Scraping Agent**
  - **Function:** Uses the Exa.ai API to retrieve and summarize news articles and headlines for candidate stocks.
  - **Output:** Summarized news content stored in Mem0.
  - **Location:** `/backend/agents/news_scraping_agent.py`

- **Technical Analysis Agent**
  - **Function:** Processes market data from Mem0 to compute technical indicators (e.g., moving averages, RSI) that signal stock trends.
  - **Output:** Technical signals and trend analysis results.
  - **Location:** `/backend/agents/technical_analysis_agent.py`

- **Sentiment Analysis Agent**
  - **Function:** Leverages the Gemini AI API to analyze news sentiment.
  - **Output:** Sentiment scores (positive/neutral/negative) for stocks.
  - **Location:** `/backend/agents/sentiment_analysis_agent.py`

- **Synthesis & Recommendation Agent**
  - **Function:** Aggregates outputs from the above agents by reading data from Mem0.
  - **Output:** Final recommendation list of top investable stocks along with supporting rationale.
  - **Location:** `/backend/agents/synthesis_agent.py`

### Shared Memory Module (Mem0)

- **Purpose:**  
  Acts as a centralized in-memory store that allows agents to share intermediate results (e.g., market data, news summaries, analysis outputs) without redundant API calls.
- **Implementation:**  
  Can be implemented as a simple Python dictionary or scaled with an in-memory data store (e.g., Redis) if needed.
- **Location:** `/backend/memory/mem0.py`

### Orchestration Layer

- **LangGraph**
  - **Role:** Defines the multi-agent workflow as a directed graph where each node is an agent and edges represent data/control flow.
  - **Location:** `/backend/orchestration/langgraph_workflow.py`

- **CrewAI**
  - **Role:** Manages agent orchestration and inter-agent communication, ensuring proper sequencing and data passing.
  - **Location:** `/backend/orchestration/crewai_manager.py`

### External API Integration Modules

- **Yahoo Finance API Module**
  - **Function:** Wraps API calls to fetch market data, handles API key management, and parses responses.
  - **Location:** `/backend/api/yahoo_finance.py`

- **Exa.ai API Module**
  - **Function:** Interfaces with Exa.ai to retrieve and summarize news content.
  - **Location:** `/backend/api/exa_ai.py`

- **Gemini AI API Module**
  - **Function:** Provides functions to send text data for analysis and receive sentiment and synthesis outputs.
  - **Location:** `/backend/api/gemini_ai.py`

- **Alpaca API Module**
  - **Function:** Connects to the Alpaca API to retrieve supplemental market data, trading insights, and technical indicators.
  - **Location:** `/backend/api/alpaca_api.py`

### Telemetry & Monitoring

- **Langfuse Integration**
  - **Role:** Captures and logs performance metrics, token usage, and error events across all agents.
  - **Implementation:** Instrument each agent using the Langfuse SDK or decorators.
  - **Location:** `/backend/telemetry/langfuse_integration.py`

## Directory Structure

```
/backend
├── agents
│   ├── market_data_agent.py
│   ├── news_scraping_agent.py
│   ├── technical_analysis_agent.py
│   ├── sentiment_analysis_agent.py
│   └── synthesis_agent.py
├── api
│   ├── yahoo_finance.py
│   ├── exa_ai.py
│   ├── gemini_ai.py
│   └── alpaca_api.py
├── memory
│   └── mem0.py
├── orchestration
│   ├── langgraph_workflow.py
│   └── crewai_manager.py
├── telemetry
│   └── langfuse_integration.py
├── config
│   └── settings.py
└── main.py
```

## Data Flow & Error Handling

1. **User Initiation:**  
   The frontend (Streamlit) calls `main.py` to trigger the multi-agent process.

2. **Data Collection & Storage:**  
   - **Market Data Agent:**  
     Fetches stock data from Yahoo Finance and Alpaca APIs and writes results to Mem0.
   - **News Scraping Agent:**  
     Retrieves news using Exa.ai and stores summaries in Mem0.

3. **Analysis & Processing:**  
   - **Technical Analysis Agent:**  
     Reads market data from Mem0 and computes technical indicators.
   - **Sentiment Analysis Agent:**  
     Reads news summaries from Mem0 and processes sentiment via Gemini AI.
   - **Synthesis Agent:**  
     Aggregates outputs from Mem0 and synthesizes final recommendations.

4. **Telemetry & Logging:**  
   Each agent logs performance and errors via Langfuse through the telemetry integration.

5. **Final Output:**  
   The synthesized recommendations are returned to the frontend for display.
   
6. **Error Handling:**  
   - Use Python's `logging` module to capture exceptions.
   - Agents handle errors locally and propagate messages to the orchestration layer.
   - A centralized error handler in `main.py` ensures graceful degradation in case of failures.

## Deployment & Environment

- **Local Development:**  
  - Use virtual environments (`venv` or `conda`) and a `requirements.txt` file for dependency management.
  - Optionally containerize the application using Docker for consistency.

- **Scalability:**  
  - The modular structure allows horizontal scaling (e.g., using Redis for Mem0 or Kubernetes for orchestration).
  - Designed for local deployment during the hackathon, with a clear path for future scaling.

---

*This updated backend structure integrates the Alpaca API within the external API modules, ensuring a comprehensive and robust data collection process for the multi-agent stock analysis system.*