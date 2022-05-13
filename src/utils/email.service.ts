import { Logger } from '@nestjs/common';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export const sendEmail = async (option: Mail.Options) => {
  const testAccount = await nodemailer.createTestAccount();
  const dummyConfig = {
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  };
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, noReply, NAME } =
    process.env;
  const config = {
    pool: true,
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: true,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  };
  const notProvided =
    SMTP_HOST === undefined ||
    SMTP_PORT === undefined ||
    SMTP_USER === undefined ||
    SMTP_PASS === undefined;
  if (notProvided)
    Logger.warn(
      'You failed to provide smtp information. The e-mail service will be functioning with a dummy account, which is NOT sent out to the recipient. Please provide the necessary information: host, port, user, password, than restart the server.',
    );
  const transporter = nodemailer.createTransport(
    notProvided ? dummyConfig : config,
  );

  const def = {
    from: `"${NAME}" <${noReply}>`,
  };
  const info = await transporter.sendMail({ ...def, ...option });
  console.log('Message sent: %s', info.messageId);
  if (notProvided)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
};
export const sendInvitation = async (email: string, token: string) => {
  const options = {
    to: email,
    subject: 'You got an invitation to join this Locahub server',
    text: `You got an invitation to join ${process.env.NAME}. It is an instance of the Locahub project. You can accept your invitation at ${process.env.UI_URL}/register/${token}`,
    html: `
      <div style="width: 100%; height: 100%;">
        <h1>Please join ${process.env.NAME}!</h1>
        <p>You got an invitation to join ${process.env.NAME}.
          It is an instance of the Locahub project.
          You can accept your invitation and join the team at <a href="${process.env.UI_URL}/register/${token}">our web site</a>, if you think this email was not meant for you, you don't have to do anything the invitation will expire.
        </p>
      </div>
    `,
  };
  return sendEmail(options);
};

export const sendPasswordReset = async (email: string, password: string) => {
  const options = {
    to: email,
    subject: 'An admin reset your password',
    text: `Your password has been reset on ${process.env.NAME}. Your new password is ${password}. Please change it after logging in. ${process.env.UI_URL}/login/`,
    html: `
      <div style="width: 100%; height: 100%; background-color: lightGray;">
        <h1>Your password has been reset on ${process.env.NAME}.</h1>
        <p>
          Your new password is ${password}. Please change it after logging in at <a href="${process.env.UI_URL}/login/">our web site</a>.
        </p>
      </div>
    `,
  };
  return sendEmail(options);
};
