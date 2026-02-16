const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());
const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
app.post("/send-email", async (req, res) => {
    const { first_name, last_name, email, phone, message } = req.body;
    try{
        
        const mailOptions ={
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject:`New message from ${first_name} ${last_name}`,
            text:  `
              First Name: ${first_name}
              Last Name: ${last_name}
              Email: ${email}
              Phone: ${phone}
              Message: ${message}
            `,
        };
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Email sent successfully!"});

    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Failed to send email" });
    }
    
});
app.post("/api/book-service", async (req, res) => {
    const{
        name,
        phone,
        email,
        device,
        issue,
        date,
        time,
        emergency,
        total,
    } = req.body;

    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject:  `New Booking from ${name}`,
            text: `
              Name: ${name}
              Phone: ${phone}
              Email: ${email}
              Device: ${device}
              Issue: ${issue}
              Date: ${date}
              Time: ${time}
              Emergency: ${emergency ? "Yes" : "No"}
              Estimated Total: ₹${total}
            `,
        };
        await transporter.sendMail(mailOptions);
        res.status(200).json({
            success:true,
            message: "Booking email sent successfully!",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to send booking email",
        });
    }
    
});
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
