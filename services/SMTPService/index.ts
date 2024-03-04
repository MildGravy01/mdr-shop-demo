import { IProduct } from 'database/models/Products/types';
import {generateEmail} from '../../content/recieptMail';
import nodemailer from 'nodemailer';
import { IOrder } from 'database/models/Order/types';
import { ISMTPContructor } from './types';
export class SMTPService {
  transport;
  emailFrom = null;
  transporter;

  constructor({login, password, emailFrom, host = 'smtp.yandex.ru', port = 465, secure = true} : ISMTPContructor) {
    this.transport = {
      host: host,
      port: port,
      secure: secure,
      auth: {
        user: login,
        pass: password,
      },
    };
    this.emailFrom = emailFrom;
    this.transporter = nodemailer.createTransport(this.transport);
    this.transporter.verify((error, success) => {
      if (error) {
        console.error(error);
      } else if (success) {
        console.log('SMTP - \x1b[32mREADY\x1b[0m');
      }
    });
  }

  sendReceiptMail(product: IProduct, receipt: any, order: IOrder) {
    const mail = {
      from: 'MDR Донат-магазин',
      to: order?.email,
      subject: `MDR | Чек за покупку ${product?.name}`,
      html: generateEmail(receipt),
    };
    this.transporter.sendMail(mail, (err: any) => {
      if (err) {
        throw err;
      }
    });
  }
}
