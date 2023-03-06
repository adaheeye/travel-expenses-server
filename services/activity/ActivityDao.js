import { ActivityModel } from "./models/activity.js";
import mongoose from "mongoose";

export class ActivityDao {

    async findAllActivities() {
        return ActivityModel.find().populate('paidBy owedBy');
    }

    async findActivityByParams(query) {
        return ActivityModel.findOne(this.getActivityFilter(query)).populate('paidBy owedBy');
    }

    async createActivity(activity) {
        return ActivityModel.create(activity)/*.populate('paidBy owedBy')*/;
    }

    async createManyActivities(activities) {
        return ActivityModel.insertMany(activities);
    }

    async updateActivity(query, updatedActivity, upsert = false) {
        return ActivityModel.findOneAndUpdate(
            this.getActivityFilter(query),
            { $set: updatedActivity },
            { upsert, new: true })
            .populate('paidBy owedBy');
    }

    async deleteActivity(params) {
        let filter = { _id: mongoose.Types.ObjectId(params._id)};
        return ActivityModel.deleteOne(filter);
    }

    async deleteAllActivities() {
        return ActivityModel.deleteMany({});
    }

    getActivityFilter(query) {
        let filter = {};
        // make it a case-insensitive
        if (query.activityName) {
            filter = { activityName:  { $regex : new RegExp(query.activityName, "i") } };
        }
        if (query._id){
            filter = {...filter, _id: mongoose.Types.ObjectId(query._id)}
        }
        return filter;
    }
}
