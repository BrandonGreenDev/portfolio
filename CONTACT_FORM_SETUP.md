# Contact Form Setup Guide

This guide will help you set up the fully functional contact form with EmailJS integration, form validation, spam protection, and error handling.

## Features

✅ **Form Validation**: Real-time validation with custom error messages  
✅ **Email Delivery**: EmailJS integration for reliable email sending  
✅ **Spam Protection**: Honeypot fields, rate limiting, and content analysis  
✅ **Error Handling**: Comprehensive error handling with user-friendly messages  
✅ **Accessibility**: ARIA labels, screen reader support, and keyboard navigation  
✅ **Loading States**: Visual feedback during form submission  
✅ **Mobile Responsive**: Optimized for all device sizes

## Setup Instructions

### 1. EmailJS Configuration

1. **Create an EmailJS Account**

   - Go to [https://www.emailjs.com/](https://www.emailjs.com/)
   - Sign up for a free account

2. **Set up Email Service**

   - Go to "Email Services" in your EmailJS dashboard
   - Click "Add New Service"
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the setup instructions

3. **Create Email Template**

   - Go to "Email Templates" in your EmailJS dashboard
   - Click "Create New Template"
   - Use this template structure:

   ```
   Subject: New Contact Form Message: {{subject}}

   Hello {{to_name}},

   You have received a new message from your portfolio contact form:

   Name: {{from_name}}
   Email: {{from_email}}
   Subject: {{subject}}

   Message:
   {{message}}

   ---
   This message was sent from your portfolio contact form.
   Reply to: {{reply_to}}
   ```

4. **Get Your Credentials**
   - **Public Key**: Account > API Keys
   - **Service ID**: Email Services > Your Service
   - **Template ID**: Email Templates > Your Template

### 2. Environment Configuration

1. **Copy the environment template**:

   ```bash
   cp .env.example .env
   ```

2. **Fill in your EmailJS credentials** in `.env`:
   ```env
   REACT_APP_EMAILJS_PUBLIC_KEY=your_actual_public_key
   REACT_APP_EMAILJS_SERVICE_ID=your_actual_service_id
   REACT_APP_EMAILJS_TEMPLATE_ID=your_actual_template_id
   ```

### 3. Test the Form

1. **Start your development server**:

   ```bash
   npm start
   ```

2. **Navigate to the contact section** and test:
   - Fill out all required fields
   - Try submitting with invalid data to test validation
   - Submit a valid form to test email delivery

## Form Validation Rules

### Name Field

- **Required**: Yes
- **Min Length**: 2 characters
- **Max Length**: 50 characters
- **Pattern**: Letters, spaces, hyphens, and apostrophes only

### Email Field

- **Required**: Yes
- **Pattern**: Valid email format
- **Max Length**: 254 characters
- **Domain Check**: Basic domain validation

### Subject Field

- **Required**: Yes
- **Min Length**: 5 characters
- **Max Length**: 100 characters

### Message Field

- **Required**: Yes
- **Min Length**: 10 characters
- **Max Length**: 1000 characters

## Spam Protection Features

### 1. Honeypot Field

- Hidden field that bots typically fill out
- Legitimate users won't see or interact with it

### 2. Rate Limiting

- Maximum 3 submissions per 15-minute window
- Stored in browser localStorage

### 3. Form Timing

- Minimum 3 seconds to fill form (prevents instant bot submissions)
- Maximum 30 minutes (prevents stale form submissions)

### 4. Content Analysis

- Detects suspicious patterns and keywords
- Blocks excessive repetition
- Limits number of links in messages

### 5. Form Token

- CSRF-like protection with time-based tokens

## Error Handling

The form handles various error scenarios:

- **Validation Errors**: Real-time field validation
- **Network Errors**: Connection issues
- **EmailJS Errors**: Service authentication/configuration issues
- **Rate Limiting**: Too many submissions
- **Spam Detection**: Suspicious content or behavior

## Accessibility Features

- **ARIA Labels**: Proper labeling for screen readers
- **Error Announcements**: Screen reader alerts for errors
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Proper focus indicators
- **Color Contrast**: High contrast error states

## Customization

### Validation Rules

Edit `src/hooks/useFormValidation.ts` to modify validation rules.

### Spam Protection

Adjust settings in `src/config/emailConfig.ts`:

- Rate limiting thresholds
- Timing requirements
- Content analysis patterns

### Styling

Modify `src/components/Contact/Contact.css` for visual customization.

### Error Messages

Update messages in `src/config/emailConfig.ts`.

## Troubleshooting

### Form Not Sending Emails

1. Check EmailJS credentials in `.env`
2. Verify EmailJS service is active
3. Check browser console for errors
4. Test EmailJS template manually

### Validation Not Working

1. Check browser console for JavaScript errors
2. Verify form field names match validation rules
3. Test with different input values

### Spam Protection Too Strict

1. Adjust rate limiting in `src/config/emailConfig.ts`
2. Modify content analysis patterns
3. Check timing requirements

## Security Considerations

- Environment variables keep credentials secure
- Rate limiting prevents abuse
- Content sanitization prevents XSS
- Honeypot fields catch basic bots
- Form timing prevents automated submissions

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11+ (with polyfills)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Lazy validation (only validates after user interaction)
- Debounced validation to prevent excessive API calls
- Minimal bundle size impact
- Efficient re-renders with React hooks

---

For additional help or questions, refer to the [EmailJS documentation](https://www.emailjs.com/docs/) or check the browser console for detailed error messages.
