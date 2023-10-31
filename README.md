# Remote Patient Monitoring Messaging Queue

## Description

This project implements a simple messaging queue system designed for a remote patient monitoring system. The service allows for registration of listener services and provides an endpoint to enqueue messages. Messages in the queue are broadcasted to all registered listeners every 5 seconds.

## Prerequisites

- Node.js
- npm or yarn
- TypeScript
- ts-node (for development)

## Setup

1. Clone the repository:

    ```
    git clone https://github.com/your-username/remote-patient-monitoring-messaging-queue.git
    cd remote-patient-monitoring-messaging-queue
    ```

2. Install the dependencies:

    ```
    npm install
    ```

   or if you are using yarn:

    ```
    yarn install
    ```

3. Start the development server:

    ```
    npm run dev
    ```

   or using yarn:

    ```
    yarn dev
    ```

   This will start the server on `http://localhost:3033`.

## API Endpoints

### Register a Listener Service

- **Endpoint**: `POST /register`
- **Body**:
  ```json
  {
    "serviceUrl": "http://localhost:8080"
  }

### Send a Message to the Queue
- **Endpoint**: `POST /send-message`
- **Body**:
  ```json
  {
  "message": "Your message here"
  }
  ```

## Design and Implement a Microservices-based Remote Patient Monitoring System

You are tasked with designing and implementing a simplified remote patient monitoring system. The system should be capable of receiving real-time health data from patients and making it available for providers to read through an API. 
The system should provide the following capabilities.


1) Patient Data: Manage patient profiles and their historical health data. 

2) Real-time Data Processing: Processes incoming real-time health data from patient devices.

### Instructions:

***Design Document***: Create a detailed design document that outlines your proposed architecture. Include:

1) Strategies for handling real-time data processing and ensuring data consistency across services.
2) Considerations for system reliability, scalability, and security.
3) Any other relevant architectural decisions.

***Implementation***: Implement the system based on your design, focusing on:

1) RESTful endpoints for essential operations in applicable service(s).
2) Real-time data processing and communication between services.

### Submission
Please fork this repository, make your changes, and provide a link to your forked repository as your submission. Ensure that your repository is public so that it can be reviewed.

Include detailed setup and run instructions in your README, as well as any additional documentation needed to understand and test your implementation.


