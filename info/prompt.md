# Project Setup Instructions

Cursor, please open the file named "instructions" in my repository. It contains the following documentation in Markdown format:

1. app-flow.md
2. backend-structure.md
3. frontend-guidelines.md
4. prd.md
5. project-status.md
6. tech-stack.md

Based on the guidelines in these documents, I want you to:

1. **Parse the Requirements:**  
   - Read through the entire "instructions" file to understand the multi-agent system architecture, including the data flow, backend structure, frontend guidelines, and tech stack.

2. **Set Up the Project Structure:**  
   - Create a new Python 3.8+ project that follows the architecture described under "backend-structure.md" (now included in "instructions").
   - Implement five agents: Market Data, News Scraping, Technical Analysis, Sentiment Analysis, and Synthesis & Recommendation.
   - Integrate the four external APIs (Yahoo Finance, Exa.ai, Gemini AI, and Alpaca).
   - Include the shared memory module (Mem0).

3. **Orchestration & Telemetry:**  
   - Use LangGraph and CrewAI for agent orchestration as described in the documentation.
   - Integrate Langfuse for telemetry and performance monitoring.

4. **Frontend Implementation:**  
   - Build a Streamlit dashboard as per the "frontend-guidelines.md" section in the "instructions" file.
   - Provide a "Run Analysis" button, sector filtering, and a results display area.
   - Make sure to handle error states gracefully and display loading indicators.

5. **Project Files & Organization:**  
   - Generate the code scaffolding with the necessary directories (e.g., `/backend/agents`, `/backend/api`, `/backend/memory`, etc.) as detailed in "backend-structure.md".
   - Include a `main.py` that orchestrates the entire workflow.
   - Use Python's logging module for error handling and debugging.

6. **README & Usage Instructions:**  
   - Create a README.md explaining how to install dependencies, run the project, and launch the Streamlit UI.

Please generate the initial code scaffolding now. Let me know if any clarifications are required.
