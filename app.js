const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const productRoute = require('./routes/products')
const userRoute = require('./routes/users')
const authJwt = require('./helpers/jwt')

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.options('*', cors())
app.use(authJwt())
app.use('/api/v1/products', productRoute)
app.use('/api/v1/users', userRoute)

mongoose.connect('mongodb+srv://admin:admin@cluster0.3onwg.mongodb.net/eshop?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'eshop'
}).then(()=>{
    console.log('connection to db succesful')
}).catch(err => {
    console.log(err)
})

app.listen(3000, ()=>{
    console.log('server running on http://localhost:3000')
})