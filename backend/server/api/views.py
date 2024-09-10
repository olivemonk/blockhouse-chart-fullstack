from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime
from .services import generate_candlestick_data
from .services import generate_line_chart_data
from .services import generate_bar_chart_data 
from .services import generate_pie_chart_data


@api_view(['GET'])
def candlestick_data(request):
    try:
        start_date_str = request.query_params.get('start_date', '2023-01-01')
        start_date = datetime.strptime(start_date_str, '%Y-%m-%d')
        num_days = int(request.query_params.get('num_days', 300))
        
        data = generate_candlestick_data(start_date, num_days)

        return Response({"data": data}, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def line_chart_data(request):
    try:
        start_year = int(request.query_params.get('start_year', 2022))  
        end_year = int(request.query_params.get('end_year', 2023))      
        months = int(request.query_params.get('months', 12))            

        if months < 1 or months > 12:
            return Response({"error": "Months parameter should be between 1 and 12."}, status=status.HTTP_400_BAD_REQUEST)

        data = generate_line_chart_data(start_year, end_year, months)

        return Response(data, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def bar_chart_data(request):
    try:
        default_products = ["Laptop", "Smartphone", "Tablet", "Smartwatch", "Headphones"]
        products = request.query_params.getlist('products', default_products)

        if len(products) == 0:
            return Response({"error": "At least one product is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        data = generate_bar_chart_data(products)

        return Response(data, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def pie_chart_data(request):
    try:
        default_categories = ["Electronics", "Clothing", "Food & Beverages", "Books", "Home & Garden"]
        categories = request.query_params.getlist('categories', default_categories)

        min_value = int(request.query_params.get('min_value', 1000))
        max_value = int(request.query_params.get('max_value', 10000))

        if min_value > max_value:
            return Response({"error": "min_value cannot be greater than max_value"}, status=status.HTTP_400_BAD_REQUEST)

        data = generate_pie_chart_data(categories, min_value, max_value)

        return Response(data, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)