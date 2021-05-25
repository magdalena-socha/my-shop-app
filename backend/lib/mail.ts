import { createTransport } from "nodemailer";

const transport = createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

function emailTemplate(text: string): string {
    return `
        <div style="
        border: 1px solid black;
        padding: 20px;
        font-family: sans-serif;
        font-size: 20px;
        ">
        <h2>Hello there</h2>
        <p>${text}</p>

        </div>
    `;
}

interface MailResponse {
    message: String;
}

export async function sendPasswordResetEmail(resetToken:string, to: string) :Promise<void> {
    const info = (await transport.sendMail({
        to,
        from: 'magdatest1@gmail.com',
        subject: 'Your password reset',
        html: emailTemplate(`You can reset your password using the link below 
        <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">Click here to reset</a>`
        ),
    })) as MailResponse;
}