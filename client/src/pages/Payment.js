import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import moment from 'moment'
import axios from 'axios'
import { getBikeById } from '../redux/actions/bikesAction'
import { PayPalButton } from 'react-paypal-button-v2'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getOrderById, savePaymentMethod, payOrder } from '../redux/actions/BookingAction'

function Payment() {
    const { id } = useParams()
    const [sdkReady, setSdkReady] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState('paypal')
    const orderstate = useSelector(state => state.getOrderByIdReducer)
    const { order, loading, error } = orderstate
    const orderPayReducer = useSelector(state => state.orderPayReducer)
    const { loading: loadingPay, success: successPay } = orderPayReducer
    const getbikebyidstate = useSelector((state) => state.getBikeByIdReducer)
    const { bike } = getbikebyidstate
    const dispatch = useDispatch()
    const navigate = useNavigate()



    useEffect(() => {
        dispatch(getOrderById(id))

        console.log(order);
    }, [id])


    useEffect(() => {
        const addPaypal = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        if (!order || successPay) {
            dispatch({ type: "ORDER_PAY_RESET" })
            dispatch(getOrderById(id))
            // window.location.reload()
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPaypal()
            } else {
                setSdkReady(true)
            }
        }

    }, [dispatch, id, successPay, order])



    const onSuccessHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(payOrder(id, paymentResult))
        alert("Payment success")
    }

    return (
        <Layout>

            <div style={{ marginTop: "120px" }}>
                {loading && <img src="https://wpamelia.com/wp-content/uploads/2018/11/ezgif-2-6d0b072c3d3f.gif" alt="" />}
                {order && (
                    <div className=''>
                        <div className="row justify-content-center my-5">
                            <div className="col-md-6 card p-1" style={{ textAlign: 'left' }}>
                                <h2 style={{ backgroundColor: '#F24C4C' }} className='text-center py-3'> <b> Bike Booked</b></h2>
                                <img className='mx-auto' src={order.bikeimage} width="380px" height="220px" />
                                <h5 className='mt-4'>Bike name: <b>{order.bikename}</b> </h5>
                                <h5>Rent per hour : <b> ${order.rentPerHour}</b></h5>
                                <h5>Fuel type : <b> {order.fuelType}</b></h5>


                            </div>
                            <div className="col-md-4 card" style={{ textAlign: 'right' }}>
                            <h2 style={{ backgroundColor: '#F24C4C' }} className='py-3 text-center'> <b> Booking Details</b></h2>

                            <div className="my-auto">

                                <h5 className='mt-4'>Order id : <b> {order._id}</b></h5>
                                <h5>Total Amount : <b>${order.totalAmount}/-</b></h5>
                                <h5>Total Hours : <b>{order.totalhrs}hrs</b> </h5>

                                <h5>From time : <b>{moment(order.bookedSlots.from).format('dddd DD-MMM-YYYY, h:mm:ss a')}</b> </h5>
                                <h5>To time : <b>{moment(order.bookedSlots.to).format('dddd DD-MMM-YYYY, h:mm:ss a')}</b> </h5>
                                <h5>Transaction Id : <b>{order.transactionId}</b> </h5>
                                {order.isPaid ? (<h5>Payment Status : <b className='bg-success p-1 rounded'>Payment Done</b> </h5>) : (<h5>Payment Status : <b className='bg-danger p-1 rounded'>Payment Pending</b> </h5>)}
                                {order.isDelivered ? (<h5>Delivery Status : <b>Order Delivered</b> </h5>) : (<h5>Order Status : <b>Not Delivered</b> </h5>)}
                            </div>
                            </div>

                        </div>
                    </div>
                )}

                <div className="container col-md-4">
                    <div className="text-center">
                    {
                        !order?.isPaid ? (
                            <div>
                    <h5 className='font-weight-bold py-4'>Click any of the payment modes below.</h5>

                            <PayPalButton currency="USD" amount={order?.totalAmount} onSuccess={onSuccessHandler} />
                            </div>

                        ) :
                            (
                                <h3><b>Enjoy your ride! 🏍️</b></h3>
                            )
                    }

                    </div>

                </div>


            </div>
        </Layout>
    )
}

export default Payment