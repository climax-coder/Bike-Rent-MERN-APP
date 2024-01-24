const express = require('express')
const app = express()
const path = require('path')
const dbconnect = require('./dbconnect')
const port = process.env.PORT || 5000

app.use(express.json())
app.use('/api/bikes/', require('./routes/bikeRoute'))
app.use('/api/users/', require('./routes/userRoute'))
app.use('/api/booking/', require('./routes/bookingRoute'))
app.get("/api/config/paypal", (req, res) => {
    res.send("AeYbGDLudmepQ8zLSTHD3b_oEFlgMIP_OU9U0V3nr4qA0P0Vn9O9Rz1eS9VxeZDFpLhAT1EmeD5DlJQ2")
})

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client/build/index.html'))
    })
}

app.listen(port, () => console.log("Server started on server 5000"))
