import { model, Schema } from "mongoose";

// Define the traveler schema
const travelerSchema = new Schema({
    id: Number,
    firstName: { type: String, required: true, index: true },
    lastName: String
});

// Create a traveler model
export const TravelerModel = model('Traveler', travelerSchema);


