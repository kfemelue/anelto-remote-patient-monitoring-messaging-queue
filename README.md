

## Prerequisites
- Node.js
- npm or yarn
- TypeScript
- ts-node (for development)
- axios ^1.6.0
- body-parser ^1.20.2
- concurrently ^8.2.2
- cors ^2.8.5
- express ^4.18.2
- uuidv4 ^6.2.13

## Setup

1. Clone the repository:

    ```
    git clone https://github.com/your-username/remote-patient-monitoring-messaging-queue.git
    cd remote-patient-monitoring-messaging-queue
    ```

2. Install the dependencies:

    ```
    npm install -y
    ```

   or if you are using yarn:

    ```
    yarn install
    ```

3. Start the development server:

    ```
    npm run dev-start
    ```

   or using yarn:

    ```
    yarn dev-start
    ```

   This will start both the messaging server on `http://localhost:3033` and The API server on `http://localhost:3000` concurrently


## API Endpoints
| NAME  | API Endpoint | HTTP Verb | Purpose |
| ------------- | ------------- | ------------- | ------------- |
| Index  | /api/patients/  | GET | Endpoint for Providers to current data of all Patients |
| READ | /api/patients/:id  | GET | Endpoint for Providers to select one Patient and view history |
| CREATE  | /api/patients/add  | POST | Endpoint for Providers to add a new Patient to DB |
| UPDATE  | /api/patients/update:id  | POST | Endpoint to capture Data from IOT device and Update Patient |
| DESTROY  | /api/patients/delete/:id  | DELETE | Endpoint for Providers to remove a patient from DB using id |
| LISTEN  | /api/patients/message  | POST | Endpoint to register as serviceUrl for messaging service |


### Create Patient Example
HTTP POST `http://localhost:3000/api/patients/add`

Request Body must be a json containing values formatted similarly to:
```
{
    "name" : "Charles F. Xavier",
    "email": "bossman@xmen.com",
    "number" : "540-298-2852",
    "birthdate" : "1935-07-14",
    "height" : 65,
    "weight" : 184,
    "temperature" : 96,
    "pulse" : 73,
    "bloodPressure" : "130/88",
    "bloodOxygen" : .98,
    "bloodSugar" : 95
}
```
### Update Patient Example
HTTP POST `http://localhost:3000/api/patients/update/{id}`

Request Body must be a json containing values from IoT device formatted similarly to:
```
{
    "weight" : "193",
    "temperature" : "97",
    "pulse" : "71",
    "bloodPressure" : "120/70",
    "bloodOxygen" : ".97",
    "bloodSugar" : "83"
}
```

### Additional Notes

1. Data is consistent across services, as only one service is needed to fit the use case.
2. Reliability Security and Scalability Considerations
    - Errors are handled appropriately so that causes of system failure can be reviewed.
    - In a full scale application, data should be encrypted BOTH at rest AND in trasit, in accordance with HIPAA electronic Protected Health  Information (ePHI) compliance standards.
    - For the purpose of this assessment in-memory arrays are used to store data, but a full scale application can utilize a SQL Relational  Database.
        - A SQL database enhances scalability, as multiple servers can read request from the same queue, but primary keys or unique indexes can be utilized in the DB to prevent record duplication, and ensure consistency across services.
        - Such a Database would have a Table for Patients, Providers, and Devices
        - Providers and Patients would have a Many to Many Relationship (Each Patient could have Multiple Healthcare Providers, vice versa)
        - Patients and Devices would have a one to one relationship (Assuming One Dvice is sending Patient Data to server)
