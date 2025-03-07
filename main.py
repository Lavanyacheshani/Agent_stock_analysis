import os
from dotenv import load_dotenv
from loguru import logger
from backend.orchestrator import MultiAgentOrchestrator
from frontend.app import launch_streamlit

# Load environment variables
load_dotenv()

# Configure logging
logger.add("logs/multi_agent.log", rotation="500 MB")

def main():
    try:
        # Initialize the orchestrator
        orchestrator = MultiAgentOrchestrator()
        
        # Launch Streamlit app
        launch_streamlit(orchestrator)
        
    except Exception as e:
        logger.error(f"Application failed to start: {str(e)}")
        raise

if __name__ == "__main__":
    main()