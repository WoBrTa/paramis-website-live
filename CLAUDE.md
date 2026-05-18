# Paramis - AI Strategy Consulting

## Business Overview
- **Company**: Paramis
- **Focus**: AI Strategy Consulting
- **Owner**: Woody Taylor

## Infrastructure

### Domain & Hosting
- **Domain**: paramis.ai (registered with GoDaddy)
- **Website**: GitHub Pages (repository: WoBrTa/paramis-website)
- **DNS**: Managed via GoDaddy

### Email (Google Workspace)
- **Primary Email**: woody@paramis.ai
- **Email Aliases**:
  - info@paramis.ai
  - contact@paramis.ai (used on website contact form)
- **Personal Email**: woody.taylor@gmail.com (for reference)

### Chrome Profiles
The owner uses two Chrome profiles:
1. **Personal**: woody.taylor@gmail.com
2. **Paramis**: woody@paramis.ai (for business workspace)

## Website Details

### Key Files
- `index.html` - Main landing page (services, about, contact sections)
- `portal.html` - Client Portal login page (Potemkin/placeholder — no real auth)
- `peregrine-logo.png` - Brand logo (peregrine falcon)
- `headshot.jpg` - About section photo

### Navigation
The site nav links: Services, About, Contact, Client Portal

### Contact Form
The website uses a mailto link for contact:
```html
<a href="mailto:contact@paramis.ai?subject=Website%20Inquiry" class="contact-link contact-btn">
```

### Client Portal
- `portal.html` is a standalone page styled to match the main site
- Has username/password fields and a "Sign In" button
- Sign-in triggers a fake "Authenticating..." state, then shows an "Access Restricted" message directing visitors to request access via the Contact section
- No backend authentication — purely cosmetic for now

## Setup History (January 2026)
- Google Workspace configured with domain verification via GoDaddy Domain Connect
- MX records and DKIM automatically configured
- Email aliases (info@ and contact@) added via Google Admin Console

## Notes for Future Sessions
- When testing email, the contact@paramis.ai alias forwards to woody@paramis.ai
- The website mailto link requires the browser to have an email handler configured
- If controlling the Paramis Chrome profile, use the switch_browser tool if needed
