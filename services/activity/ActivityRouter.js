import { Router } from "express";
import asyncHandler from "express-async-handler"


// Create GET, POST, PUT, and DELETE endpoints

export class ActivityRouter {
    constructor({ service }) {
        this.router = new Router();
        this.service = service;

        this.router.get("/activity", asyncHandler(this.findActivityByParams.bind(this)));
        this.router.get("/activities", asyncHandler(this.findAllActivities.bind(this)));
        this.router.post("/activity", asyncHandler(this.createActivity.bind(this)));
        this.router.post("/activities", asyncHandler(this.createManyActivities.bind(this)));
        this.router.put("/activity", asyncHandler(this.updateActivity.bind(this)));
        this.router.delete("/activity/:_id", asyncHandler(this.deleteActivity.bind(this)));
        this.router.delete("/activities", asyncHandler(this.deleteAllActivities.bind(this)));
    }

    async findAllActivities(req, res) {
        const activities = await this.service.findAllActivities();
        return res.status(200).json(activities);
    }

    async findActivityByParams(req, res) {
        const activity = await this.service.findActivityByParams(req.query);
        if (activity) {
            console.log(`Found a activity in the collection with the name ${req.query.activityName}`);
            console.log(activity);
        } else {
            console.log('No activity found: ', req.query.activityName)
        }
        return res.status(200).json(activity);
    }

    // TODO
    async findActivityById(req, res) {

    }

    async createActivity(req, res) {
        const newActivity = await this.service.createActivity(req.body);
        console.log('New activity created with the following id: ', newActivity.insertedId)
        return res.status(200).json(newActivity);
    }

    async createManyActivities(req, res) {
        const activities = await this.service.createManyActivities(req.body);
        console.log('activities: ', activities)
        return res.status(200).json(activities);
    }

    async updateActivity(req, res) {
        const updatedActivity = await this.service.updateActivity(req.query, req.body, false);
        return res.status(200).json(updatedActivity);
    }

    async deleteActivity(req, res) {
        console.log('req.params: ', req.params);
        const deletedActivity = await this.service.deleteActivity(req.params);
        console.log('deletedActivity: ', deletedActivity);
        if (deletedActivity.deletedCount > 0) {
            return res.status(200).json({
                message: 'Deleted an activity'
            });
        } else {
            return res.status(404).json({
                message: 'Nothing is deleted'
            });
        }
    }

    async deleteAllActivities(req, res) {
        const deletedActivities = await this.service.deleteAllActivities();
        console.log('deletedActivity: ', deletedActivities);
        if (deletedActivities.deletedCount > 0) {
            return res.status(200).json({
                message: 'Deleted an activity'
            });
        } else {
            return res.status(404).json({
                message: 'Nothing is deleted'
            });
        }
    }
}
