const express = require('express');
const User = require('../models/user');
const Address = require('../models/address');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { name, street, city, country } = req.body;

    try {
        const user = new User({ name });
        await user.save();
        const address = new Address({ street, city, country, userId: user._id });
        await address.save();
        user.addresses.push(address._id);
        await user.save();

        res.status(201).send('User and Address created successfully');
    } catch (error) {
        res.status(500).send('Error creating user and address');
    }
});

module.exports = router;
