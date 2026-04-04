"use server";

import nodemailer from 'nodemailer';

export async function submitContact(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const subject = formData.get('subject') as string;
  const message = formData.get('message') as string;
  
  // NEW: Get the dynamic email of the agency
  const agencyContactEmail = formData.get('agencyContactEmail') as string;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: agencyContactEmail || "hello@axiusdigital.com", // Dynamic Email Here!
      replyTo: email, 
      subject: `📩 New Website Inquiry: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 24px; border: 1px solid #E5E9F2; border-radius: 16px; background-color: #FAFAFA;">
          <h2 style="color: #003580; margin-top: 0;">New Contact Form Message</h2>
          <div style="background-color: white; padding: 16px; border-radius: 8px; border: 1px solid #E5E9F2;">
            <p style="margin: 8px 0;"><strong>From:</strong> ${name}</p>
            <p style="margin: 8px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 8px 0;"><strong>Subject:</strong> ${subject}</p>
            <hr style="border: 0; border-top: 1px solid #E5E9F2; margin: 16px 0;" />
            <p style="margin: 8px 0; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
    
  } catch (error) {
    console.error("Contact form email failed:", error);
    throw new Error("Failed to send email");
  }
}