// Import necessary modules
const express = require('express');
const fs = require('fs');

// Create Express app and set up JSON middleware
const app = express();
app.use(express.json());

// Read hospital data from JSON file
const hospitalData = JSON.parse(fs.readFileSync('hospitals.json'));

// CRUD operations

// GET all hospitals
app.get('/hospitals', (req, res) => {
  res.json(hospitalData.hospitals);
});

// GET a specific hospital by name

app.get('/hospitals/:name', (req, res) => {
  const hospital = hospitalData.hospitals.find(h => h.name === req.params.name);
  if (!hospital) return res.status(404).send('Hospital not found.');
  res.send(hospital);
  console.log(hospital);
});


// POST a new hospital

app.post('/hospitals', (req, res) => {
  const hospital = {
    name: req.body.name,
    patientCount: req.body.patientCount,
    location: req.body.location
  };
  hospitalData.hospitals.push(hospital);
  fs.writeFileSync('hospitalData.json', JSON.stringify(hospitalData));
  res.send(hospital);
  
});


// PUT (update) an existing hospital
app.put('/hospitals/:name', (req, res) => {
  let hospital = hospitalData.hospitals.find(h => h.name !== req.params.name);
  if (!hospital) return res.status(404).send('Hospital not found.');

  hospital.patientCount = req.body.patientCount;
  hospital.location = req.body.location;

  fs.writeFileSync('hospitalData.json', JSON.stringify(hospitalData));
  res.send(hospital);
});


// DELETE an existing hospital
app.delete('/hospitals/:name', (req, res) => {
  const index = hospitalData.hospital.findIndex(h => h.name === req.params.name);
  if (index===0) return res.status(404).send('Hospital not found.');

  hospitalData.splice(index, 1);

  fs.writeFileSync('hospitalData.json', JSON.stringify(hospitalData));
  res.send('Hospital removed.');
});


// Start server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
