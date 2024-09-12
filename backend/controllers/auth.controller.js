import bcrypt from 'bcryptjs';

import User from '../models/user.model.js';

import generateTokenAndSetCookie from '../utils/generateTokenAndSetCookie.js';

export const signup = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        
        const user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({ error: 'User with such email already exists!' });
        }

        const invalidUsername = await User.findOne({ username });
        if (invalidUsername) {
            return res.status(409).json({ error: 'User with such username already exists!' });
        }

        var salt = bcrypt.genSaltSync(10);
        var hashedPassword = bcrypt.hashSync(password, salt);

        const newUser = new User({
            email,
            username,
            password: hashedPassword
        });

        await newUser.save();

        generateTokenAndSetCookie(res, newUser._id);

        res.status(201).json(newUser);

    } catch (error) {
        console.log('Error in signup controller: ', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'Invalid username!' });
        }

        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(404).json({ error: 'Invalid password!' });
        }

        generateTokenAndSetCookie(res, user._id);

        res.status(200).json(user);

    } catch (error) {
        console.log('Error in login controller: ', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const googleLogin = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (user) {
            generateTokenAndSetCookie(res, user._id);
            return res.status(200).json(user);
        }

        const newUser = new User({
            email,
            username: email.split('@gmail.com')[0]
        });
        
        await User.create(newUser);
        generateTokenAndSetCookie(res, newUser._id);

        res.status(200).json(newUser);

    } catch (error) {
        console.log('Error in googleLogin controller: ', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const logout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
}
