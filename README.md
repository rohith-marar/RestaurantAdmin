# Restaurant Admin Platform

# Overview

The Restaurant Admin Platform is a simple and responsive web application designed for restaurant administrators to manage their restaurant listings. Built using Angular, this platform allows administrators to add, update, delete, and view restaurants seamlessly. It also incorporates local storage for persisting data, ensuring that changes are saved even after the page is refreshed.

# Features

- Add Restaurant: Administrators can add new restaurants with details such as name, description, and location.
- Edit Restaurant: Allows administrators to update the details of existing restaurants.
- Delete Restaurant: Remove a restaurant from the list with a simple click.
- View Restaurants: Display a list of all restaurants with their details.
- Responsive Design: Ensures the application is user-friendly across various devices and screen sizes.

# Technologies Used

- Angular: For building the front-end of the application.
- Bootstrap: For responsive and modern UI components.
- Local Storage: For data persistence.
- Getting Started
- Prerequisites
- Node.js and npm installed.
- Angular CLI installed.

# Install dependencies:

npm install

# Run the application:

ng serve
Open your browser and navigate to http://localhost:4200.

# Usage

- Add Restaurant: Click on the "Add Restaurant" button to navigate to the form for adding a new restaurant. Fill in the details and submit.
- Edit Restaurant: Click the "Edit" button next to a restaurant to pre-load its details in the form. Update the details and submit.
- Delete Restaurant: Click the "Delete" button next to a restaurant to remove it from the list.
- View Restaurants: The main page displays a list of all restaurants. If there are no restaurants, a message prompts you to add some.

# Project Structure

- src/app/components: Contains Angular components for listing and managing restaurants.
- src/app/services: Contains services for handling restaurant data and interactions with local storage.
- src/app/models: Contains TypeScript interfaces for defining restaurant data structures.

# Contributing

Contributions are welcome! Please fork the repository and create a pull request for any enhancements, bug fixes, or new features.
