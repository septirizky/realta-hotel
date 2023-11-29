import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'ersview213@gmail.com',
    pass: 'arpz qbfz arqfc ymq',
  },
});

const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: 'ersview213@gmail.com',
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

export default sendEmail;