
export class TravelerService {
    constructor({ dao }) {
        this.dao = dao;
    }
    async createTraveler(traveler) {
        const errors = this.validateTravelerOnCreate(traveler);
        if (errors && errors.length) {
            throw new Error(errors.join(', '));
        }
        return this.dao.createTraveler(traveler);
    }

    async createManyTravelers(travelers) {
        const errors = this.validateTravelerOnCreateMultiple(travelers);
        if (errors && errors.length) {
            throw new Error(errors.join(', '));
        }
        return this.dao.createManyTravelers(travelers);
    }

    async findAllTravelers() {
        return this.dao.findAllTravelers();
    }

    async findTravelerByParams(query) {
        if (!query._id && !query.firstName && !query.lastName) {
            throw new Error("You need either _id, firstName, or lastName in order to query for a traveler");
        }
        return this.dao.findTravelerByParams(query)
    }

    async updateTraveler(query, updatedTraveler, upsert) {
        const errors = this.validateTravelerOnUpdate(updatedTraveler, query);
        if (errors && errors.length) {
            throw new Error(errors.join(', '));
        }
        return this.dao.updateTraveler(query, updatedTraveler, upsert);
    }

    async deleteTraveler(params) {
        if (!params._id) {
            throw new Error("You need _id in order to query for a traveler");
        }
        return this.dao.deleteTraveler(params);
    }

    async deleteAllTravelers() {
        return this.dao.deleteAllTravelers();
    }

    validateTravelerOnCreate(traveler, index) {
        if (!traveler) {
            return ["traveler is required"];
        }
        const errors = [];
        if (!traveler.firstName) {
            errors.push("firstName is required");
        }
        return this.getFullErrorMessage(errors, index);
    }

    getFullErrorMessage(errors, index) {
        return !!errors?.length && index ? errors.map((error) => `${error} for traveler ${index + 1}`) : errors;
    }

    validateTravelerOnCreateMultiple(travelers) {
        const errors = [];
        if (!travelers.length) {
            errors.push('No travelers to save');
            return errors
        }
        travelers.forEach((traveler, index) => {
            errors.push(...this.validateTravelerOnCreate(traveler, index));
        })
        return errors;
    }

    validateTravelerOnUpdate(traveler, query) {
        if (!traveler) {
            return ["Invalid traveler"];
        }
        const errors = [];
        if (!query._id) {
            errors.push("Invalid traveler");
        }
        return errors;
    }
}
