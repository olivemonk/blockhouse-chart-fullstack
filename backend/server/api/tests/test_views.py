from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status

class APIEndpointsTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    # Candlestick Data Tests
    def test_candlestick_data_default(self):
        url = reverse('candlestick_data')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('data', response.data)

    def test_candlestick_data_custom_params(self):
        url = reverse('candlestick_data')
        response = self.client.get(url, {'start_date': '2023-06-01', 'num_days': 10})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['data']), 10)

    def test_candlestick_data_invalid_date(self):
        url = reverse('candlestick_data')
        response = self.client.get(url, {'start_date': 'invalid-date'})
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertIn('error', response.data)

    # Line Chart Data Tests
    def test_line_chart_data_default(self):
        url = reverse('line_chart_data')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('labels', response.data)
        self.assertIn('datasets', response.data)

    def test_line_chart_data_custom_years(self):
        url = reverse('line_chart_data')
        response = self.client.get(url, {'start_year': 2021, 'end_year': 2022, 'months': 6})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['labels']), 6)  # Only 6 months

    def test_line_chart_data_invalid_month(self):
        url = reverse('line_chart_data')
        response = self.client.get(url, {'months': 13})  # Invalid number of months
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.data)

    # Bar Chart Data Tests
    def test_bar_chart_data_default(self):
        url = reverse('bar_chart_data')
        response = self.client.get(url)  
        self.assertEqual(response.status_code, status.HTTP_200_OK) 
        self.assertIn('labels', response.data)  
        self.assertEqual(len(response.data['labels']), 5)

    def test_bar_chart_data_custom_products(self):
        url = reverse('bar_chart_data')
        response = self.client.get(url, {'products': ['TV', 'Laptop', 'Speaker']})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['labels']), 3)

    def test_bar_chart_data_empty_products(self):
        url = reverse('bar_chart_data')
        response = self.client.get(url, {'products': []}) 
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # Pie Chart Data Tests
    def test_pie_chart_data_default(self):
        url = reverse('pie_chart_data')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('labels', response.data)
        self.assertIn('datasets', response.data)

    def test_pie_chart_data_custom_categories(self):
        url = reverse('pie_chart_data')
        response = self.client.get(url, {'categories': ['Music', 'Sports']})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['labels']), 2)

    def test_pie_chart_data_invalid_min_max(self):
        url = reverse('pie_chart_data')
        response = self.client.get(url, {'min_value': 10000, 'max_value': 5000})  # min > max
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.data)
