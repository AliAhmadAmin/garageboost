# Email System Documentation

## 📧 Implemented Email Features

### 1. **Booking Confirmation Emails** ✅ NEW
- **Trigger**: When a booking is created via `/api/bookings`
- **Recipients**: Customer (if valid email provided)
- **Template**: Professional HTML with appointment details
- **Features**:
  - Booking reference number with status badge
  - Appointment date/time
  - Service details and pricing
  - Vehicle information (if provided)
  - Payment status indicator
  - Garage contact information
  - Call-to-action button for payment (if deposit required)

### 2. **Invoice Emails** ✅ NEW
- **Trigger**: When invoice created via `/api/invoices`
- **Recipients**: Customer (if valid email)
- **Template**: Professional invoice format with itemization
- **Features**:
  - Invoice number and date
  - Item details (labor, parts, services)
  - Subtotal, VAT calculation, total amount
  - Vehicle information
  - Payment balance due
  - Cancellation/refund information
  - Garage contact details

### 3. **Quote Emails** ✅ EXISTING
- **Endpoint**: `POST /api/quotes/[id]/email`
- **Template**: Professional quote format
- **Features**:
  - Quote number and expiry date
  - Vehicle details (make, model, VRM, MOT expiry)
  - Service itemization with pricing
  - VAT breakdown
  - Expiry warning if quote expires soon
  - Garage branding and contact info

### 4. **Invoice Email (Manual)** ✅ EXISTING
- **Endpoint**: `POST /api/invoices/[id]/email`
- **Manual trigger**: Staff can resend invoice to customer
- **Professional features**:
  - Complete invoice details with itemization
  - Payment tracking
  - Balance due information
  - Job reference and vehicle details

### 5. **MOT Reminder Emails** ✅ EXISTING
- **Endpoint**: `POST /api/reminders`
- **Trigger**: Staff creates reminder for MOT/Tax renewal
- **Template**: Professional reminder with urgency indicators
- **Features**:
  - Vehicle information
  - MOT expiry countdown
  - Urgent flag (red) if expiring within 30 days
  - Garage contact information with phone/email links

### 6. **Campaign/Marketing Emails** ✅ EXISTING
- **Endpoint**: `POST /api/send-message`
- **Recipients**: Multiple customers or manual email entry
- **Features**:
  - Subject line and custom message
  - Customer personalization (name, vehicle VRM)
  - Professional footer with garage details
  - Support for both selected customers and manual recipients

---

## 🔧 Email Configuration

**Email Service**: Resend (reliable transactional email provider)

**Configuration Sources** (in order of precedence):
1. Database API keys (stored securely in garage admin config)
2. Environment variables (`.env.local`):
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL`
   - `RESEND_FROM_NAME`

**Required Variables**:
- `RESEND_API_KEY` - API key from Resend service
- `RESEND_FROM_EMAIL` - Email address to send from (e.g., `noreply@garage.com`)
- `RESEND_FROM_NAME` - Display name (e.g., `Your Garage`)

---

## 📋 Email Templates Location

All templates are built using React-like HTML templates:

1. **Booking Confirmation**: `src/lib/email-templates.ts` → `buildBookingConfirmationHtml()`
2. **Invoice Email**: `src/lib/email-templates.ts` → `buildInvoiceEmailHtml()`
3. **Quote Template**: `src/lib/quote-template.ts` → `buildQuoteHtml()`
4. **Reminder**: `src/app/api/reminders/route.ts` (inline HTML)
5. **Campaign Messages**: `src/app/api/send-message/route.ts` (inline HTML)

---

## 🎯 Professional Design Elements

All email templates include:
- **Gradient headers** with branding
- **Color-coded status badges** (pending, confirmed, urgent)
- **Structured sections** with clear labels
- **Professional typography** and spacing
- **Responsive design** for mobile/desktop
- **Secure links and CTAs**
- **Footer with copyright and sender info**
- **Fallback text for unsupported clients**

---

## ✅ Testing Checklist

- [x] Booking confirmation emails send on booking creation
- [x] Invoice emails send when invoice created
- [x] Quote emails can be manually sent
- [x] Invoice reminder emails can be manually resent
- [x] MOT/Tax reminders send with urgency indicators
- [x] Campaign emails support personalization
- [x] All templates are responsive and professional
- [x] Graceful fallback if email service not configured

---

## 🔐 Security & Privacy

- Email addresses are stored securely in database
- API keys are encrypted in database or stored as env variables
- Guests without email get placeholder `@noemail.local` addresses
- Email opt-out support for customers via database flag
- No unencrypted credentials in code

---

## 🚀 Next Steps (Optional)

- [ ] Add email delivery tracking/webhooks from Resend
- [ ] Add email templates editor in admin dashboard
- [ ] SMS message support alongside email
- [ ] Email scheduling/delayed send
- [ ] A/B testing for marketing campaigns
- [ ] Unsubscribe links in marketing emails
