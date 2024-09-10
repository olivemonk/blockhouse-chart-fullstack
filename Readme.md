# Blockhouse Assignment - Chart Dashboard

## Overview

This project is a full-stack dashboard application with the frontend built using Next.js and the backend using Django. The frontend displays various charts for visualizing data, and the backend serves the data for these charts via API endpoints.

## Getting Started

You can quickly start the project using Docker or set it up manually for local development. Follow the instructions below based on your preference.

### Running with Docker

Docker Compose makes it easy to set up and run the project. It will build and start both the frontend and backend services with a single command.

1. **Clone the repository:**

   ```bash
   git clone <https://github.com/olivemonk/blockhouse.git>
   cd <repository-directory>
2. **Build and start the services:""

   ```bash
   docker-compose up --build
   ```
3. **Access the application:**

    
- **Client (Next.js):** Open [http://localhost:3000](http://localhost:3000) in your browser.
- **Backend (Django):** The backend API will be accessible at [http://localhost:8000/api](http://localhost:8000/api).

### Running Locally

If you want to run the client and backend separately in your local machine, follow these steps:

#### Backend

1. Navigate to the `backend` directory:
    ```bash
    cd backend
    ```

2. Create and activate a virtual environment:
    ```bash
    python -m venv env
    source env/bin/activate
    ```

3. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4. Run Django migrations:
    ```bash
    python server/manage.py migrate
    ```

5. Start the Django development server:
    ```bash
    python server/manage.py runserver
    ```

The backend API will be available at [http://localhost:8000/api](http://localhost:8000/api).

#### Client (Frontend)

1. Navigate to the `client` directory:
    ```bash
    cd client
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Run the Next.js development server:
    ```bash
    npm run dev
    ```

   The frontend will be available at [http://localhost:3000](http://localhost:3000).



## Technology Stack

### Backend
- **Framework**: Django with Django REST Framework
- **Containerization**: Docker
- **Key Features**:
  - RESTful API endpoints
  - Data processing for various chart types

### Frontend
- **Framework**: Next.js (React)
- **Containerization**: Docker
- **Key Libraries**:
  - axios: HTTP client for API requests
  - lightweight-charts: Interactive candlestick charts
  - recharts: Versatile chart library for React
  - react-toastify: Notification system
  - Shadcn: Reusable UI components

## Development Tools
- Docker Desktop: Container management and debugging
- lucide-react: Icon library

## Architectural Approach

1. **Containerized Microservices**
   - Separate Docker containers for frontend and backend
   - Docker Compose for orchestration

2. **API-First Development**
   - Backend API design precedes frontend implementation
   - Facilitates parallel development and clear interface definition

3. **Responsive Design**
   - Frontend optimized for various screen sizes

4. **Robust Error Handling**
   - Implemented across both frontend and backend
   - Enhances user experience and debugging efficiency

5. **Separation of Concerns**
   - Clear distinction between frontend and backend responsibilities
   - Modular architecture for easier maintenance and scalability

## Key Benefits

- **Consistency**: Containerization ensures uniform development environments
- **Scalability**: Microservices architecture allows independent scaling of frontend and backend
- **Maintainability**: Modular design and clear separation of concerns simplify updates and modifications
- **Performance**: Next.js provides server-side rendering capabilities for optimized loading times
- **Flexibility**: Combination of chart libraries allows for diverse data visualization options

This structure provides a comprehensive yet concise overview of your project, highlighting the technologies used, the architectural decisions made, and the benefits of your chosen approach.

# Backend API Endpoints Documentation

## 1. Candlestick Chart Data

**Endpoint**: `/api/candlestick-data/`
**Method**: `GET`

### Parameters:
- `start_date` (optional, string): Start date in `YYYY-MM-DD` format. Default is `2023-01-01`.
- `end_date` (optional, string): End date in `YYYY-MM-DD` format. Defaults to 30 days after the start date.
- `num_days` (optional, integer): Number of days to include in the data. Defaults to 30.

### Example:
```
GET /api/candlestick-data/?start_date=2023-06-01&end_date=2023-06-30
```

## 2. Line Chart Data

**Endpoint**: `/api/line-chart-data/`
**Method**: `GET`

### Parameters:
- `start_year` (optional, integer): The starting year for the data. Defaults to `2022`.
- `end_year` (optional, integer): The ending year for the data. Defaults to `2023`.
- `months` (optional, integer): The number of months to include in the data. Should be between 1 and 12. Defaults to `12`.

### Example:
```
GET /api/line-chart-data/?start_year=2021&end_year=2023&months=6
```

## 3. Bar Chart Data

**Endpoint**: `/api/bar-chart-data/`
**Method**: `GET`

### Parameters:
- `products[]` (optional, array of strings): List of product names to include. Defaults to `["Laptop", "Smartphone", "Tablet", "Smartwatch", "Headphones"]`.

### Example:
```
GET /api/bar-chart-data/?products[]=Laptop&products[]=Smartphone
```

## 4. Pie Chart Data

**Endpoint**: `/api/pie-chart-data/`
**Method**: `GET`

### Parameters:
- `categories[]` (optional, array of strings): List of categories to include. Defaults to `["Electronics", "Clothing", "Food & Beverages", "Books", "Home & Garden"]`.
- `min_value` (optional, integer): Minimum value for the chart data. Defaults to `1000`.
- `max_value` (optional, integer): Maximum value for the chart data. Defaults to `10000`.

### Example:
```
GET /api/pie-chart-data/?categories[]=Electronics&categories[]=Books&min_value=500&max_value=5000
```

## Error Handling

In case of incorrect input, each endpoint returns appropriate error responses with status codes like `400 Bad Request` or `500 Internal Server Error`.

## Usage Tips

- **Date Formatting**: Ensure dates are formatted as `YYYY-MM-DD` for `start_date` and `end_date` parameters.
- **Query Arrays**: For parameters like `products[]` and `categories[]`, you can append multiple values in the query string (e.g., `products[]=Laptop&products[]=Tablet`).
- **Default Values**: If no parameters are provided, each endpoint uses default values as mentioned above.

These are the available API endpoints for serving the chart data from your Django backend, designed to be flexible and handle custom date ranges and datasets as needed for the frontend visualizations.