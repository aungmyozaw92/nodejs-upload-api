
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_PAYMENT_KEY);

const createPayment = async (req, res, next) => {
    const { total_amount, shipping_fee } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
        // amount: calculateOrderAmount(),
        amount: total_amount + shipping_fee,
        currency: 'usd',
    });
    console.log(paymentIntent);
    res.json({ clientSecret: paymentIntent.client_secret });
}

module.exports = { createPayment }