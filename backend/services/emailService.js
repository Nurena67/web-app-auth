import nodemailer from 'nodemailer';

export const sendVerificationEmail = async (email, token) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
          });
        
          const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Verify Your Email',
            html: `<p>Please verify your email by clicking the link below:</p>
                   <a href="${process.env.CLIENT_URL}/verify/${token}">Verify Email</a>`
          };
        
          await transporter.sendMail(mailOptions);
          return true;
        
    } catch (error) {
        console.error('Error sending email:', error);
    return false;
    }
};