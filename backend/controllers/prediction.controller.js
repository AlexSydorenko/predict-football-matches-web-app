import User from '../models/user.model.js';
import Prediction from '../models/prediction.model.js';

export const getUserPredictions = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findOne({ _id: id }).populate('predictions');

        if (!user) {
            return res.status(404).json(`Couldn't get user predictions! No such user in database!`);
        }

        const userPredictions = user.predictions;

        res.status(200).json(userPredictions);

    } catch (error) {
        console.log('Error in getUserPredictions controller: ', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const addNewPrediction = async (req, res) => {
    try {
        const { userId } = req;
        const { fixture_id, score } = req.body;

        const user = await User.findOne({ _id: userId });
        const newPrediction = await Prediction.create({ fixture_id, score });

        if (!newPrediction) {
            return res.status(409).json({ error: `Couldn't add new prediction!` });
        }

        user.predictions.push(newPrediction._id);
        await user.save();

        res.status(201).json(newPrediction);

    } catch (error) {
        console.log('Error in addNewPrediction controller: ', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const updateScore = async (req, res) => {
    try {
        const { userId } = req;
        const { id: predictionId } = req.params;
        const { score: newScore } = req.body;

        const user = await User.findOne({ _id: userId });

        if (!user.predictions.includes(predictionId)) {
            console.log(predictionId);
            return res.status(403).json({ error: 'Forbidden! Have no permission to edit this prediction!' });
        }

        const updatedPrediction = await Prediction.findByIdAndUpdate(
            predictionId,
            { $set: { score: newScore } },
            { new: true }
        );

        if (!updatedPrediction) {
            return res.status(409).json({ error: `Couldn't update prediction score!` });
        }

        res.status(200).json(updatedPrediction);

    } catch (error) {
        console.log('Error in updateScore controller: ', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}
