require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const checkToken = require('./middleware/checkToken');
const app = express();

app.use(express.json());


app.get("/", (req, res) => {
    res.status(200).json({ msg: "Bem vindo a API!" });
});

//get user by id
const getUserRouter = require("./routes/getUser");
app.use("/user", getUserRouter);

//login and register
const authController = require('./controllers/authController');
app.use('/auth', authController);

const housePost = require('./routes/house/housePost')
app.use('/house', housePost)


const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@nestwise.gu0mjpm.mongodb.net/nestwise?retryWrites=true&w=majority&appName=nestwise`)
    .then(() => {
        app.listen(3000)
        console.log('Conectou ao banco!')
    })
    .catch((err) => console.log(err))