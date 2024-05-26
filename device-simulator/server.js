const express = require("express");
const app = express();
const PORT = 3001;

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint to receive data from device
app.post("/send-data", (req, res) => {
  const { reference, value } = req.body;
  console.log(`Received data from device: ${reference} - ${value}`);
  res.sendStatus(200);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
