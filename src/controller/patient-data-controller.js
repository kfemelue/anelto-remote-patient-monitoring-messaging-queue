const { timeStamp } = require("console");
const patient = require("../models/patient");

/**
 * For the purpose of this assessment, both Patients and Patient histories
 * will be stored in memory as an array of class objects
**/ 
let patientsMostRecent = [];
let patientsFullHistory = [];


const getAllPatients = (req, res, next) => {
    /**
     * This function will allow providers to fetch all of thier patients' current biometrics.
     */
    let patients = patientsMostRecent
    if (!patients){
        return res.status(404).json({"message": "Cannot Find Any Patients"})
    }
    return res.status(200).json(patients)
}

const getOnePatient = async (req, res, next) => {
    /**
     * This function will allow providers to fetch one patient's current biometrics
     * as well as a history that patient's of biometric entries.
     * email and id are used as unique identifiers for the patient.
     */
    const id = req.params.id;
    let patientCurrent = await patientsMostRecent.filter(x => x.id === id)[0]; //returns single object
    let patientHistory = patientsFullHistory.filter(x => x.email === patientCurrent.email); // returns array of objects

    if(!patientCurrent){
        res.status(404).json({message: "Cannot find Patient"})
    }

    output = {
        current: patientCurrent,
        history: patientHistory
    }

    res.status(200).json(output)
}

const createPatient = (req, res, next) => {
    body = req.body;
    let newPatient = new Patient(
        req.body.name,
        req.body.email,
        req.body.number,
        req.body.birthdate,
        req.body.height,
        req.body.weight,
        req.body.temperature,
        req.body.pulse,
        req.body.bloodPressure,
        req.body.bloodOxygen,
        req.body.bloodSugar
    );
    patientsFullHistory.push(newPatient);
    patientsMostRecent.push(newPatient);

    return res.status(200).json({newPatient})
}

const updatePatientById = async (req, res, next) => {
    /**
     * This function is used by the api to process incoming patient data from IoT device
     */
    const id = req.params.id;
    let patientCurrent = await patientsMostRecent.filter(x => x.id === id)[0];
    //add cloned object to history before updating
    let clone = Object.assign(Object.create(Object.getPrototypeOf(patientCurrent)), patientCurrent)
    patientsFullHistory.push(clone);

    // update PatientCurrent based on req.body
    weight = req.body.weight;
    temperature = req.body.temperature;
    pulse = req.body.pulse;
    bloodPressure = req.body.bloodPressure;
    bloodOxygen = req.body.bloodOxygen;
    bloodSugar = req.body.bloodSugar;
    timestamp = Date.now()
    
    patientCurrent.setValue('weight', weight)
    patientCurrent.setValue('temperature', temperature)
    patientCurrent.setValue('pulse', pulse)
    patientCurrent.setValue('bloodPressure', bloodPressure)
    patientCurrent.setValue('bloodOxygen', bloodOxygen)
    patientCurrent.setValue('bloodSugar', bloodSugar)
    patientCurrent.setValue('timestamp', timestamp)

    if (!patientCurrent){
        return res.status(500).json({message:"unable to update"});
    }
    return res.status(200).json({patientCurrent})
}

const deletePatientById = async (req, res, next) => {
    const id = req.params.id;
    let patientCurrent = await patientsMostRecent.filter(x => x.id === id)[0];
    let index = patientsMostRecent.findIndex(patientCurrent)
    delete patientsMostRecent[index]
    
    //delete history
    for (let i = 0; i < patientsFullHistory.length; i++) {
        if (patientsFullHistory[i].email === patientCurrent.email) {
            patientsFullHistory.splice(i, 1);
            i--;
        }
    }
    if (!patientCurrent){
        return res.status(404).json({message: "Patient Not Found"})
    }

    return res.status(200).json({message: "Patient Successfully Deleted"});
}

module.exports = {getAllPatients, getOnePatient, createPatient, updatePatientById, deletePatientById }