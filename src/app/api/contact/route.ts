import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Email configuration
    const recipientEmail = 'juniadulislam549@gmail.com';
    
    // Format email content
    const emailContent = `
New Contact Form Submission

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}

Message:
${message}
    `.trim();

    console.log('Contact form submission:', {
      name,
      email,
      phone,
      message,
      recipientEmail
    });

    // In a production environment, you would integrate with an email service like:
    // - SendGrid
    // - AWS SES
    // - Resend
    // - Nodemailer with SMTP
    
    // For now, we'll log the email and return success
    // You'll need to set up email service with API keys in environment variables
    
    // Example with Resend (commented out - requires setup):
    /*
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'Contact Form <noreply@yourdomain.com>',
      to: recipientEmail,
      replyTo: email,
      subject: `New Contact Form: ${name}`,
      text: emailContent,
    });
    */

    return NextResponse.json(
      { 
        success: true, 
        message: 'Message received successfully',
        note: 'Email sending requires email service configuration'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to process contact form submission' },
      { status: 500 }
    );
  }
}
