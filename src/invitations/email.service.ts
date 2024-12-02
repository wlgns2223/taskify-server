import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;
  private naverAccount: string;
  private naverPasskey: string;
  constructor(private readonly configService: ConfigService) {
    this.naverAccount = this.configService.get('NAVER_EMAIL_ACCOUNT') as string;
    this.naverPasskey = this.configService.get('NAVER_EMAIL_PASS') as string;
    this.transporter = nodemailer.createTransport({
      host: 'smtp.naver.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: this.naverAccount,
        pass: this.naverPasskey,
      },
    });
  }

  async sendInvitationEmail(email: string, dashboardName: string) {
    const mailOption = {
      from: `Taskify  ${this.naverAccount}`,
      to: email,
      subject: 'Invitation to Taskify',
      text: 'You have been invited to Taskify',
      html: `<b>You have been invited to Taskify Dashboard ${dashboardName}</b>`,
    };

    let sent = true;
    try {
      const info = await this.transporter.sendMail(mailOption);
      console.log({ info });
      console.log('Email sent: ' + info.response);
    } catch (e) {
      console.log(e);
      sent = false;
    }

    return sent;
  }
}
