import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail', // Use 'gmail' or configure host/port for other providers
  auth: {
    user: process.env.EMAIL_USER, // e.g., 'your-email@gmail.com'
    pass: process.env.EMAIL_PASS, // e.g., 'your-app-password'
  },
});

export const sendOrderApprovalEmail = async (to: string, orderId: string, customerName: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: `Order Approved - #${orderId}`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h1 style="color: #4F46E5;">Good news, ${customerName}!</h1>
        <p>Your order <strong>#${orderId}</strong> has been approved.</p>
        <p>You can now access your purchased products on your dashboard.</p>
        <br/>
        <p>Thank you for shopping with us!</p>
        <p>The Team</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};
