const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

// Load environment variables from config file
dotenv.config({ path: './config.env' });

//Instance of the Express application
const app = express();
const port = process.env.PORT || 5000;

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors({ origin: '*' }));

// Use middleware to parse JSON request bodies
app.use(express.json());
app.use(bodyParser.json());


// Define a default route
app.all('*', (req, res) => {
  res.status(200).send('Hello world');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
