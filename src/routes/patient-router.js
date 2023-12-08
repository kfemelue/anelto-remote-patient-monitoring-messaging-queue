const express = require("express");
const patientRouter = express.Router();
const {getAllPatients, getOnePatient, createPatient, updatePatientById, deletePatientById } = require("../controller/patient-data-controller");


//serviceUrl path for messaging service
patientRouter.post("/message", (req, res, next) => {
    console.log(req.body.message)
});


// API paths for providers to view patients and patient hitory
patientRouter.get("/", getAllPatients);
patientRouter.get("/:id", getOnePatient);

// API endpoints to modify and create Patient Charts based on data sent by IoT device
patientRouter.post("/add", createPatient);
patientRouter.post("/update/:id", updatePatientById);
patientRouter.delete("/:id",deletePatientById);



module.exports = patientRouter;