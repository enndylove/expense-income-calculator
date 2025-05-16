export const twoFATemplate = (code: string) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Verification Code</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
      
      body {
        font-family: 'Inter', Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #0e0e10;
        color: #efeff1;
        -webkit-font-smoothing: antialiased;
      }
      
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #18181b;
      }
      
      .email-header {
        background-color: #9147ff;
        padding: 24px;
        text-align: center;
      }
      
      .email-body {
        padding: 32px 24px;
        background-color: #18181b;
      }
      
      .email-footer {
        padding: 24px;
        text-align: center;
        background-color: #0e0e10;
        color: #adadb8;
        font-size: 12px;
      }
      
      .code-container {
        margin: 32px 0;
        padding: 24px;
        background-color: #1f1f23;
        border-radius: 8px;
        text-align: center;
        border: 1px solid #2c2c35;
      }
      
      .verification-code {
        font-family: 'Courier New', monospace;
        font-size: 32px;
        font-weight: 700;
        letter-spacing: 4px;
        color: #bf94ff;
      }
      
      .button {
        display: inline-block;
        padding: 12px 24px;
        background-color: #9147ff;
        color: #ffffff !important;
        text-decoration: none;
        font-weight: 600;
        border-radius: 4px;
        margin-top: 24px;
      }
      
      h1 {
        color: #ffffff;
        font-size: 24px;
        font-weight: 700;
        margin-top: 0;
      }
      
      p {
        font-size: 16px;
        line-height: 1.5;
        color: #efeff1;
      }
      
      .expiry {
        font-size: 14px;
        color: #adadb8;
        margin-top: 8px;
      }
      
      .divider {
        height: 1px;
        background-color: #2c2c35;
        margin: 24px 0;
      }
      
      .help-text {
        font-size: 14px;
        color: #adadb8;
      }
      
      .logo {
        width: 120px;
      }
      
      .social-links {
        margin-top: 16px;
      }
      
      .social-link {
        display: inline-block;
        margin: 0 8px;
      }
      
      .social-icon {
        width: 24px;
        height: 24px;
      }
      
      a {
        color: #bf94ff;
        text-decoration: none;
      }
      
      a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#0e0e10">
      <tr>
        <td align="center" style="padding: 40px 0;">
          <table class="email-container" width="600" border="0" cellspacing="0" cellpadding="0" bgcolor="#18181b" style="border-radius: 8px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.3);">
            <!-- Header -->
            <tr>
              <td class="email-header" bgcolor="#9147ff" style="padding: 24px; text-align: center;">
              </td>
            </tr>
            
            <!-- Body -->
            <tr>
              <td class="email-body" bgcolor="#18181b" style="padding: 32px 24px;">
                <h1 style="color: #ffffff; font-size: 24px; font-weight: 700; margin-top: 0;">Verify Your Login</h1>
                <p style="font-size: 16px; line-height: 1.5; color: #efeff1;">Hello there,</p>
                <p style="font-size: 16px; line-height: 1.5; color: #efeff1;">We've received a request to log in to your account. To complete the login process, please use the verification code below:</p>
                
                <div class="code-container" style="margin: 32px 0; padding: 24px; background-color: #1f1f23; border-radius: 8px; text-align: center; border: 1px solid #2c2c35;">
                  <div class="verification-code" style="font-family: 'Courier New', monospace; font-size: 32px; font-weight: 700; letter-spacing: 4px; color: #bf94ff;">${code}</div>
                  <p class="expiry" style="font-size: 14px; color: #adadb8; margin-top: 8px;">This code will expire in 10 minutes</p>
                </div>
                
                <p style="font-size: 16px; line-height: 1.5; color: #efeff1;">If you didn't request this code, someone might be trying to access your account. Please change your password immediately.</p>

                <div class="divider" style="height: 1px; background-color: #2c2c35; margin: 24px 0;"></div>
                
                <p class="help-text" style="font-size: 14px; color: #adadb8;">If you're having trouble, contact our support team at <a href="mailto:no.reply.spendly@gmail.com" style="color: #bf94ff; text-decoration: none;">no.reply.spendly@gmail.com</a></p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>

  `
}
