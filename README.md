# Travel Expenses REST API 
A simple Express.js/Node.js REST API for managing traveler and activity data.

## Features
* Create, modify, retrieve, and delete traveler(s) and activity(ies) data.
* Organized file structure for easy maintainability.
* Built using Express.js, Node.js, and Mongoose for MongoDB integration.

## Getting Started
These instructions will help you set up and run the Travel Expenses REST API on your local machine.

## Prerequisites
* Node.js (v14 or later)
* npm (v6 or later)
* MongoDB (local or remote)

## Installation
1. Clone the repository:

```bash
git clone https://github.com/Abdirahim888/travel-expenses-server.git
cd travel-expenses-server
````

2. Install the required dependencies:

```bash
npm install
```

3. You will need to set up your Atlas URI connection:

```
ATLAS_URI=mongodb+srv://<username>:<password>@sandbox.jadwj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
```

## Running the API

```bash
npm start
```
The API will be accessible at http://localhost:3000/api/v1/

## API Endpoints

The following endpoints are available for travelers and activities. Replace :model with either traveler or activity.

## Travelers / Activities

```
GET /:model: Retrieve a specific traveler/activity by query parameters.
GET /:model/:_id: Retrieve a specific traveler/activity by ID.
GET /:model/all: Retrieve all travelers/activities.
POST /:model: Create a new traveler/activity.
POST /:model/all: Create multiple travelers/activities.
PUT /:model: Update a specific traveler/activity by query parameters.
DELETE /:model/:_id: Delete a specific traveler/activity by ID.
DELETE /:model/all: Delete all travelers/activities.
```

