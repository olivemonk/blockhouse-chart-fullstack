# api/utils.py
from datetime import timedelta, datetime
import random

def generate_date_range(start_date, num_days):
    """Generate a list of dates starting from start_date for num_days"""
    return [start_date + timedelta(days=i) for i in range(num_days)]

def generate_candlestick_data(start_date, num_days):
    """Generate candlestick data for num_days starting from start_date"""
    dates = generate_date_range(start_date, num_days)
    
    data = [
        {
            "x": date.strftime("%Y-%m-%d"),
            "open": round(random.uniform(100, 150), 2),
            "high": round(random.uniform(150, 200), 2),
            "low": round(random.uniform(50, 100), 2),
            "close": round(random.uniform(100, 150), 2)
        }
        for date in dates
    ]
    
    return data

def generate_sales_data(year, months=12):
    
    return {
        "label": f"Sales {year}",
        "data": [random.randint(5000, 20000) for _ in range(months)]
    }

def generate_line_chart_data(start_year, end_year, months):

    labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][:months]
    datasets = [generate_sales_data(year, months) for year in range(start_year, end_year + 1)]
    
    return {
        "labels": labels,
        "datasets": datasets
    }

def generate_bar_chart_data(products):

    return {
        "labels": products,
        "datasets": [
            {
                "label": "Units Sold",
                "data": [random.randint(1000, 5000) for _ in range(len(products))]
            },
            {
                "label": "Revenue ($)",
                "data": [random.randint(50000, 200000) for _ in range(len(products))]
            }
        ]
    }

def generate_pie_chart_data(categories, min_value, max_value):
    
    return {
        "labels": categories,
        "datasets": [{
            "data": [random.randint(min_value, max_value) for _ in categories],
            "backgroundColor": [
                "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"
            ]
        }]
    }