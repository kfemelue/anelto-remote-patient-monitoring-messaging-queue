const express = require('express');
const patientRouter = require("./routes/patient-router")
const cors = require('cors');
const app = express();
const port = 3000;

//middleware
const bodyParser = require('body-parser');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/api/patients", patientRouter)
app.use("/api", (req, res, next) => {
    res.send("Hello World")
})

app.listen(port, () => {
    console.log(`Server Listening on port ${port}`)
})