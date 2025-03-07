# Application Flow

## System Flow Diagram

```mermaid
flowchart TD
    A[User Logs into Streamlit Dashboard]
    B[User Clicks "Run Analysis"]
    C[Initiate Multi-Agent Workflow]
    D[Market Data Agent fetches data from Yahoo Finance & Alpaca APIs]
    E[News Scraping Agent retrieves news from Exa.ai API]
    F[Technical Analysis Agent computes technical indicators using combined market data]
    G[Sentiment Analysis Agent processes news via Gemini AI API]
    H[Mem0 stores intermediate outputs from all agents]
    I[Synthesis & Recommendation Agent aggregates data from Mem0]
    J[Sector Filter applied (via dropdown/multiselect)]
    K[Final Recommendations Displayed on Dashboard]
    
    A --> B
    B --> C
    C --> D
    C --> E
    D --> H
    E --> H
    H --> F
    H --> G
    F --> H
    G --> H
    H --> I
    I --> K
    K --> J
```

## Detailed Step-by-Step Flow

### 1. User Login & Dashboard Access
- The user logs into the Streamlit dashboard.

### 2. Initiate Analysis
- The user clicks the **"Run Analysis"** button, which triggers the multi-agent workflow.

### 3. Multi-Agent Workflow Initiation
- The orchestration engine (via LangGraph and CrewAI) launches the agents in parallel or sequentially based on the designed workflow.

### 4. Data Collection
- **Market Data Agent**:
  - Fetches live stock data from both the **Yahoo Finance API** and the **Alpaca API**.
  - Combines the data (e.g., prices, historical trends, trading insights, technical indicators) and stores it in the shared memory module (Mem0).
- **News Scraping Agent**:
  - Retrieves the latest news articles and headlines related to candidate stocks via the **Exa.ai API**.
  - Summarizes key points and stores the results in Mem0.

### 5. Data Analysis
- **Technical Analysis Agent**:
  - Reads the aggregated market data from Mem0 (including data from both Yahoo Finance and Alpaca) and computes technical indicators (e.g., moving averages, RSI).
  - Produces an easy-to-understand interpretation of stock trends.
- **Sentiment Analysis Agent**:
  - Processes the summarized news from Mem0 using the **Gemini AI API** to determine sentiment (positive, neutral, or negative) for each stock.
  - Outputs sentiment scores reflecting the market outlook.

### 6. Data Aggregation & Synthesis
- **Synthesis & Recommendation Agent**:
  - Aggregates outputs from all agents by reading the combined results stored in Mem0.
  - Produces a final, ranked list of top investable stocks, with each recommendation supported by both quantitative metrics and qualitative insights.

### 7. Sector Filtering & Final Display
- **Sector Filter**:
  - Users can apply filters via a dropdown or multiselect widget to view the top 5 stocks within specific sectors (e.g., Technology, Healthcare).
- **Final Display**:
  - The dashboard presents the final recommendations along with key metrics and rationale.
  - Administrators can review telemetry data (via Langfuse) in a separate view if needed.

---

*This updated flow integrates the Alpaca API within the Market Data Agent, ensuring that the system leverages both Yahoo Finance and Alpaca for robust market data collection. The remaining agents and steps remain consistent, providing a comprehensive, real-time analysis pipeline for stock recommendations.*