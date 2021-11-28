const express = require('express')
const router = express.Router()
const {User} = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.get('/', async(req, res)=>{
    const userList = await User.find().select('-passwordHash') // without minus can specify fields to show

    if(!userList) return res.status(404).json({success: false})
    res.status(201).send(userList)
})

router.get('/:id', async(req, res)=>{
    const user = await User.findById(req.params.id).select('-passwordHash')

    if(!user) return res.status(404).json({success: false})
    res.status(201).send(user)
})

router.get(`/get/count`, async (req, res) =>{
    let userCount = await User.find()
    userCount = userCount? userCount.length: 0
    res.status(200).json({count: userCount})
})

router.post('/', async(req, res)=>{
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 12),
        isAdmin: req.body.isAdmin
    })

    user = await user.save()
    if(!user) return res.status(404).json({success: false})
    res.status(201).send(user)
})

router.post('/register', async(req, res)=>{
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 12),
        isAdmin: req.body.isAdmin
    })

    user = await user.save()
    if(!user) return res.status(404).json({success: false})
    res.status(201).send(user)
})

router.post('/login', async(req, res)=>{
    const user = await User.findOne({email: req.body.email})

    if(user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const token = jwt.sign(
            {
                userId: user._id,
                isAdmin: user.isAdmin
            },
            'secret',
            {expiresIn: '1w'}
        )
        return res.status(200).send({user: user.email, token: token})
    }
    else
        return res.status(400).send('Password is wrong')
    
})

router.put('/:id', async(req, res)=>{

    const userExist = await User.findById(req.params.id)
    let newPasswordHash
    if(req.body.password) {
        newPasswordHash = bcrypt.hashSync(req.body.password, 12)
    } else {
        newPasswordHash = userExist.passwordHash
    }
    const user = await User.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body.email,
        passwordHash: newPasswordHash,
        isAdmin: req.body.isAdmin
    },
    {new: true})

    if(!user) return res.status(404).json({success: false})
    res.status(201).send(user)
})

module.exports = router