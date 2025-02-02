const express = require('express');
const User = require('../models/User.jsx');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middelware/fetchuser.jsx');

const JWT_SECRET = 'imgood';


// Create a User using endpoint : POST "/api/auth/" , Does not required Auth
router.post('/login', [
    body('name', 'Enter a valid Name').isLength({ min: 3 }),
    body('email', 'Enter your Email').isEmail(),
    body('password', 'Password must be atleast 5 chars').isLength({ min: 5 }),
], async (req, res) => {

    // if thir are error return request
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // check whether the user with same email exists already

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "email already exists" })
        }

        const salt = await bcrypt.genSalt(10);

        const secPass = await bcrypt.hash(req.body.password, salt)

        // create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            password: secPass,
        });

        /*   .then(user => res.json(user))
        .catch(err=> {console.log(err)
        res.json({error: 'Please enter a unique value!', message: err.message})}) */

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);

        res.json({ authtoken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured Bruh");
    }

})

// Route 2:   Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [
    body('email', 'Enter your Email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {

    // if thir are error return request
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, passsword } = req.body;
    try {
        let user = await User.findone({ email });
        if (loser) {
            return res.status(400).json({ error: "Please try to login with correct password" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Please try to login with correct password" });
        }

        const payLoad = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ authtoken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

// Route 3:   Get logged in user details: POST "/api/auth/getuser". login required
router.post('/login', fetchuser , async (req, res) => {

    try {
        userid = req.user.id ;
        const user = await User.findById(userid).select("-password");
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

module.exports = router
