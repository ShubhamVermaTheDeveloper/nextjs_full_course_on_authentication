import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import conf from "@/conf";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // create a hased token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    console.log(hashedToken);
    if (emailType === "VERIFY") {
      console.log("verify");
      const userFind = await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });

      console.log(userFind);
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });

      const transport = nodemailer.createTransport({
        host: conf.host,
        port: 2525,
        auth: {
          user: conf.user,
          pass: conf.pass,
        },
      });
      console.log(transport);

      const mailOptions = {
        from: "shubhamverma2512200@gmail.com",
        to: email,
        subject:
          emailType === "VERIFY" ? "Verify your email" : "Reset your password",
        html: `<p>Click <a href="${
          conf.domain
        }/verifyemail?token=${hashedToken}">here</a> to ${
          emailType === "VERIFY" ? "verify your email" : "reset your password"
        }</p>`,
      };

      console.log(mailOptions);

      const mailresponse = await transport.sendMail(mailOptions);
      console.log(mailresponse);
      return mailresponse;
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
