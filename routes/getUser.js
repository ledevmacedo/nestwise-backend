require("dotenv").config();
const User = require("../models/User");
const checkToken = require('../middleware/checkToken');
const express = require("express");
const router = express.Router();

router.get("/:id", checkToken, async (req, res) => {
    const id = req.params.id;

    // check if user exists
    const user = await User.findById(id, "-password");

    if (!user) {
        return res.status(404).json({ msg: "Usuário não encontrado!" });
    }

    res.status(200).json({ user });
    console.log(`Usuário ${user.name} encontrado`)
});

module.exports = router;