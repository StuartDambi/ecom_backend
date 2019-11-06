import nodemailer from 'nodemailer';
import mails from './mails';

const transport = nodemailer.createTransport({
  service: 'Mailgun',
  auth: {
    user: mails.MAILGUN_USER,
    pass: mails.MAILGUN_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = {
  sendMail(from, to, subject, html) {
    return new Promise((resolve, reject) => {
      transport.sendMail({
        from, subject, to, html,
      }, (err, info) => {
        if (err) {
          reject(err);
        }
        resolve(info);
      });
    });
  },
};
