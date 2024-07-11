# QueryCraft: Excel & SQL Formula Helper
QueryCraft is a powerful web application designed to assist users in generating and explaining Excel formulas and SQL queries based on natural language descriptions.

QueryCraft is an ideal tool for data analysts, business professionals, and anyone who regularly works with Excel or SQL but prefers a more intuitive way of generating formulas and queries. By harnessing the power of AI, QueryCraft removes the complexity and steep learning curve typically associated with these tools, empowering users to focus on their data and insights.

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Prerequisites
- Node.js (v14 or higher)
- Firebase CLI
- Git
- React
- javascript

  ## Steps
Installation
Clone the Repository
First, clone the repository from GitHub to your local machine.
git clone https://github.com/yourusername/querycraft.git
cd querycraft

Install Dependencies
Navigate to the project directory and install the necessary dependencies for both the frontend and backend.
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../backend
npm install

Firebase Setup
Set Up Firebase Project
Go to the Firebase Console.
Create a new project or use an existing one.
Register your app with Firebase.
Get your Firebase configuration and add it to firebaseConfig.js.

// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };


Set Up Firebase Hosting
Initialize Firebase in your project.

npx firebase-tools init
Select Hosting and configure the files as needed.
Deploy  app to Firebase Hosting.
npm run build
npx firebase-tools deploy --only hosting
Configuration
Create a .env file in the backend directory.
Add your OpenAI API key to the .env file.

# backend/.env
OPENAI_API_KEY=your_openai_api_key
Make sure to include the .env file in your .gitignore to prevent it from being pushed to the repository.
# .gitignore
.env
Running the Application
Start the Backend Server
Navigate to the backend directory and start the server.

cd backend
node index.js
Start the Frontend Server
cd rootdirectory
npm start

Project Structure
Directories and Files
client: Contains the React frontend code.
src: Main source code directory.
components: React components.
images: Image assets.
router: Router configuration.
utils: Utility functions for validation.
App.js: Main React component.
index.js: Entry point for the React application.
backend: Contains the Node.js backend code.
index.js: Entry point for the backend server.
.env: Environment variables for the backend.
Usage
Test Prompts for Excel
Natural Language Description: "Create a formula to sum the values in cells A1 to A10."
Excel Formula: =SUM(A1:A10)
Test Prompts for SQL
Natural Language Description: "Write a query to select all columns from the table 'users' where the 'age' is greater than 25."
SQL Query: SELECT * FROM users WHERE age > 25;


Contributing
Fork the Repository
Fork the repository on GitHub to your own account.

Create a New Branch
Create a new branch to work on your feature or bug fix.


git checkout -b feature-branch
Make Your Changes


Make the necessary changes to the codebase.

Commit Your Changes
Commit your changes with a descriptive message.


git commit -am 'Add new feature'
Push to the Branch

Push your changes to the branch on your forked repository.
git push origin feature-branch


Create a Pull Request
Create a pull request from your branch to the main branch of the original repository. Ensure you provide a detailed description of your changes.


