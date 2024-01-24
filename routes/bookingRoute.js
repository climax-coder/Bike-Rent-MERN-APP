const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Booking = require("../models/bookingModel");
const Bike = require("../models/bikeModel");

router.post("/bookbike", async (req, res) => {
  req.body.transactionId = "1234Transaction";
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    const bike = await Bike.findOne({ _id: req.body.bikeid });
    bike.bookedSlots.push(req.body.bookedSlots);
    bike.availableCount = req.body.availableCount;
    await bike.save();
    res.json({ msg: "Booking Success!", book: newBooking });
    console.log(req.body.availableCount);
  } catch (error) {
    console.log(error);
    res.json({ msg: "Booking Failed" });
    console.log(req.body.availableCount);
  }
});

router.put(
  "/:id/pay",
  asyncHandler(async (req, res) => {
    const order = await Booking.findById(req.params.id);
    // console.log(req.params.id);
    // console.log(order);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };
      // console.log(order);

      const updateOrder = await order.save();
      res.json(updateOrder);
    } else {
      res.status(500);
      throw new Error("Order not found");
    }
  })
);

router.post("/getorderbyid", (req, res) => {
  const id = req.body.id;

  Booking.find({ _id: id }, (err, docs) => {
    if (err) {
      res.error("Something went wrong");
    } else {
      res.send(docs[0]);
    }
  });
});

router.post("/getordersbyuserid", async (req, res) => {
  try {
    const userid = req.body.userid;
    const bookings = await Booking.find({ userid });
    res.send(bookings);
  } catch (error) {
    return res.json(error);
  }

  //   Booking.find({ userId: userid }, (err, docs) => {
  //     if (docs > 0) {
  //       console.log(docs);
  //       res.send(docs);
  //     } else {
  //       res.error("No orders found");
  //     }
  //   });
});

module.exports = router;
