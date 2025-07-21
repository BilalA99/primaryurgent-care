'use server';
import { UserEmailTemplate } from "./UserEmailTemplate";
import { ContactEmailTemplate } from "./ContactEmailTemplate";
import { Resend } from 'resend';
import {LawyerRecordsEmailTemplate} from "./LawyerRecordsEmailTemplate";
import {LawyerRecordsThankYouEmailTemplate} from "./LawyerRecordsThankYouEmailTemplate";

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

export async function sendLawyerRecordsEmail(formData : {lawFirm : string, email : string, phone : string, patientName : string, dob : string, dos : string, records : string, files: {
    file: File,
    content: string
}[]}) {
    try {
        const data = await resend.emails.send({
            from: 'Primary & Urgent Care Centers <support@primaryuc.com>',
            to: ['support@primaryuc.com'],
            subject: 'New Medical Records Request from Attorney',
            react: await LawyerRecordsEmailTemplate({lawFirm : formData.lawFirm, email : formData.email, phone : formData.phone, patientName : formData.patientName, dob : formData.dob, dos : formData.dos, records : formData.records, files : formData.files}),
            attachments: formData.files.map(file => ({
                filename: file.file.name,
                content: file.content,
                type: file.file.type
            }))
        });
        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to send email');
    }
}

export async function sendLawyerRecordsThankYouEmail(formData : {lawFirm : string, email : string, patientName : string}) {    
    try {
        const data = await resend.emails.send({
            from: 'Primary & Urgent Care Centers <support@primaryuc.com>',
            to: [formData.email],
            subject: 'Thank You for Your Medical Records Request',
            react: await LawyerRecordsThankYouEmailTemplate({lawFirm : formData.lawFirm, email : formData.email, patientName : formData.patientName}),
        });
        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to send email');
    }
}