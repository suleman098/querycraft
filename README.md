# QueryCraft

QueryCraft is a web application designed to assist users in generating and explaining Excel formulas and SQL queries based on natural language descriptions. The application leverages the OpenAI GPT-3.5-turbo model to provide accurate and helpful responses to user queries.

## Prerequisites

- Node.js (v14 or higher)
- Firebase CLI
- Git
- React
- JavaScript

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/querycraft.git
cd querycraft
```

### 2. Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd client
npm install
```

### 3. Configuration

#### Create and Configure `.env` File for OpenAI API Key

1. Create a `.env` file in the `backend` directory.
2. Add your OpenAI API key to the `.env` file.


# backend/.env
OPENAI_API_KEY=your_openai_api_key


3. Make sure to include the `.env` file in your `.gitignore` to prevent it from being pushed to the repository.


# .gitignore
`.env`


### 4. Running the Application

#### Start the Backend Server

Navigate to the `backend` directory and start the server.

```bash
cd backend
node index.js
```

#### Start the Frontend Server

Navigate to the `client` directory and start the React application.

```bash
cd client
npm start
```

### 5. Deployment

#### Build the Frontend

```bash
cd maindirectory
npm run build
```

#### Deploy to Firebase

1. Make sure you are logged in to Firebase.

```bash
npx firebase-tools login
```

2. Initialize Firebase in your project directory if you haven’t already.

```bash
npx firebase-tools init
```

3. Deploy to Firebase.

```bash
npx firebase-tools deploy
```


#### Usage
## Generating Excel Formulas
Select the "Excel" mode.
Describe the formula you need or input the formula/query in the text area.
Click "Submit".
The generated formula and explanation will appear in the output area.
## Generating SQL Queries
Select the "SQL" mode.
Describe the query you need or input the query in the text area.
Click "Submit".
The generated query and explanation will appear in the output area.
#### Technologies Used
- React
- Node.js
- Express.js
- Firebase
- OpenAI GPT-3.5-turbo
- JavaScript
  
## Contributing
If you would like to contribute to this project, please follow these steps:

## Fork the repository

Create a new branch 
```bash
git checkout -b feature/your-feature-name.
```
Make your changes.

Commit your changes 
```bash
git commit -m 'Add some feature'
```

Push to the branch 
```bash
git push origin feature/your-feature-name
```

Open a pull request.
