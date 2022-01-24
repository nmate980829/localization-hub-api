import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export const sendEmail = async (option: Mail.Options) => {
  const testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  const def = {
    from: '"Localization hub 👻" <no-reply@locahub.com>',
  };
  const info = await transporter.sendMail({...def, ...option});
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
export const sendInvitation = async (email: string, token: string) => {
  const options = {
    to: email,
    subject: "You got an invitation to join this Locahub server",
    text: `You got an invitation to join ${process.env.NAME}. It is an instance of the Locahub project. You can accept your invitation at ${process.env.UI_URL}register/${token}`,
    html: `
      <div style="width: 100%; height: 100%; background-color: lightGray;">
        <h1>Please join ${process.env.NAME}!</h1>
        <p>You got an invitation to join ${process.env.NAME}.
          It is an instance of the Locahub project.
          You can accept your invitation and join the team at <a href="${process.env.UI_URL}register/${token}">our web site</a>, if you think this email was not meant for you, you don't have to do anything the invitation will expire.
        </p>
      </div>
    `,
  };
  return sendEmail(options);
}
