import mongoose from 'mongoose';

const predictionSchema = mongoose.Schema({
    fixture_id: {
        type: String,
        required: true,
    },
    score: {
        home: { type: Number, required: true },
        away: { type: Number, required: true },
    }
}, { timestamps: true });

const Prediction = mongoose.model("Prediction", predictionSchema);
export default Prediction;
