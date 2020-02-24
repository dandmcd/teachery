import "dotenv/config";

export async function sendSGEmail(email, url) {
  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: email,
    from: "TeacherybyDan@gmail.com",
    subject: "Reset Password Confirmation",
    text:
      `You are receiving this because you (or someone else) have requested the reset of the password for your account. \n\n` +
      `If you did not request this, please ignore this email and your password will remain unchanged \n\n` +
      `Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it: \n\n`,
    html: `<a href="${url}">${url}</a>`
  };
  //ES6
  sgMail
    .send(msg)
    .then(() => {
      console.log("Mail sent successfully");
    })
    .catch(error => {
      console.error(error.toString());
    });
}
