const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const {Product} = require('../models/product')

router.get('/', async (req, res) => {
    const productList = await Product.find()

    if(!productList)
    return res.status(404).send('Product not found')
    res.status(201).send(productList)
})

router.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(!product)
    return res.status(404).send('Product not found')
    res.status(201).send(product)
})

router.post('/', async (req, res) => {
    let product = new Product({ 
        name: req.body.name,
        posted: req.body.posted,
        price: req.body.price
    })
    product = await product.save()

    if(!product)
    return res.status(404).send('Product not found')
    res.status(201).send(product)
})

router.put('/:id', async (req, res)=>{
    const product = await Product.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        posted: req.body.posted,
        price: req.body.price
    }, {new: true})

    if(!product) return res.status(404).send('product not found')
    res.status(201).send(product)
})

router.delete('/:id', async (req, res)=>{
    const product = await Product.findByIdAndDelete(req.params.id)

    if(!product) return res.status(404).send('product not found')
    res.status(201).send(product)
})

module.exports = router