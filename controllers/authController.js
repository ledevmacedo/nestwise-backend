require("dotenv").config();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();



router.post('/register', async (req, res) => {
    const { name, email, password, confirmpassword } = req.body;

    // validations
    if (!name) {
        return res.status(422).json({ msg: "O nome é obrigatório!" });
    }

    if (!email) {
        return res.status(422).json({ msg: "O email é obrigatório!" });
    }

    if (!password) {
        return res.status(422).json({ msg: "A senha é obrigatória!" });
    }

    if (password != confirmpassword) {
        return res
            .status(422)
            .json({ msg: "A senha e a confirmação precisam ser iguais!" });
    }

    // check if user exists
    const userExists = await User.findOne({ email: email });

    if (userExists) {
        return res.status(422).json({ msg: "Por favor, utilize outro e-mail!" });
    }

    // create password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // create user
    const user = new User({
        name,
        email,
        _id,
        password: passwordHash,
    });

    try {
        await user.save();
        res.status(201).json({ msg: "Usuário criado com sucesso!" });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // validations
    if (!email) {
        return res.status(422).json({ msg: "O email é obrigatório!" });
    }

    if (!password) {
        return res.status(422).json({ msg: "A senha é obrigatória!" });
    }

    // check if user exists
    const user = await User.findOne({ email: email });

    if (!user) {
        return res.status(404).json({ msg: "Usuário não encontrado!" });
    }

    // check if password match
    const checkpassword = await bcrypt.compare(password, user.password);

    if (!checkpassword) {
        return res.status(422).json({ msg: "Senha inválida" });
    }

    try {
        const secret = process.env.SECRET;
        const userId = {
            id: user._id
        }
        const token = jwt.sign(
            {
                id: user._id,
            },
            secret,
        );



        res.status(200).json({ msg: "Autenticação realizada com sucesso!", token, userId });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
});

module.exports = router;