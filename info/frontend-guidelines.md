# Frontend Guidelines

## Overview & Objectives

- **Purpose:**  
  Build a clean, responsive, and intuitive web interface that allows users to trigger the multi-agent stock analysis, view real-time recommendations, and filter results by sectors.

- **Primary Goals:**  
  - Present actionable stock recommendations in a clear, organized manner.
  - Allow users to filter and drill down by sector/industry.
  - Provide real-time feedback and error handling.
  - Seamlessly integrate with the backend orchestration that now includes data from both Yahoo Finance and Alpaca APIs.

## Design Principles

- **Simplicity:**  
  Keep the interface clean and minimal. Focus on essential features such as triggering analysis, displaying recommendations, and filtering by sector.

- **Clarity:**  
  Use clear labels, concise instructions, and intuitive controls so that users can easily understand the process.

- **Responsiveness:**  
  Ensure that the layout adapts well to various screen sizes. Utilize Streamlit's built-in layout features for responsiveness.

- **Consistency:**  
  Maintain a uniform visual theme across the dashboard using consistent colors, fonts, and spacing.

- **Accessibility:**  
  Follow basic accessibility guidelines (e.g., proper contrast, clear text labels, keyboard navigability) to ensure the dashboard is usable by all.

## Key UI Components

### Header & Navigation

- **Logo/Title:**  
  Display the product name (e.g., "Multi-Agent Stock Analyzer") and a brief tagline.
  
- **Navigation:**  
  Include navigation elements (or a sidebar) if additional sections (e.g., Telemetry, Help) are needed.

### Main Dashboard Area

- **"Run Analysis" Button:**  
  - A prominent button that triggers the multi-agent workflow.
  - **Guideline:** Include a loading indicator (spinner or progress bar) after the button is clicked to communicate processing status.

- **Sector Filter Widget:**  
  - A dropdown or multiselect component allowing users to select one or more sectors (e.g., Technology, Healthcare, Finance).
  - **Guideline:** Place the widget in a prominent location (top or sidebar) to allow quick filtering of results.

- **Results Display Area:**  
  - **Recommendation Cards/Table:**  
    Display the final list of recommended stocks with key metrics (e.g., stock price, trend summary, sentiment score) and brief explanations.
  - **Sector-Specific Display:**  
    When a user selects a sector, show the top 5 stocks for that sector.
  - **Guideline:** Utilize Streamlit components (`st.dataframe`, `st.markdown`, etc.) for clear and well-formatted displays.

### Feedback & Notifications

- **Loading & Status Messages:**  
  Show clear visual feedback during data processing (e.g., "Fetching market data…" or "Analyzing news sentiment…").
  
- **Error Handling:**  
  Display error messages or warnings if the analysis fails or if data is missing. Use Streamlit's `st.error` or `st.warning` to notify the user.

### Additional Information Panels

- **Telemetry/Debug Info (Optional):**  
  For administrators or developers, include a collapsible section to display telemetry logs or performance metrics (collected via Langfuse).

- **User Guide/Help Section:**  
  Provide brief tooltips or a help section that explains key terms (such as technical and sentiment analysis) for users without a financial background.

## Interaction & Workflow

1. **Login & Access:**  
   - Users access the dashboard (Streamlit app) through a simple login or direct access for the demo.

2. **Triggering Analysis:**  
   - The user clicks the **"Run Analysis"** button, which triggers the backend multi-agent process.  
   - A loading spinner/progress bar is displayed during processing.

3. **Data Display & Filtering:**  
   - The dashboard displays a ranked list of stock recommendations.
   - The sector filter widget allows the user to refine the list to top 5 stocks per selected sector.

4. **Feedback & Error Notifications:**  
   - Display status messages during the processing steps.
   - Show errors using clear messages if any step fails.

5. **Result Review:**  
   - Users review the results which include data combined from both Yahoo Finance and Alpaca APIs.  
   - Detailed metrics, trend summaries, and sentiment scores are shown for each recommended stock.

## Integration with Backend

- **API Communication:**  
  - The frontend (Streamlit) communicates with the backend by invoking a designated API endpoint or triggering the main function that executes the multi-agent workflow.
  - Ensure that the response includes data from both Yahoo Finance and Alpaca APIs, along with news and analysis results.

- **Data Handling:**  
  - Parse and format the JSON response received from the backend.
  - Display the aggregated recommendations in a user-friendly format.

## Code Organization & Best Practices

- **File Structure:**  
  Organize frontend code in a dedicated directory (e.g., `/frontend`). Example structure:
  ```
  /frontend
  ├── app.py          # Main Streamlit application
  ├── components.py   # Custom UI components and widgets
  ├── utils.py        # Helper functions for API calls and data formatting
  └── assets          # Images, CSS, and other resources
  ```

- **Modularity:**  
  Build reusable components for recommendation cards, filter widgets, and status messages.

- **Styling:**  
  - Utilize Streamlit's theming options and custom CSS (if needed) for a consistent look.
  - Keep designs simple to avoid clutter and improve user experience.

- **Documentation & Comments:**  
  Include inline comments and documentation for major functions and complex logic to enhance maintainability.

## Deployment & Testing

- **Local Testing:**  
  - Ensure the Streamlit app runs locally without errors.
  - Test all interactive components, especially the "Run Analysis" button and sector filtering.

- **User Testing:**  
  - Conduct usability testing sessions to gather feedback.
  - Refine the interface based on user input to enhance ease of use and clarity.

- **Deployment:**  
  - Deploy the Streamlit app on a local machine for the hackathon demo.
  - Consider containerizing the app (e.g., using Docker) for a consistent deployment environment in future iterations.

---

*By following these updated frontend guidelines, the development team can create an engaging, intuitive, and robust user interface that effectively displays comprehensive stock analysis results—leveraging data from both Yahoo Finance and Alpaca—while ensuring a seamless integration with the backend multi-agent system.*