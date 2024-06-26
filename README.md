# Task Manager

## Description
This is a simple task manager web application built using Express.js and EJS templating engine. It allows users to create tasks with titles and details, view existing tasks, and read task details.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/task-manager.git
   ```

2. Navigate to the project directory:
   ```bash
   cd task-manager
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## Usage
1. Start the server:
   ```bash
   npm start
   ```

2. Open your web browser and go to `http://localhost:5000` to access the application.

3. To create a new task, enter the title and details in the provided form on the homepage and click on "Create Task".

4. To view existing tasks, they will be listed on the homepage. Click on "Read More" to view the details of each task.

## Dependencies
- Express.js
- EJS

## File Structure
- `app.js`: Main server file containing the Express application setup.
- `public/`: Directory containing static assets such as CSS files.
- `views/`: Directory containing EJS templates for rendering HTML views.
  - `index.ejs`: Homepage template for displaying existing tasks and creating new tasks.
  - `content.ejs`: Template for displaying the details of a specific task.