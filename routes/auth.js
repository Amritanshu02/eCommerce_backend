const router = require("express").Router();
const User = require("../models/User");
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJs.AES.encrypt(req.body.password, process.env.PASSWORD_SECRET_KEY).toString(),
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json(error);
    }
});

//LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        //if no user details found show error
        !user && res.status(401).json("Wrong credentials!");

        const hashedPassword = CryptoJs.AES.decrypt(user.password, process.env.PASSWORD_SECRET_KEY);
        const originalPassword = hashedPassword.toString(CryptoJs.enc.Utf8);

        //if password does not matches show error
        originalPassword !== req.body.password && res.status(401).json("Wrong credentials!");

        //JWT Authentication
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        }, process.env.JWT_SECRET_KEY, { expiresIn: "3d" });

        const { password, ...others } = user._doc;

        res.status(200).json({ ...others, accessToken });
        // or res.status(200).json({ others, accessToken });

    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;