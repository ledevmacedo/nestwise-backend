require("dotenv").config();
const User = require("../../models/User");
const House = require("../../models/House")
const express = require("express");
const router = express.Router();

const getUserRouter = require("../getUser");
router.use("/user", getUserRouter);


router.post("/", async (req, res) => {
    const { name, residents, created } = req.body;
    if (!name) {
        return res.status(422).json({ msg: "É necessário incluir um nome!" })
    }

    //create house
    const house = new House({
        name,
        residents: "leandro",
        created: new Date()
    })

    try {
        await house.save()
        console.log(house)
        // console.log(residents, name)
        res.status(200).json({ msg: "Casa criada com sucesso!" })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
})

module.exports = router;