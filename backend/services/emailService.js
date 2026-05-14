import axios from 'axios';

/**
 * Core function to send email via Brevo REST API
 */
export const sendEmail = async ({ to, subject, htmlContent }) => {
  try {
    const apiKey = process.env.BREVO_API_KEY;
    const senderName = process.env.BREVO_SENDER_NAME || 'WILDBEARS';
    const senderEmail = process.env.BREVO_SENDER_EMAIL || 'noreply@wildbears.in';

    if (!apiKey) {
      console.error("BREVO_API_KEY is not defined in environment variables.");
      return false;
    }

    const data = {
      sender: { name: senderName, email: senderEmail },
      to: [{ email: to }],
      subject,
      htmlContent,
    };

    const response = await axios.post('https://api.brevo.com/v3/smtp/email', data, {
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error("Brevo Email Sending Error:", error?.response?.data || error.message);
    throw new Error("Failed to send email");
  }
};

/**
 * Reusable wrapper to send OTP Email
 */
export const sendOTPEmail = async (email, otp) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; margin: 0; padding: 0; background-color: #faf9f7;">
        <table width="100%" cellpadding="0" cellspacing="0" style="padding: 40px 0;">
            <tr>
                <td align="center">
                    <table width="500" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #eaeaea;">
                        <tr>
                            <td align="center" style="padding: 30px 0; background-color: #111111;">
                                <h1 style="margin: 0; color: #ffffff; font-size: 24px; letter-spacing: 4px; font-weight: 800; text-transform: uppercase;">WILDBEARS</h1>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="padding: 40px 30px;">
                                <h2 style="margin: 0 0 20px 0; font-size: 20px; color: #111111;">Authentication Request</h2>
                                <p style="margin: 0 0 30px 0; font-size: 15px; color: #666666; line-height: 1.6;">
                                    Please use the following One Time Password (OTP) to complete your authentication process.
                                </p>
                                <div style="background-color: #f8f8f8; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                                    <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #6B4E2E;">${otp}</span>
                                </div>
                                <p style="margin: 0 0 10px 0; font-size: 14px; color: #d9534f; font-weight: bold;">
                                    This code will expire in 5 minutes.
                                </p>
                                <p style="margin: 0; font-size: 13px; color: #888888;">
                                    If you did not request this code, please ignore this email.
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="padding: 20px 30px; background-color: #faf9f7; border-top: 1px solid #eaeaea;">
                                <p style="margin: 0; font-size: 11px; color: #888888; text-transform: uppercase; letter-spacing: 1px;">
                                    © ${new Date().getFullYear()} WILDBEARS INC. ALL RIGHTS RESERVED.
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `;

  return sendEmail({
    to: email,
    subject: "Your OTP Verification Code",
    htmlContent
  });
};

/**
 * Reusable wrapper to send Order Notification to Admin
 */
export const sendAdminOrderNotification = async (orderId) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <div style="max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #eaeaea; border-radius: 8px; background-color: #faf9f7;">
            <h2 style="color: #111; margin-top: 0;">New Order Received!</h2>
            <p>A customer has successfully placed a new order.</p>
            <div style="background-color: #fff; padding: 15px; border-radius: 5px; margin: 20px 0; border: 1px solid #ddd;">
                <p style="margin: 0;"><strong>Order Tracking ID:</strong> ${orderId}</p>
            </div>
            <p>Please click the link below to view and manage orders:</p>
            <a href="https://wildbears-1u25.vercel.app/orders" style="display: inline-block; padding: 12px 24px; background-color: #111; color: #fff; text-decoration: none; border-radius: 4px; font-weight: bold; margin-top: 5px;">View Orders Dashboard</a>
        </div>
    </body>
    </html>
    `;

  return sendEmail({
    to: 'Wildbears26@gmail.com',
    subject: `New Order Received - Order ID: ${orderId}`,
    htmlContent
  });
};

/**
 * Reusable wrapper to send Order Status Update to User
 */
export const sendOrderStatusUpdate = async (email, orderId, status, firstName) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #faf9f7; color: #333333;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #faf9f7; padding: 40px 0;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05); border: 1px solid #eaeaea;">
                    <tr>
                      <td align="center" style="padding: 40px 0; background-color: #111111;">
                        <h1 style="margin: 0; color: #ffffff; font-size: 24px; letter-spacing: 4px; font-weight: 800; text-transform: uppercase;">WILDBEARS</h1>
                        <p style="margin: 10px 0 0 0; color: #D8BF91; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">Network Fulfillment Update</p>
                      </td>
                    </tr>
                    <tr>
                      <td align="left" style="padding: 50px 40px;">
                        <h2 style="margin: 0 0 20px 0; font-size: 20px; color: #111111;">Hello ${firstName},</h2>
                        <p style="margin: 0 0 30px 0; font-size: 15px; color: #666666; line-height: 1.6;">
                          Your order lifecycle has advanced. We are writing to inform you that your purchase logistics have been successfully updated in our system.
                        </p>
                        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f8f8; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                          <tr>
                            <td width="30%" style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #888888; padding-bottom: 10px;">Order Tracker ID</td>
                            <td width="70%" style="font-family: monospace; font-size: 14px; color: #111111; padding-bottom: 10px; font-weight: bold;">${orderId}</td>
                          </tr>
                          <tr>
                            <td width="30%" style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #888888;">Live Status</td>
                            <td width="70%" style="font-size: 16px; color: #6B4E2E; font-weight: 900; letter-spacing: 0.5px;">${status}</td>
                          </tr>
                        </table>
                        <p style="margin: 0; font-size: 14px; color: #888888; line-height: 1.6; text-align: center;">
                          You can continue to track this trajectory natively via your client profile dashboard.<br><br>
                            Thank you for trusting <strong>WILDBEARS™</strong>.
                          </p>
                          </td>
                        </tr>
                        <tr>
                          <td align="center" style="padding: 30px 40px; background-color: #faf9f7; border-top: 1px solid #eaeaea;">
                            <p style="margin: 0; font-size: 12px; color: #888888; text-transform: uppercase; letter-spacing: 1px;">
                              © ${new Date().getFullYear()} WILDBEARS INC. ALL RIGHTS RESERVED.
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </body>
            </html>
            `;

  return sendEmail({
    to: email,
    subject: `Order Status Updated - Order ID: ${orderId}`,
    htmlContent
  });
};
