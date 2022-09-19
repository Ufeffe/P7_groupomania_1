require('dotenv').config()
const { Sequelize, User, Post } = require('./models')


const express = require('express')
const path = require('path');

const postsRoutes = require('./routes/posts')
const userRoutes = require('./routes/user')

const app = express()

async function connectToPostgres() {

    const sequelize = new Sequelize('postgres://postgres:poiu987@localhost:5432/P7_groupomania')
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
connectToPostgres()


app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
})


app.use('/api/posts', postsRoutes)
app.use('/api/auth', userRoutes)
app.use('/images', express.static(path.join(__dirname, 'images')))


module.exports = app