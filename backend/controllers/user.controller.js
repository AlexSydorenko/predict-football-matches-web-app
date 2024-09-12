import User from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
    try {
        const { userId } = req;
        
        const users = await User.find({ _id: { $ne: userId } }).select('-password');

        if (!users) {
            return res.status(404).json({ error: `Couldn't get list of all users!` });
        }

        res.status(200).json(users);

    } catch (error) {
        console.log('Error in getAllUsers controller: ', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const updateUser = async (req, res) => {
    try {
        const { userId } = req;
        const updatedUsername = req.body.username;

        const user = await User.findOne({ _id: userId });

        const existingUser = await User.findOne({ username: updatedUsername });
        if (existingUser) {
            return res.status(409).json({ error: 'User with such username already exists!' });
        }

        user.username = updatedUsername;
        await user.save();

        res.status(200).json(user);

    } catch (error) {
        console.log('Error in updateUser controller: ', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const deleteAccount = async (req, res) => {
    try {
        const { userId } = req;

        await User.deleteOne({ _id: userId });
        
        const deletedUser = await User.findOne({ _id: userId });

        if (deletedUser) {
            return res.status(404).json({ error: `Couldn't delete account!` });
        }

        res.clearCookie("token");
        res.status(200).json({ message: 'Account was deleted successfully!' });

    } catch (error) {
        console.log('Error in deleteAccount controller: ', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}
