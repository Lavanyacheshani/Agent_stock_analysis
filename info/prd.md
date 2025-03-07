# Business Requirements Document (BRD)

## 1. Introduction

This project aims to build a real-time, AI-powered multi-agent system that analyzes the US stock market to identify the top investable stocks of the day. The system leverages a modular, multi-agent architecture—each specializing in a distinct task such as data collection, technical analysis, sentiment analysis, and synthesis—to deliver robust, data-driven stock recommendations. By integrating multiple external APIs and using a shared memory module (Mem0), the solution provides efficiency, transparency, and actionable insights for investors and financial analysts.

## 2. Objectives & Goals

### Real-Time Analysis
- Deliver up-to-date stock recommendations by processing live market data and news.

### Multi-Agent Architecture
- Implement a minimum of five specialized agents (Market Data, News Scraping, Technical Analysis, Sentiment Analysis, and Synthesis & Recommendation) to ensure clear modularity and focused processing.

### Seamless API Integrations
- Leverage four external APIs to cover both quantitative and qualitative dimensions:
  - **Yahoo Finance API** for market data
  - **Exa.ai API** for news scraping
  - **Gemini AI API** for advanced language processing and sentiment analysis
  - **Alpaca API** for supplemental quantitative data, trading insights, and technical indicators

### Efficient Memory Usage
- Utilize Mem0 as a centralized memory module to store intermediate outputs and maintain context across agents, reducing redundant API calls and computation.

### Observability
- Incorporate telemetry with Langfuse to monitor system performance, track token usage, and log any errors.

### User-Friendly Interface
- Provide a simple Streamlit dashboard that displays real-time recommendations, including a dedicated feature for sector-wise analysis.

## 3. Target Users & Roles

### Investors & Traders
- Individuals seeking data-driven stock recommendations to inform their investment strategies.

### Financial Analysts
- Professionals who require detailed, explainable insights into the reasoning behind stock recommendations.

### Product Administrators
- Team members who configure API integrations, monitor system health, and manage overall performance.

### Developers
- The technical team responsible for building, maintaining, and extending the system.

## 4. Core Features for MVP

### Multi-Agent Framework (Minimum of 5 Agents)

#### Agent 1 – Market Data Agent
- **Function**: Fetches real-time stock data—including current prices, historical trends, and fundamental metrics—from the Yahoo Finance API.
- **Output**: Stores the retrieved data in Mem0 for use by subsequent agents.

#### Agent 2 – News Scraping Agent
- **Function**: Utilizes Exa.ai to scrape recent news articles and headlines related to candidate stocks.
- **Output**: Summarizes and stores key news points in Mem0.

#### Agent 3 – Technical Analysis Agent
- **Function**: Processes market data to compute technical indicators (e.g., moving averages, RSI) that signal stock trends.
- **Output**: Provides an easy-to-understand interpretation (e.g., "This stock shows an upward trend").

#### Agent 4 – Sentiment Analysis Agent
- **Function**: Analyzes news summaries using the Gemini AI API to determine if the overall tone is positive, neutral, or negative.
- **Output**: Outputs sentiment scores that correlate with the stock's outlook.

#### Agent 5 – Synthesis & Recommendation Agent
- **Function**: Aggregates outputs from the previous agents, referencing data stored in Mem0.
- **Output**: Produces a final, ranked list of top investable stocks along with supporting rationale.

### Sector Filter & Top 5 Display

#### Feature Description
- A dedicated UI component (dropdown/multiselect) allows users to filter recommendations by industry or sector (e.g., Technology, Healthcare, Finance).
- The system displays the top 5 recommended stocks for each selected sector based on the integrated technical and sentiment analyses.

### External API Integrations
- **Yahoo Finance API**: Provides quantitative market data
- **Exa.ai API**: Scrapes and summarizes real-time news
- **Gemini AI API**: Powers advanced language processing for analysis and sentiment evaluation
- **Alpaca API**: Offers supplemental quantitative data, trading insights, and technical indicator data

### Memory Management (Mem0)
- A shared memory module that stores intermediate results to optimize performance and ensure context continuity across agents.

### Telemetry & Monitoring
- Integration with Langfuse to capture and analyze execution metrics, token usage, and error logs across all agents.

### Streamlit Dashboard
- An interactive, user-friendly interface that enables users to trigger the analysis, view overall recommendations, and filter results by sector.

## 5. Future Scope

### Enhanced Data Sources
- Integrate additional APIs (e.g., social media sentiment APIs) to further enrich the dataset.

### Additional Agents
- Incorporate specialized agents (e.g., for social media sentiment or advanced technical charting) as needed.

### Advanced Visualizations
- Expand the UI to include interactive charts, radar/spider charts, and historical performance graphs.

### Reinforcement Learning
- Implement a feedback loop that refines the recommendation logic based on historical performance data.

### Natural Language Interface
- Develop a conversational interface that allows users to query the system for detailed insights into the recommendations.

## 6. User Journey

### Login & Dashboard Access
- Users log into the Streamlit dashboard.

### Initiate Analysis
- The user clicks the "Run Analysis" button to trigger the multi-agent workflow.

### Data Collection & Processing
- **Market Data Agent**: Retrieves live data from Yahoo Finance and stores it in Mem0.
- **News Scraping Agent**: Fetches and summarizes news using Exa.ai, storing the results in Mem0.
- **Technical Analysis Agent**: Computes technical indicators and analyzes trends.
- **Sentiment Analysis Agent**: Evaluates the tone of the news using Gemini AI.

### Synthesis & Recommendation
- The Synthesis Agent aggregates all inputs from Mem0 and produces a ranked list of recommended stocks.

### Sector Filtering
- Users can select specific sectors using a dropdown or multiselect widget.
- The dashboard displays the top 5 stocks for each selected sector.

### Result Display & Telemetry Review
- Final recommendations, along with key metrics and rationale, are presented.
- Administrators can review telemetry data via Langfuse to monitor system performance.

## 7. Tech Stack

### Programming Language
- Python

### Frameworks & Orchestration
- **LangGraph**: To define and manage the multi-agent workflow as a directed graph.
- **CrewAI**: For efficient agent orchestration and inter-agent communication.

### External APIs
- **Yahoo Finance API**: For retrieving market data.
- **Exa.ai API**: For real-time news scraping and summarization.
- **Gemini AI API**: For advanced language processing and sentiment analysis.
- **Alpaca API**: For supplemental quantitative data, trading insights, and technical indicators.

### Memory Management
- **Mem0**: A centralized memory module to store and share intermediate outputs among agents.

### Telemetry & Monitoring
- **Langfuse**: To monitor performance, token usage, and system errors.

### User Interface
- **Streamlit**: For building an interactive, web-based dashboard.

### Additional Tools
- Data processing libraries (e.g., pandas, NumPy) and visualization libraries (e.g., matplotlib) as needed.

### Deployment
- Local deployment for the hackathon demo, with potential scalability options in the future.

---

*This BRD provides a comprehensive roadmap for developing the multi-agent stock analysis system, outlining clear objectives, detailed core features—including the integration of the Alpaca API—and an actionable tech stack, ensuring the solution is both robust and user-friendly.*