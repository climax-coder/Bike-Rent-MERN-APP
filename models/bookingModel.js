const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({

    bikeid: { type: mongoose.Schema.Types.ObjectId, ref: 'bikes' },
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    bookedSlots: {
        from: { type: String },
        to: { type: String }
    },
    bikeimage: { type: String },
    bikename: { type: String },
    rentPerHour: { type: String },
    fuelType: { type: String },
    isPaid: { type: Boolean, default: false, require },
    totalhrs: { type: Number },
    totalAmount: { type: Number },
    transactionId: { type: String }
},
    { timestamps: true }
)

const bookingModel = mongoose.model('bookings', bookSchema)

module.exports = bookingModel