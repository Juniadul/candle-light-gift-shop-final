import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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

    const recipientEmail = 'candlelightgiftshop1@gmail.com';
    
    // Format email content
    const emailSubject = `New Contact Form Submission from ${name}`;
    const emailHtml = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
      <br>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `;

    const emailText = `
New Contact Form Submission

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}

Message:
${message}
    `.trim();

    // Send email using Resend
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: 'Candle Light Gift Shop <onboarding@resend.dev>',
          to: recipientEmail,
          replyTo: email,
          subject: emailSubject,
          html: emailHtml,
          text: emailText,
        });

        return NextResponse.json(
          { success: true, message: 'Message sent successfully!' },
          { status: 200 }
        );
      } catch (emailError: any) {
        console.error('Email sending error:', emailError);
        
        // Still return success to user but log the error
        return NextResponse.json(
          { 
            success: true, 
            message: 'Message received. Email notification pending.',
            warning: 'Email service configuration needed'
          },
          { status: 200 }
        );
      }
    } else {
      // No API key configured
      console.log('Contact form submission (email not configured):', {
        name,
        email,
        phone,
        message,
        recipientEmail
      });

      return NextResponse.json(
        { 
          success: true, 
          message: 'Message received successfully',
          note: 'Email sending requires RESEND_API_KEY in environment variables'
        },
        { status: 200 }
      );
    }

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to process contact form submission' },
      { status: 500 }
    );
  }
}