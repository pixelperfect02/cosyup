require('dotenv').config(); // Load environment variables from .env file
const moment = require('moment-timezone');
const path = require('path');


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Stripe = require('stripe');
const nodemailer = require('nodemailer');
//const mongoose = require('mongoose');
const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Use environment variable for Stripe key
const port = 5001;
// Enable CORS for local testing
// app.use(cors({ origin: 'http://localhost:3000' }));  // Adjust based on your local React setup
app.use(cors({ origin: 'https://twinkleandtinsel.vercel.app' }));

// // Comment to run in local
// // Define CORS options added this after deployment 
//change the frontend link here so you dont get the redirect orderconfirmation email
const corsOptions = {
  origin: 'https://twinkleandtinsel.vercel.app', // Allow requests only from your frontend domain
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('Could not connect to MongoDB...', err));
// // Define the Order schema and model
// const orderSchema = new mongoose.Schema({
//   email: String,
//   pickupDate: Date,
//   pickupTime: String,
//   totalAmount: Number, // Assuming totalAmount is a number
//   cartItems: [Object], // Assuming cartItems is an array of objects
//   formattedItems: String, // Add this field to store the formatted cart items
//   createdAt: { type: Date, default: Date.now },
// });
// const Order = mongoose.model('Order', orderSchema);
//added inside it after deployment
app.use(cors());
app.use(cors(corsOptions));
app.use(bodyParser.json());
// Root path route
app.get('/', (req, res) => {
  res.send('Server is running');
});
// Helper functions to format dates and times
const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'Australia/Adelaide'
  }).format(date);
};
const formatTime = (date) => {
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Australia/Adelaide'
  }).format(date).replace('AM', 'AM').replace('PM', 'PM');
};
app.post('/process-order', async (req, res) => {
  console.log('Request body:', req.body);
  const { name, address, phone, email, paymentMethodId, pickupDate, pickupTime, totalAmount, cartItems } = req.body;
  console.log('Received order data:', {name, address, phone,email, paymentMethodId, pickupDate, pickupTime, totalAmount, cartItems });
  try {
    if (isNaN(totalAmount) || totalAmount <= 0) {
      throw new Error('Invalid total amount');
    }
 
    const formattedItems = cartItems.map(item => 
      `Item: ${item.name}\nQuantity: 1\nPrice per Item: $${item.price.toFixed(2)}\nDescription: ${item.description}\n`
    ).join('\n');
    // Debugging: Print formattedItems to the console to verify
    console.log('Formatted Items:', formattedItems);
    // Create a new payment intent with automatic payment methods enabled
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // Convert dollars to cents
      currency: 'aud',
      payment_method: paymentMethodId,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never' // Disable redirects
      }
    });
    // // Save the order to the database
    // const order = await Order.create({
    //   email,
    //   pickupDate,
    //   pickupTime,
    //   totalAmount, 
    //   cartItems,
    //   formattedItems,
    // });
    // console.log('Order saved:', order); // Log the saved order

    // Send a confirmation email
    

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }
    });

  
    // Inside your /process-order route
const mailOptions = {
  from: process.env.EMAIL_USER,
  to: email,
  subject: 'Order Confirmation',
  bcc: 'twinkleandtinsell@gmail.com', // Add your email here to receive a copy but stays hidden from customer
  html: `
    <html>
  <body style="background-color: #ffffff; font-family: Arial, sans-serif; margin: 0; padding: 20px;">
    <div style="text-align: center; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; padding: 30px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
      <img src="cid:logo" alt="Twinkle & Tinsel" style="width: 180px; height: auto; margin-bottom: 20px;" />
      <h1 style="color: #FAA4F7; font-size: 26px; margin-bottom: 10px;">Thank You for Your Order!</h1>
      <p style="color: #555; font-size: 16px;">Your payment was successful.</p>
      
      <div style="text-align: left; margin-top: 20px; background: #f9f9f9; padding: 15px; border-radius: 8px;">
        <h3 style="color: #333; font-size: 18px; margin-top: 15px;">Pickup Location (for pick-up orders only):</h3>
        <p style="color: #555; font-size: 16px;"> Mansfield Park, 5012, available next Sunday (from when you place the order), 9am-5pm. We will email you once your order is ready to be picked up. </p>

      <h2 style="color: #333; font-size: 20px; margin-bottom: 10px;">Order Details:</h2>
        <ul style="list-style: none; padding: 0; margin: 0;">
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Address:</strong> ${address}</li>
          <li><strong>Phone:</strong> ${phone}</li>
           <li><strong>Total Amount Charged:</strong> $${totalAmount.toFixed(2)}</li>
        </ul>
          
       

        <h3 style="color: #333; font-size: 18px; margin-top: 15px;">Items Ordered:</h3>
        <pre style="white-space: pre-wrap; word-wrap: break-word; background: #fff; padding: 10px; border-radius: 5px;">${formattedItems}</pre>
      </div>

      <p style="color: #555; font-size: 16px; margin-top: 20px;">
        If you have any questions, feel free to reach us at 
        <a href="mailto:twinkleandtinsell@gmail.com" style="color: #FAA4F7; text-decoration: none;"><strong>twinkleandtinsell@gmail.com</strong></a>.
      </p>

      <p style="color: #777; font-size: 14px; margin-top: 10px;">Thank you for shopping with <strong>Twinkle & Tinsel</strong>!</p>
    </div>
  </body>
</html>
`,
  attachments: [
    {
      filename: 'logo.png',
      path: path.join(__dirname, '../frontend/src/assets/logo.png'), // Path to the logo image file
      cid: 'logo' // This CID should match the src in the <img> tag
    }
  ]
};

    // Debugging: Print mailOptions to the console to verify
    console.log('Mail Options:', mailOptions);
    await transporter.sendMail(mailOptions);
    // Respond with success
    res.json({ success: true, paymentIntentId: paymentIntent.id });
  } catch (error) {
    console.error('Error processing order:', error); // Log the error to the console
    res.status(500).json({ success: false, error: error.message });
  }
});
   
// Endpoint to handle contact form submissions
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }
    });
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER, // Replace with your email
      subject: `Contact Form Submission from ${name}`,
      text: `Message from ${name} (${email}):\n\n${message}`
    };
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error); // Log the error to the console
    res.status(500).json({ success: false, error: error.message });
  }
});
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
