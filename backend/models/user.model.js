import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    points: {
        type: Number,
        default: 0
    },
    stats: {
        exact_scores: { type: Number, default: 0 },
        match_outcomes: { type: Number, default: 0 },
    },
    predictions: {
        type: Array,
        default: [],
    },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
