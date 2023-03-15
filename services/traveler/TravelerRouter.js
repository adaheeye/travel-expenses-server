import {Router} from "express";
import asyncHandler from "express-async-handler";

// Create GET, POST, PUT, and DELETE endpoints

export class TravelerRouter {
    constructor({ service }) {
        this.router = new Router();
        this.service = service;

        this.router.get("/traveler", asyncHandler(this.findTravelerByParams.bind(this)));
        this.router.get("/traveler/:_id", asyncHandler(this.findTravelerById.bind(this)));
        this.router.get("/travelers", asyncHandler(this.findAllTravelers.bind(this)));
        this.router.post("/traveler", asyncHandler(this.createTraveler.bind(this)));
        this.router.post("/travelers", asyncHandler(this.createManyTravelers.bind(this)));
        this.router.put("/traveler", asyncHandler(this.updateTraveler.bind(this)));
        this.router.delete("/traveler/:_id", asyncHandler(this.deleteTraveler.bind(this)));
        this.router.delete("/travelers", asyncHandler(this.deleteAllTravelers.bind(this)));
    }

    async findAllTravelers(req, res) {
        const travelers = await this.service.findAllTravelers()
        return res.status(200).json(travelers);
    }

    async findTravelerByParams(req, res) {
        const traveler = await this.service.findTravelerByParams(req.query);
        return res.status(200).json(traveler);
    }

    async findTravelerById(req, res) {
        if (!req?.params?._id) {
            throw new Error("You need _id in order to query for a traveler");
        }
        const traveler = await this.service.findTravelerById(req.params._id);
        return res.status(200).json(traveler);
    }

    async createTraveler(req, res) {
        const newTraveler = await this.service.createTraveler(req.body);
        console.log('newTraveler: ', newTraveler);
        return res.status(200).json(newTraveler);
    }

    async createManyTravelers(req, res) {
        const travelers = await this.service.createManyTravelers(req.body);
        console.log('travelers: ', travelers)
        return res.status(200).json(travelers);
    }

    async updateTraveler(req, res) {
        const updatedTraveler = await this.service.updateTraveler(req.query, req.body, false);
        console.log('updatedTraveler: ', updatedTraveler);
        return res.status(200).json(updatedTraveler);
    }

    async deleteTraveler(req, res) {
        console.log('req.params: ', req.params);
        if (!req?.params?._id) {
            throw new Error("You need _id in order to query for a traveler");
        }
        const deletedTraveler = await this.service.deleteTraveler(req.params._id);
        // TODO make sure we don't delete all from the frontEnd, specially `All`
        console.log('deletedTraveler: ', deletedTraveler);
        if (deletedTraveler?.deletedCount > 0) {
            return res.status(200).json({
                message: 'Deleted an Traveler'
            });
        } else {
            return res.status(404).json({
                message: 'Nothing is deleted'
            });
        }
    }

    async deleteAllTravelers(req, res) {
        const deletedTravelers = await this.service.deleteAllTravelers();
        if (deletedTravelers?.deletedCount > 0) {
            return res.status(200).json({
                message: 'Deleted an Traveler'
            });
        } else {
            return res.status(404).json({
                message: 'Nothing is deleted'
            });
        }
    }
}
