import {TravelerModel} from "./models/travel.js";
import * as mongoose from 'mongoose'


export class TravelerDao {

    async findAllTravelers() {
        return TravelerModel.find();
    }

    async findTravelerByParams(query) {
        return TravelerModel.findOne(this.getTravelerFilter(query));
    }

    async findTravelerById(_id) {
        let filter = {_id: mongoose.Types.ObjectId(_id)};
        return TravelerModel.findOne(filter);
    }

    async createTraveler(traveler) {
        return TravelerModel.create(traveler);
    }

    async createManyTravelers(travelers) {
        return TravelerModel.insertMany(travelers);
    }

    async updateTraveler(query, updatedTraveler, upsert = false) {
        return TravelerModel.findOneAndUpdate(
            this.getTravelerFilter(query),
            {$set: updatedTraveler},
            {upsert, new: true});
    }

    async deleteTraveler(_id) {
        let filter = {_id: mongoose.Types.ObjectId(_id)};
        return TravelerModel.deleteOne(filter);
    }

    async deleteAllTravelers() {
        return TravelerModel.deleteMany({});
    }

    getTravelerFilter(query) {
        let filter = {};
        // make it a case-insensitive
        if (!!query.firstName) {
            filter = {firstName: {$regex: new RegExp(query.firstName, "i")}}
        }
        if (!!query.lastName) {
            filter = {...filter, lastName: {$regex: new RegExp(query.lastName, "i")}}
        }
        if (query.lastName) {
            filter = {...filter, _id: mongoose.Types.ObjectId(query._id)}
        }
        return filter;
    }
}
