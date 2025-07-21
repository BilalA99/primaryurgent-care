'use server';
import { UserEmailTemplate } from "./UserEmailTemplate";
import { ContactEmailTemplate } from "./ContactEmailTemplate";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_KEY);

export async function sendUserEmail(formData : {name : string, email : string, phone : string}) {
    try {
        const data = await resend.emails.send({
            from: 'Primary & Urgent Care Centers <support@primaryuc.com>',
            to: [formData.email],
            subject: 'Thank you for contacting Primary & Urgent Care Centers',
            react: await UserEmailTemplate({name : formData.name, email : formData.email, phone : formData.phone}),
        });
        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to send email');
    }
}

export async function sendContactEmail(formData : {name : string, email : string, phone : string, reason : string, accidentType : string}) {
    try {
        const data = await resend.emails.send({
            from: 'Primary & Urgent Care Centers <support@primaryuc.com>',
            to: ['support@primaryuc.com'],
            subject: 'New Contact Form Submission',
            react: await ContactEmailTemplate({name : formData.name, email : formData.email, phone : formData.phone, reason : formData.reason, accidentType : formData.accidentType}),
        });
        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to send email');
    }
}
