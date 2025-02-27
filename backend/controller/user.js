const express = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const user = new User({ username, password });
        await user.save();
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '3h' });
        res.status(201).json({ token })
    } catch (error) {
        res.status(500).json({
            status: 'Failed',
            error: error,
            message: error.message
        });
    };
};



exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username })
        if (!user || !(await user.matchPassword(password))) {
            return res.status(400).json({
                status: 'failed',
                message: 'Invalid credentials'
            });

        };
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '3h' });
        res.status(201).json({ token: token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}