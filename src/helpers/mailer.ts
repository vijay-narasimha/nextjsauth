import nodemailer from 'nodemailer';

import User from '@/models/userModel';

import bcryptjs from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(
        userId,
        {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
        {
          new: true,
          runValidators: true,
        }
      );
    } else if (emailType === 'RESET') {
      await User.findByIdAndUpdate(
        userId,
        {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        },
        {
          new: true,
          runValidators: true,
        }
      );
    }
    var transport = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'c042d39fa15315',
        pass: '77669d0e6197f7',
      },
    });
    
    const mailOptions = {
      from: 'vijay@gmail.com',
      to: email,
      subject:
        emailType === 'VERIFY'
          ? 'Verify your password'
          : 'Reset your password',
      html: `<p>Click <a href="http://localhost:3000/verifyemail?token=${hashedToken}">Here</a> to ${
        emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password'
      }</p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
