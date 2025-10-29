import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { rateLimit, rateLimitResponse } from '@/lib/rate-limit'

// Input validation helpers
function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '')
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export async function POST(request: Request) {
  try {
    // Get client IP for rate limiting
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown'

    // Rate limit: 5 requests per hour per IP
    if (!rateLimit(ip, 5, 3600000)) {
      return rateLimitResponse()
    }

    const body = await request.json()
    const { name, email, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      )
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name)
    const sanitizedEmail = sanitizeInput(email)
    const sanitizedMessage = sanitizeInput(message)

    // Validate email format
    if (!isValidEmail(sanitizedEmail)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Validate lengths
    if (sanitizedName.length < 2 || sanitizedName.length > 100) {
      return NextResponse.json(
        { success: false, message: 'Name must be 2-100 characters' },
        { status: 400 }
      )
    }

    if (sanitizedMessage.length < 10 || sanitizedMessage.length > 1000) {
      return NextResponse.json(
        { success: false, message: 'Message must be 10-1000 characters' },
        { status: 400 }
      )
    }

    // Check for spam patterns
    const spamPatterns = [
      /viagra/i,
      /cialis/i,
      /lottery/i,
      /winner/i,
      /\$\$\$/,
      /click here/i,
    ]

    const hasSpam = spamPatterns.some(
      (pattern) =>
        pattern.test(sanitizedMessage) || pattern.test(sanitizedName)
    )

    if (hasSpam) {
      // Silently reject spam
      return NextResponse.json({
        success: true,
        message: 'Email sent successfully',
      })
    }

    // Configure email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // Enhanced email template
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Portfolio Contact: ${sanitizedName}`,
      text: `
Name: ${sanitizedName}
Email: ${sanitizedEmail}
Sent: ${new Date().toLocaleString()}

Message:
${sanitizedMessage}
      `,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 5px 5px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-top: none; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #667eea; }
            .value { margin-top: 5px; }
            .message-box { background: white; padding: 15px; border-left: 4px solid #667eea; margin-top: 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Contact Form Submission</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${sanitizedName}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value">${sanitizedEmail}</div>
              </div>
              <div class="field">
                <div class="label">Sent:</div>
                <div class="value">${new Date().toLocaleString()}</div>
              </div>
              <div class="field">
                <div class="label">Message:</div>
                <div class="message-box">${sanitizedMessage.replace(/\n/g, '<br>')}</div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      replyTo: sanitizedEmail,
    }

    // Send email
    await transporter.sendMail(mailOptions)

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
    })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to send email. Please try again later.' },
      { status: 500 }
    )
  }
}
