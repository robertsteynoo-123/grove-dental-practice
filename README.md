# Grove Dental Practice — Website Pitch Template

A bespoke, highly creative, and visually distinctive static landing page built as a pitch template for **Grove Dental Practice** in East Ham, London. 

This template moves away from the conventional "stacked grid on a white background" style typical of dental websites. It introduces an organic, botanical design language matching the "Grove" name and implements rich, accessible interactive features to engage prospective patients.

---

## Design and Visual Decisions

- **Color Palette:**
  - **Primary (Deep Calming Teal - `#0e3e43`):** Promotes clinical professionalism, serenity, and patient trust.
  - **Background (Warm Oat / Sand - `#faf7f2`):** Soft, organic, and welcoming background, avoiding clinical coldness.
  - **Accent (Muted Terracotta / Coral - `#d06a4c`):** Used sparingly to draw focus to critical actions (e.g., active timeline nodes, buttons, focus rings).
  - **Text (Dark Charcoal - `#2c3335`):** Retains high contrast (WCAG AA compliant) while being softer on the eyes than pure black.
- **Typography:**
  - **Display / Headers:** *Plus Jakarta Sans* — A modern geometric sans-serif that features organic curves on terminals, reinforcing the nature theme.
  - **Body Text:** *Inter* — For ultra-clear readability at all device sizes.
- **Organic Visual Theme:**
  - Includes asymmetric image frames, staggered overlapping cards, and smooth curved section dividers instead of rigid horizontal lines.
  - Sparing, purposeful CSS micro-interactions and motion (floating tracer leaf, incremental counter, expanding services rows) that automatically respect OS `prefers-reduced-motion` settings.

---

## Key Features & Interactivity

1. **Sticky Nav & Floating CTA:** Smart navigation with active section highlighting. Persistent "Book Now" action floats on desktop and locks as a sticky action bar on mobile.
2. **Practice Heritage Timeline:** Interactive timeline tabs that allow users to select eras of the clinic's history (1980s -> Mr Jorder -> Dr Hussain -> Today).
3. **Interactive Services Grid:** Clean, custom SVG line-drawn icons that animate on hover. Click triggers expand a full details box below the row (incorporating NHS band prices hyperlinked to details, and Private prices) without disrupting the layout.
4. **Google Reviews Carousel:** Auto-advancing (6s), keyboard navigable, and pause-on-hover carousel showcasing 8 real 5★ reviews.
5. **Formspree Integration:** Client-validated appointment request form submitting directly to Formspree, featuring hidden subject identifier inputs and inline error/success messages.
6. **GDPR Google Map Consent:** Complies with UK GDPR regulations. Google Maps iframe only loads and injects cookies once the cookie consent banner or the map placeholder is accepted.

---

## Placeholders Checklist (`[TO CONFIRM]` comments)

The source code contains comments flagging information that must be verified and updated with the clinic:
- [ ] **Clinician GDC Numbers:** GDC registration numbers are mandatory in the UK. (Dr Hussain, Dr Ansari, Dr Julka).
- [ ] **Staff Profiles & Portraits:** Confirm biographies and replace stock Unsplash portrait photos with real team photographs.
- [ ] **Full Names:** Confirm full names for Taiyba, Radha, Marina, and the dental nurses.
- [ ] **NHS & Private Pricing:** Verify private pricing stubs and ensure NHS Band fees are updated.
- [ ] **Clinic Founding Year:** Verify early timeline milestones.
- [ ] **Contact Email:** Replace placeholder `contact@grovedentalpractice.co.uk` with their live email.
- [ ] **New Patients Status:** Confirm if the clinic is actively accepting new NHS and private patients.
- [ ] **Regulatory Policies:** Add official links for Privacy Policy, Cookie Policy, and Complaints Procedure in the footer.

---

## How to View Locally

You can open the website files directly in your web browser:
1. Double-click the `index.html` file or drag it into any web browser.
2. Alternatively, run a simple local web server using Python in the directory:
   ```bash
   python -m http.server 8000
   ```
   Then navigate to `http://localhost:8000` in your browser. This enables cookies simulation to test the Google Map consent functionality.

---

## Connecting & Pushing to GitHub

If your terminal returns an `xcrun` error when running Git commands on macOS:
1. Run this command in your Mac Terminal to install the command line developer tools:
   ```bash
   xcode-select --install
   ```
2. Navigate to this directory in your terminal:
   ```bash
   cd "/Users/robertsteyn/Desktop/websites/grove-dental-practice"
   ```
3. Initialize the Git repository and push it to your GitHub repository:
   ```bash
   git init
   git checkout -b main
   git add .
   git commit -m "Initial commit of Grove Dental Practice website"
   git remote add origin https://github.com/robertsteynoo-123/grove-dental-practice.git
   git push -u origin main
   ```
