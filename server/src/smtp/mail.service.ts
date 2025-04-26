import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { google } from 'googleapis';

import type { Transporter } from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: Transporter;

  constructor() {
    this.createTransporter();
  }

  private async createTransporter() {
    try {
      const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        'https://developers.google.com/oauthplayground',
      );

      oauth2Client.setCredentials({
        refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
      });

      const { token } = await oauth2Client.getAccessToken();

      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: process.env.GOOGLE_USER,
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
          accessToken: token,
        },
      });

      await this.transporter.verify();
      console.log('SMTP connection verified successfully');
    } catch (error) {
      console.error('Transporter error:', error);
      if (error instanceof Error) {
        throw new Error(`Failed to create mail transporter: ${error.message}`);
      }
      throw new Error(`Failed to create mail transporter.`);
    }
  }

  async sendMail(to: string[], subject: string, html: string) {
    try {
      if (!this.transporter) {
        await this.createTransporter();
      }

      const result = await this.transporter.sendMail({
        from: process.env.GOOGLE_USER,
        to: to.join(','),
        subject,
        html,
      });
      return result;
    } catch (error) {
      console.error('Send mail error:', error);
      if (error instanceof Error) {
        throw new Error(`Failed to send email: ${error.message}`);
      }
      throw new Error(`Failed to send email.`);
    }
  }
}
