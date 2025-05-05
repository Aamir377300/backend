const express = require('express')

const router = express.Router();

const product_conn_from_mongo = require('../models/product')

const verifyToken = require('../middleware/verifyToken')

// image: String,
//     name: String,
//     description: String,
//     price: String
router.post('/mainPage', async(req, res)=>{

    try{
    const { image, name, description, price } = req.body

    if(!image || !name || !description || !price){
        return res.status(400).json({error: 'all field is required'})
    }

    const newproduct = new product_conn_from_mongo({
        image: image,
        name: name,
        description: description,
        price: price
    })

    const saveProduct = await newproduct.save()

    res.status(201).json(saveProduct)
    console.log(saveProduct)
    }
    catch(err){
        console.log("The error be:->", err)
        res.status(500).json({ error: 'Server error' });
    }
})

// get to it render on browser

router.get('/mainPage', verifyToken, async(req,res)=>{
    try{
        const product_shown_on_browser = await product_conn_from_mongo.find()
        res.status(200).json(product_shown_on_browser);
    }
    catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: 'Server error' });
}
})




module.exports = router
