import nodemailer from 'nodemailer'

// Send contact form email
export const sendContactEmail = async (formData) => {
  const { name, email, company, phone, message } = formData

  const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: "nitesh.kpoddar15@gmail.com",
        pass: "zuai wugs vrdm uyrd"
      }
    });

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: `<${process.env.EMAIL_USER}>`,
    subject: `New Contact Form Submission from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #334155; border-bottom: 2px solid #64748b; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>

        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #475569; margin-top: 0;">Contact Information</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Company:</strong> ${company || 'Not provided'}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        </div>

        <div style="background: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h3 style="color: #475569; margin-top: 0;">Message</h3>
          <p style="line-height: 1.6;">${message}</p>
        </div>

        <div style="margin-top: 20px; padding: 20px; background: #f1f5f9; border-radius: 8px;">
          <p style="margin: 0; color: #64748b; font-size: 14px;">
            This email was sent from the contact form on your website.
          </p>
        </div>
      </div>
    `,
  }


  try {
    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error('Email sending error:', error)
    return { success: false, error: error.message }
  }
}

// Send job application email
export const sendJobApplicationEmail = async (formData) => {
  const { name, email, phone, position, experience, coverLetter, resume } = formData

  const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: "nitesh.kpoddar15@gmail.com",
        pass: "zuai wugs vrdm uyrd"
      }
    });

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: `<${process.env.EMAIL_USER}>`,
    subject: `New Job Application: ${position} - ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #334155; border-bottom: 2px solid #64748b; padding-bottom: 10px;">
          New Job Application
        </h2>

        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #475569; margin-top: 0;">Applicant Information</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Position:</strong> ${position}</p>
          <p><strong>Experience:</strong> ${experience}</p>
        </div>

        ${coverLetter ? `
        <div style="background: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #475569; margin-top: 0;">Cover Letter</h3>
          <p style="line-height: 1.6;">${coverLetter}</p>
        </div>
        ` : ''}

        <div style="margin-top: 20px; padding: 20px; background: #f1f5f9; border-radius: 8px;">
          <p style="margin: 0; color: #64748b; font-size: 14px;">
            This email was sent from the job application form on your website.
            ${resume ? 'Resume attachment included.' : 'No resume attached.'}
          </p>
        </div>
      </div>
    `,
    attachments: resume ? [{
      filename: resume.name,
      content: Buffer.from(await resume.arrayBuffer())
    }] : []
  }

  try {
    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error('Email sending error:', error)
    return { success: false, error: error.message }
  }
}

// Generic email sending function for admin use
export const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: "nitesh.kpoddar15@gmail.com",
      pass: "zuai wugs vrdm uyrd"
    }
  });

  const mailOptions = {
    from: '"Bajrang Industries" <nitesh.kpoddar15@gmail.com>',
    to: to,
    subject: subject,
    html: html
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error: error.message };
  }
}

// Send training registration email
export const sendTrainingRegistrationEmail = async (formData) => {
  const { name, email, company, phone, course, trainingType, participants, message, resume } = formData

  const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: "nitesh.kpoddar15@gmail.com",
        pass: "zuai wugs vrdm uyrd"
      }
    });

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: `<${process.env.EMAIL_USER}>`,
    subject: `New Training Registration: ${course} - ${company}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #334155; border-bottom: 2px solid #64748b; padding-bottom: 10px;">
          New Training Registration
        </h2>

        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #475569; margin-top: 0;">Contact Information</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Company:</strong> ${company}</p>
          <p><strong>Phone:</strong> ${phone}</p>
        </div>

        <div style="background: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #475569; margin-top: 0;">Training Details</h3>
          <p><strong>Course:</strong> ${course}</p>
          <p><strong>Training Type:</strong> ${trainingType}</p>
          <p><strong>Participants:</strong> ${participants}</p>
        </div>

        ${message ? `
        <div style="background: #f0f9ff; padding: 20px; border: 1px solid #bae6fd; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #475569; margin-top: 0;">Additional Requirements</h3>
          <p style="line-height: 1.6;">${message}</p>
        </div>
        ` : ''}

        <div style="margin-top: 20px; padding: 20px; background: #f1f5f9; border-radius: 8px;">
          <p style="margin: 0; color: #64748b; font-size: 14px;">
            This email was sent from the training registration form on your website.
            ${resume ? 'Resume attachment included.' : 'No resume attached.'}
          </p>
        </div>
      </div>
    `,
    attachments: resume ? [{
      filename: resume.name,
      content: Buffer.from(await resume.arrayBuffer())
    }] : []
  }

  try {
    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error('Email sending error:', error)
    return { success: false, error: error.message }
  }
}
