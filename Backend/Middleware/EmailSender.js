import nodemailer from 'nodemailer';

const sendEmail = async (to, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.Email,
            pass: process.env.Password,
        },
    });

    const mailOptions = {
        from: process.env.Email,
        to,
        subject,
        text,
    };

    await transporter.sendMail(mailOptions);
};

export default sendEmail;
