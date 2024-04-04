# eventresource backend
Tutorial for React
To run the project:
1. Clone this repo
2. Run `npm install`
3. Run `npm start`
4. note: open this server in localhost3000

# Node API

Welcome to the Node API repository! This README file provides instructions on how to configure the `server.js` file with your own database details after importing the `dump.sql` from the "EventResourceDatabase" repository.

## Configuration Steps:

### 1. Import the Database Dump

First, ensure that you have imported the `dump.sql` file from the "EventResourceDatabase" repository into your PostgreSQL database. Follow the instructions provided in the "EventResourceDatabase" repository's README file to import the database dump.

### 2. Modify the `server.js` File

Open the `server.js` file located in the root directory of this repository.

### 3. Update Database Connection Details

Locate the section of code in `server.js` where the database connection details are specified. You will typically find this near the beginning of the file.

Replace the existing database connection details with your own details. Update the following variables accordingly:

```javascript
const dbConfig = {
  user: 'your_username',
  host: 'your_host',
  database: 'your_database_name',
  password: 'your_password',
  port: 'your_port',
};
