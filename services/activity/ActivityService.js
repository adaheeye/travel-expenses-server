
export class ActivityService {
    constructor({ dao }) {
        this.dao = dao;
    }

    async createActivity(activity) {
        const errors = this.validateActivityOnCreate(activity);
        if (errors && errors.length) {
            throw new Error(errors.join(', '));
        }
        return this.dao.createActivity(activity);
    }

    async createManyActivities(activities) {
        const errors = this.validateActivityOnCreateMultiple(activities);
        if (!activities.length) {
            errors.push('No activities to save');
            return errors
        }
        if (errors && errors.length) {
            throw new Error(errors.join(', '));
        }
        return this.dao.createManyActivities(activities);
    }

    async findAllActivities() {
        return this.dao.findAllActivities();
    }

    async findActivityByParams(query) {
        if (!query._id && !query.activityName) {
            throw new Error("You need either _id, or activityName in order to query for an activity");
        }
        return this.dao.findActivityByParams(query)
    }

    async updateActivity(query, updatedActivity, upsert) {
        const errors = this.validateActivityOnUpdate(updatedActivity, query);
        if (errors && errors.length) {
            throw new Error(errors.join(', '));
        }
        return this.dao.updateActivity(query, updatedActivity, upsert)
    }

    async deleteActivity(params) {
        if (!params._id) {
            throw new Error("You need _id in order to query for an activity");
        }
        return this.dao.deleteActivity(params);
    }

    async deleteAllActivities() {
        return this.dao.deleteAllActivities();
    }

    validateActivityOnCreate(activity, index) {
        if (!activity) {
            return ["activity is required"];
        }
        const errors = [];
        if (!activity.activityName) {
            errors.push("activityName is required");
        }
        if (!activity.activityDate) {
            errors.push("activityDate is required");
        }
        if (!activity.amount) {
            errors.push("amount is required");
        }
        if (!activity.paidBy) {
            errors.push("paidBy is required");
        }
        if (!activity.owedBy) {
            errors.push("owedBy is required");
        }
        return this.getFullErrorMessage(errors, index);
    }


    getFullErrorMessage(errors, index) {
        return !!errors?.length && index ? errors.map((error) => `${error} for activity ${index + 1}`) : errors;
    }

    validateActivityOnCreateMultiple(activities) {
        const errors = [];
        activities.forEach((activity, index) => {
            errors.push(...this.validateActivityOnCreate(activity, index));
        })
        return errors;
    }

    validateActivityOnUpdate(activity, query) {
        if (!activity) {
            return ["Invalid activity"];
        }
        const errors = [];
        if (!activity._id) {
            errors.push("Invalid activity");
        }
        return errors;
    }

}
