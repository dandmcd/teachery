import "dotenv/config";

export async function sendSGEmail(email, url) {
  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: email,
    from: "TeacherybyDan@gmail.com",
    subject: "Teachery Account Confirmation",
    html: `
    <h3>You are receiving this because you (or someone else) have requested the confirmation of your account with Teachery. \n\n</h3>
    <h3>If you did not request this, please ignore this email. \n\n</h3>
    <h2>Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it: \n\n</h2>
    <div><a href="${url}">${url}</a></div>`,
  };
  //ES6
  sgMail
    .send(msg)
    .then(() => {
      console.log("Mail sent successfully");
    })
    .catch((error) => {
      console.error(error.toString());
    });
}
