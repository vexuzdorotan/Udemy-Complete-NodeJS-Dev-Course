'use strict';

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const sendEmail = (email, name, welcome) => {
  const mailOptions = {
    from: 'vexuzdorotan4@gmail.com',
    to: email,
  };

  if (welcome) {
    mailOptions.subject = "Thanks for joining in VeXuZ's app!";
    mailOptions.text = `Welcome to the app, ${name}! Let me know how you get along with the app.`;
  } else {
    mailOptions.subject = "Sorry to see you go in VeXuZ's app!";
    mailOptions.text = `Good bye, ${name}! I hope to see you back soon.`;
  }

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return console.log(err);
    }

    console.log(`Email sent to ${email}!`);
  });
};

module.exports = { sendEmail };
