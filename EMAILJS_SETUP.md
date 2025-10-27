# EmailJS Setup Instructions

✅ **Service ID already configured:** service_baqi0jd

To complete the email functionality for contact forms, follow these remaining steps:

## 1. Create Email Template in EmailJS
- Log in to https://dashboard.emailjs.com/
- Go to "Email Templates" in the left sidebar
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

**To Email:** candlelightgiftshop1@gmail.com

- Click "Save" and copy the **Template ID**

## 2. Get Your Public Key
- In EmailJS dashboard, go to "Account" > "General"
- Find your **Public Key** (also called API Key)
- Copy it

## 3. Update .env File
Add these two remaining keys to your `.env` file:
```
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

Replace `your_template_id_here` and `your_public_key_here` with the actual values from EmailJS.

## 4. Connect Your Email Account
- In EmailJS dashboard, go to "Email Services"
- You should see service_baqi0jd
- Make sure it's connected to **candlelightgiftshop1@gmail.com**
- If not, click on it and connect your Gmail account

## 5. Test the Form
- Restart your development server (`npm run dev` or `bun dev`)
- Go to the Contact page or scroll to contact form on homepage
- Fill out and submit the form
- Check candlelightgiftshop1@gmail.com for the email

---

## Current Configuration Status:
- ✅ Service ID: service_baqi0jd (configured)
- ⏳ Template ID: Not configured yet
- ⏳ Public Key: Not configured yet

**Important Notes:**
- Free EmailJS accounts allow 200 emails per month
- Make sure to whitelist your domain in EmailJS settings
- For production, consider upgrading to a paid plan for more emails
- The forms will show success messages but won't send emails until all three keys are configured