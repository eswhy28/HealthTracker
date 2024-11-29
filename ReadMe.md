# Mind Body Connection: AI Health Insights

## Project Overview

This application is a comprehensive health insights platform that leverages AI agents to provide personalized wellness recommendations. The project is built using React.js for the frontend and Django for the backend, with a focus on intelligent health data analysis.

## Project Structure

```
project_root/
│
├── backend/                  # Django backend
│   └── mind_body_connection/
│       ├── data_integration/
│       │   ├── insights_generator.py
│       │   └── ...
│       └── manage.py
│
└── frontend/                 # React frontend
    └── health-dashboard/
        ├── public/
        └── src/
```

## AI Agents Architecture

### 1. Health Metrics Agent
- **Functionality**: Processes physiological data including steps, heart rate, and heart rate variability (HRV)
- **Key Features**:
  - Trend-based analysis instead of traditional regression
  - Adaptive prediction system for limited datasets
  - Contextual fitness recommendations based on metric patterns

### 2. Sleep Analysis Agent
- **Functionality**: Evaluates sleep duration and quality metrics
- **Key Features**:
  - Targeted recommendations based on sleep patterns
  - Adaptive suggestions considering sleep quality trends
  - Effective with minimal data points

### 3. Journal Sentiment Agent
- **Functionality**: Performs sentiment analysis on journal entries
- **Key Features**:
  - Uses TextBlob for natural language processing
  - Extracts and tracks emotional keywords
  - Generates mood-based recommendations

## System Design Principles
- Modular architecture allowing independent agent operation
- Cross-domain correlation for holistic insights
- Fallback mechanisms for insufficient data scenarios
- Template-based recommendation system
- Dynamic wellness score calculation

## Prerequisites
- Python 3.12
- Node.js
- npm (Node Package Manager)

## Setup and Installation

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run database migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. Load sample data:
   ```bash
   python manage.py load_mock_data
   ```
   This command will populate the database with sample datasets from the JSON files.

6. Start the Django development server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend/health-dashboard
   ```

2. Install npm dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

## Dependencies
- Backend:
  - numpy: Statistical analysis
  - pandas: Data manipulation
  - TextBlob: Natural language processing
  - Django: Web framework
- Frontend:
  - React.js
  - npm packages as specified in `package.json`

## Technical Implementation Example

```python
def analyze_trend(data_collection, metric_name):
    """
    Trend analysis with fallback for insufficient data
    
    Args:
        data_collection: Collection of data points
        metric_name: Specific metric to analyze
    
    Returns:
        Dict with trend insights and recommendations
    """
    if not data_collection:
        return {
            'trend': 'insufficient_data',
            'next_prediction': None,
            'recommendation': 'Collect more data to gain insights'
        }
    
    values = [getattr(item, metric_name) for item in data_collection]
    trend = 'increasing' if values[-1] > values[0] else 'decreasing'
    
    return {
        'trend': trend, 
        'next_prediction': values[-1]
    }
```

## Design Rationale
- Lightweight trend analysis over complex ML models
- Template-based recommendations for consistency
- Modular design for easy maintenance and scaling
- Integrated cross-domain analysis for comprehensive insights

## Future Improvements
- Expand AI agent capabilities
- Implement more advanced machine learning models
- Enhance data visualization
- Add more comprehensive health metric tracking

