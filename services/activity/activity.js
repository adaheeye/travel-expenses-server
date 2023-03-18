import { model, Schema } from "mongoose";


// Define the activity schema
const activitySchema = new Schema({
    id: Number,
    activityName: { type: String, required: true, index: true },
    activityDate: { type: String, required: true },
    amount: { type: Number, required: true },
    paidBy: { type: Schema.Types.ObjectId, ref: 'Traveler', required: true },
    owedBy: [{ type: Schema.Types.ObjectId, ref: 'Traveler', required: true }],
    details: String
});

// Create an activity model
export const ActivityModel = model('Activity', activitySchema);
