const mongoose = require('mongoose')

const bikeSchema = mongoose.Schema({

    name: { type: String, required: true },
    image: { type: String, required: true },
    engine: { type: String, required: true },
    gear: { type: String, required: true },
    fuelType: { type: String, required: true },
    rentPerHour: { type: Number, required: true },
    availableCount: { type: Number, required: true },
    bookedSlots: [
        {
            from: { type: String, required: true },
            to: { type: String, required: true }
        }
    ]
},
    { timestamps: true }
)

const bikeModel = mongoose.model('bikes', bikeSchema)

module.exports = bikeModel