# React ToDo List App

A simple and intuitive ToDo application built with React + Vite. This app allows users to create, manage, and track their tasks effectively.

## Features
   - Create new task lists.
   - View and manage existing task lists.
   - Sort tasks by title and by date.
   - Store and manage task data using Airtable database.
   - Responsive design for mobile and desktop use.
   - Intuitive navigation.

## Technologies Used
   - **React**
   - **React Router**
   - **CSS Modules**:
   - **JavaScript**:
   - **CSS**
   - **Jest**
   - **TypeScript**

## Testing
   To run tests, use the command `npm test`. Jest provides tools for creating and running tests, which helps to detect errors and improve code quality.

##  Airtable Integration
The application integrates with Airtable, a cloud-based database, to store and manage task data. It utilizes CRUD (Create, Read, Update, Delete) operations for interaction.

## Installation
To get a copy of this project running on your local machine, follow these steps:

1. Clone the repository 
2. Navigate to root directory of the app. 
3. Run `npm install` to install the dependencies.
4. Create an Airtable account at [Airtable.com](https://airtable.com) and set up a new base.

   Create a table with the following fields:

   - `title` (single line text)
   - `list` (single line text)

   Get your Airtable API key and base ID.
 
5. Create a .env file in the root directory of the project and add the following environment variables:
   ```
   VITE_AIRTABLE_API_TOKEN=your_airtable_api_token
   REACT_APP_AIRTABLE_BASE_ID=your_airtable_base_id
   REACT_APP_AIRTABLE_TABLE_NAME=your_airtable_table_name
   ```
6. Create a `config.js` file in the root directory for secure access to environment variables.
   ```
   export const apiKey = import.meta.env.VITE_AIRTABLE_API_TOKEN;
   export const baseId = import.meta.env.VITE_AIRTABLE_BASE_ID;
   export const tableName = import.meta.env.VITE_TABLE_NAME;
   ```

7. Start the development server: `npm run dev`.
8. Open the app in browser. 

## Acknowledgments
   Thanks to ***Code the Dream*** for their training and guidance.
   