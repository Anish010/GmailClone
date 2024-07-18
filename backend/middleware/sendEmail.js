import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  host: process.env.HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (req, res, next) => {
  const { to, from, subject, body } = req.body;

  const mailOptions = {
    from: from,
    to: to,
    subject: subject,
    text: body,
  };

  console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS);

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
    next();
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Error sending email" });
  }
};

export default sendEmail;
