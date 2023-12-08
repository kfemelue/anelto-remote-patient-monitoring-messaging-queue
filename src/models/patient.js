const {uuidv4, uuid} = require("uuid")

class Patient {
    constructor(
        name,
        email,
        number,
        birthdate,
        height,
        weight,
        temperature,
        pulse,
        bloodPressure,
        bloodOxygen,
        bloodSugar
        ){
        /**
         * Constructor for a new Patient 
         * @param {String} name   The full name of a patient
         * @param {String} email  The email address of a patient as a string
         * @param {String} birthdate Birthdate formatted as 'YYYY-MM-DD' String
         * @param {Number} height The height of a patient (inches)
         * @param {Number} weight The current weight of a patient (lbs)
         * @param {Number} temperature The Temp of a patient (Farenheit)
         * @param {Number} pulse  The measured pulse of a patient (bpm)
         * @param {String} bloodPressure The bloodPressure of a Patient as a string example: '120/70'
         * @param {Number} bloodOxygen The spO2 of a patient as a decimal
         * @param {Number} bloodSugar The bloodsugar of a patient (mg/dL)
         */
        this.id = uuid()
        this.name = name;
        this.email = email;
        this.number = number;
        this.birthdate = birthdate;
        this.height = height;
        this.weight = weight;
        this.temperature = temperature;
        this.pulse = pulse;
        this.bloodPressure = bloodPressure;
        this.bloodOxygen = bloodOxygen;
        this.bloodSugar = bloodSugar;
        this.timestamp = Date.now()
    }
    getValue(metric){
        return this['metric']
    }

    setValue(property, value){
        /**
         * @param {String} property The name of the class property to be modified
         * @param  value (Any Type) The new value of the class property
         */
        this['metric'] = value;
    }
}

module.exports = {
    Patient
}