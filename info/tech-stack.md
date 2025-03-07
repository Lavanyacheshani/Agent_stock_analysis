# Tech Stack

## Programming Language
- **Python 3.8+**  
  Core language for both backend and frontend development.

## Frameworks & Orchestration Tools
- **LangGraph**  
  - Manages the multi-agent workflow as a directed graph.
- **CrewAI**  
  - Orchestrates agent execution and facilitates inter-agent communication.

## External APIs
- **Yahoo Finance API**  
  - Retrieves live market data including stock prices, historical trends, and fundamentals.
- **Exa.ai API**  
  - Scrapes and summarizes real-time financial news and headlines.
- **Gemini AI API (Gemini Pro)**  
  - Provides advanced language processing for sentiment analysis and synthesis.
  - Specifically using Gemini Pro model for optimal performance in text analysis tasks.
- **Alpaca API**  
  - Offers supplemental quantitative data, trading insights, and technical indicators.

## Memory Management
- **Mem0**  
  - A centralized, shared memory module that stores intermediate outputs across agents.
  - Can be implemented as a Python dictionary for local demos or scaled with Redis in production.

## Telemetry & Monitoring
- **Langfuse**  
  - Monitors performance, token usage, and errors across all agents.
  - Provides real-time observability for debugging and performance tuning.

## Frontend
- **Streamlit**  
  - Builds an interactive, web-based dashboard for user interaction.
  - Displays real-time recommendations, sector filtering options, and telemetry data as needed.

## Additional Libraries & Tools
- **Pandas & NumPy**  
  - For data manipulation and numerical computations.
- **Matplotlib / Plotly**  
  - For data visualization and optional charting features.
- **Python Logging Module**  
  - For error handling and debugging.
- **HTML/CSS (if needed)**  
  - For custom styling in the Streamlit dashboard.

## Deployment & Environment
- **Local Deployment:**  
  - Designed for a hackathon demo with potential for future scalability.
- **Virtual Environments:**  
  - Utilize `venv` or `conda` for dependency management.
- **Version Control:**  
  - Git for source code management and collaboration.
