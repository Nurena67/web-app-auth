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
            from: `"web-app" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Verify Your Email',
            html: `
                <p>Hi,</p>
                <p>Thank you for registering. Please verify your email by clicking the link below:</p>
                <a href="${process.env.CLIENT_URL}/verify-email/${token}">${process.env.CLIENT_URL}/verify-email/${token}</a>
                <p>If you did not request this, please ignore this email.</p>
            `,
          };
        
          await transporter.sendMail(mailOptions);
          console.log(`Verification email sent to ${email}`);
          return true;
        
    } catch (error) {
      console.error('Error sending verification email:', error.message);
      throw new Error('Could not send verification email');
    }
};


export const sendVerificationForgotPass = async (email, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
          });
        
          const mailOptions = {
            from: `"web-app" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Your Password Reset OTP",
            html: `
                <p>Hi,</p>
                <p>Your OTP is ${otp}. It is valid for 15 minutes.</p>
                <p>If you did not request this, please ignore this email.</p>
            `,
          };
        
          await transporter.sendMail(mailOptions);
          console.log(`Reset OTP sent to ${email}`);
          return true;
        
    } catch (error) {
      console.error('Error sending reset Password OTP', error.message);
      throw new Error('Could not send OTP');
    }
};