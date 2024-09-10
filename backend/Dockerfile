# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /server

# Copy the requirements.txt file and install any dependencies
COPY requirements.txt /server/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your Django project
COPY server /server/

# Expose port 8000 for Django development server
EXPOSE 8000

# Run Django development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
