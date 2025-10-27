# EmailJS Setup Instructions

To enable email functionality for contact forms, follow these steps:

## 1. Create EmailJS Account
- Go to https://www.emailjs.com/
- Sign up for a free account

## 2. Create Email Service
- In EmailJS dashboard, go to "Email Services"
- Click "Add New Service"
- Choose your email provider (Gmail recommended)
- Connect your email account: **candlelightgiftshop1@gmail.com**

## 3. Create Email Template
- Go to "Email Templates"
- Click "Create New Template"
- Use this template structure:

**Template Name:** contact_form

**Subject:** New Contact Form Submission from {{from_name}}

**Content:**
```
New message from Candle Light Gift Shop website:

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}

Message:
{{message}}

---
This email was sent from the contact form on your website.
```

## 4. Get Your Keys
- Service ID: Found in Email Services section
- Template ID: Found in Email Templates section
- Public Key: Found in Account > General settings

## 5. Update .env File
Add these lines to your `.env` file:
```
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

## 6. Test the Form
- Restart your development server
- Go to the Contact page or scroll to contact form on homepage
- Fill out and submit the form
- Check candlelightgiftshop1@gmail.com for the email

---

**Important Notes:**
- Free EmailJS accounts allow 200 emails per month
- Make sure to whitelist your domain in EmailJS settings
- For production, consider upgrading to a paid plan for more emails
