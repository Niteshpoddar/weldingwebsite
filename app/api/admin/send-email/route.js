import { NextResponse } from 'next/server';
import { connectDB } from '../../../dbconfig/dbconfig';
import { sendEmail } from '../../../../lib/mailer';

export async function POST(request) {
  try {
    await connectDB();
    const { type, emailType, applicantEmail, applicantName, ...additionalData } = await request.json();

    let subject, htmlContent;

    switch (type) {
      case 'job':
        if (emailType === 'acceptance') {
          subject = `Congratulations! Your Job Application for ${additionalData.position} has been Accepted`;
          htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #059669; margin-bottom: 20px;">🎉 Application Accepted!</h2>
              <p>Dear <strong>${applicantName}</strong>,</p>
              <p>We are pleased to inform you that your application for the position of <strong>${additionalData.position}</strong> has been accepted!</p>
              <p>Our team was impressed with your qualifications and experience. We will be in touch shortly with next steps and onboarding details.</p>
              <p>If you have any questions, please don't hesitate to reach out to us.</p>
              <p>Best regards,<br>The HR Team</p>
            </div>
          `;
        } else if (emailType === 'rejection') {
          subject = `Update on Your Job Application for ${additionalData.position}`;
          htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #dc2626; margin-bottom: 20px;">Application Update</h2>
              <p>Dear <strong>${applicantName}</strong>,</p>
              <p>Thank you for your interest in the position of <strong>${additionalData.position}</strong> and for taking the time to apply to our company.</p>
              <p>After careful consideration, we regret to inform you that we are unable to move forward with your application at this time.</p>
              <p>We appreciate your interest in joining our team and wish you the best in your future endeavors.</p>
              <p>Best regards,<br>The HR Team</p>
            </div>
          `;
        }
        break;

      case 'training':
        if (emailType === 'acceptance') {
          subject = `Congratulations! Your Training Application for ${additionalData.course} has been Accepted`;
          htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #059669; margin-bottom: 20px;">🎉 Training Application Accepted!</h2>
              <p>Dear <strong>${applicantName}</strong>,</p>
              <p>We are excited to inform you that your application for <strong>${additionalData.course}</strong> training has been accepted!</p>
              <p>Our training team will contact you soon with course details, schedule, and any prerequisites you may need.</p>
              <p>We look forward to having you in our training program!</p>
              <p>Best regards,<br>The Training Team</p>
            </div>
          `;
        } else if (emailType === 'rejection') {
          subject = `Update on Your Training Application for ${additionalData.course}`;
          htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #dc2626; margin-bottom: 20px;">Training Application Update</h2>
              <p>Dear <strong>${applicantName}</strong>,</p>
              <p>Thank you for your interest in our <strong>${additionalData.course}</strong> training program.</p>
              <p>After reviewing your application, we regret to inform you that we are unable to accommodate your request at this time.</p>
              <p>We encourage you to check our website for future training opportunities.</p>
              <p>Best regards,<br>The Training Team</p>
            </div>
          `;
        }
        break;

      case 'contact':
        if (emailType === 'followup') {
          subject = `Follow-up on Your Inquiry`;
          htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #2563eb; margin-bottom: 20px;">📧 Follow-up on Your Inquiry</h2>
              <p>Dear <strong>${applicantName}</strong>,</p>
              <p>Thank you for reaching out to us. We hope this email finds you well.</p>
              <p>We wanted to follow up on your recent inquiry and ensure that all your questions have been addressed.</p>
              <p>If you need any additional information or have further questions, please don't hesitate to contact us.</p>
              <p>We appreciate your interest in our services and look forward to assisting you further.</p>
              <p>Best regards,<br>The Customer Support Team</p>
            </div>
          `;
        }
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid email type' },
          { status: 400 }
        );
    }

    // Send the email
    await sendEmail({
      to: applicantEmail,
      subject: subject,
      html: htmlContent
    });

    return NextResponse.json({ 
      success: true, 
      message: `Email sent successfully to ${applicantName}` 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}

