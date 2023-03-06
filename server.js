import mongoose from "mongoose";
import bodyParser from "body-parser";
import {travelerRouter} from "./services/traveler/index.js";
import {activityRouter} from "./services/activity/index.js";
import express from "express"

export const runServer = async (port, mongoUri) => {
    if (!port) {
        process.exit(1);
    }

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
    });

    const apiPath = "/api/v1";
    const app = express();

    const server = app.listen(port, () => {
        console.log(`Travel Expenses application listening on port ${port}!`);
    });

    // support parsing of application/json type post data
    app.use(bodyParser.json({limit: "10mb"})); // TODO remove the limit
    // support parsing of application/x-www-form-urlencoded post data
    app.use(bodyParser.urlencoded({limit: "10mb", extended: true})); // TODO remove the limit

    app.use(apiPath, activityRouter);
    app.use(apiPath, travelerRouter);

    app.use((error, req, res, next) => {
        console.log('error: ', error); // TODO remove this line
        res.status(error.status || 500);

        res.json({
            status: error.status,
            message: error.message,
            ...(process.env.NODE_ENV === "dev" && {stack: error.stack}),
        });
    });

    // Add headers
    app.use((req, res, next) => {
        // TODO add other accepted urls

        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', ['http://localhost:3003']);

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        // res.setHeader('Access-Control-Allow-Credentials', true);

        // Pass to next layer of middleware
        next();
    });
    return server;
};
