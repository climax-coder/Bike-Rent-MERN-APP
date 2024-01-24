const express = require('express')
const router = express.Router()
const Bike = require('../models/bikeModel')

router.get("/allbikes", async (req, res) => {

    try {
        const bikes = await Bike.find()
        res.send(bikes)
    } catch (error) {
        return res.status(400).json({ msg: "Something went wrong" })
    }
})

router.post('/getbikebyid', (req, res) => {
    Bike.find({ _id: req.body.id }, (err, docs) => {
        if (!err) {
            res.send(docs[0])
        }
        else {
            return res.status(400).json({ message: "Something went wrong" })
        }

    })
}
)

module.exports = router