// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export const sendVerificationEmail = async (email: string, token: string) => {
//     const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;
//     await resend.emails.send({
//         from: "onboarding@resend.dev>",
//         to: email,
//         subject: "Verify your email",
//         html: `<p>Click <a href="${confirmLink}">here</a> to verify your email.</p>`
//     })
// }

// export const sendPasswordResetEmail = async (email: string, token: string) => {
//     const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;
//     await resend.emails.send({
//         from: "onboarding@resend.dev>",
//         to: email,
//         subject: "Reset Password",
//         html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
//     })
// }


import { transporter } from "./nodemailer";
import { resetPasswordEmailTemplate } from "./resetPasswordEmailTemplate";
import { verificationEmailTemplate } from "./verificationEmailTemplate";

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `${domain}/auth/new-verification?token=${token}`;
    await transporter.sendMail({
        from: process.env.SMTP_FROM_EMAIL,
        to: email,
        subject: "Verify your email",
        html: verificationEmailTemplate(confirmLink),
    }) 
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetLink = `${domain}/auth/new-password?token=${token}`;
    await transporter.sendMail({
        from: process.env.SMTP_FROM_EMAIL,
        to: email,
        subject: "Reset Password",
        html: resetPasswordEmailTemplate(resetLink),
    })
}