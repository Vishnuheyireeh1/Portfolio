// ─────────────────────────────────────────────────────────────
//  EDIT EVERYTHING HERE
//  This is the only file you need to touch to make the site yours.
//  No JSX, no CSS — just swap the words, links, and projects below.
// ─────────────────────────────────────────────────────────────

// Project cover images (live in src/assets, imported so Vite bundles them).
import hospitalityErpCover from '../assets/HospitalityErp.jpeg'
import tuckonCover from '../assets/Tuckon.jpeg'
import naambCover from '../assets/Naamb.jpeg'
import aiRecCover from '../assets/Ai-rec2.jpeg'
// Case-study (modal) screenshots.
import erpShot1 from '../assets/Erp1.png'
import erpShot2 from '../assets/Erp2.png'
import tuckonShot2 from '../assets/Tuckon2.png'
import tuckonShot3 from '../assets/Tuckon3.png'
import naambShot2 from '../assets/Naamb2.png'
import naambShot3 from '../assets/Naamb3.png'
import aiRecShot1 from '../assets/Ai-rec1.jpeg'
import aiRecShot3 from '../assets/Ai-rec3.jpeg'
import boutiqueCover from '../assets/Boutique.jpeg'
import boutiqueShot1 from '../assets/Boutique2.jpeg'
import boutiqueShot2 from '../assets/Boutique3.jpeg'
import boutiqueErpCover from '../assets/BoutiqueErp.jpeg'
import boutiqueErpShot1 from '../assets/BoutiqueErp2.png'
import boutiqueErpShot2 from '../assets/BoutiqueErp3.png'
import gymCover from '../assets/Gym.jpeg'
import gymShot1 from '../assets/Gym2.jpeg'
import gymShot2 from '../assets/Gym3.jpeg'

export const content = {
  meta: {
    name: 'Vishnudev K',
    role: 'Full Stack Developer',
    initials: 'V.',
    email: 'vishnudkbalan@gmail.com',
  },

  nav: [
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
  ],
  cta: { label: 'Get in touch', href: '#contact' },

  // Links shown in the full-screen menu overlay (the menu-button popup).
  menu: [
    { label: 'Work', href: '#work' },
    { label: 'What I do', href: '#services' },
    { label: 'Toolkit', href: '#stack' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ],

  hero: {
    // The headline reads:  {lead} <accent>{rest}
    lead: 'Full-stack developer based in',
    accent: 'Kerala', // the italic + underlined word
    rest: '. I help people and businesses turn their ideas into fast, easy-to-use websites and apps — built and launched end to end.',
    // Hero image (bottom-right). Placeholder stock photo for now — swap it for
    // your own photo any time: drop a file in /public and set image: '/me.jpg'.
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop',
    facts: [
      { label: 'Based', value: 'Palakkad, Kerala, India' },
      { label: 'Experience', value: '2+ years' },
      { label: 'Focus', value: 'Websites & web apps' },
      { label: 'Open for', value: 'Freelance & full-time' },
    ],
    badge: { mark: 'V.', text: 'Available' },
  },

  // Pinned scroll-reveal statement (text fills in word-by-word as you scroll).
  intro: {
    text: 'I turn ideas into real, shipped products — fast, scalable web apps built end to end, from a clean React front-end to a solid API and database, deployed and running in the real world.',
  },

  // Projects — a pinned scroll story (rolling number + image stage + crossfading
  // text). No live links: each project opens an in-page case-study overlay with
  // screenshots + a detailed write-up.
  //   → Swap the picsum `cover` / `screenshots` placeholders for your real
  //     images: drop files in /public/work/<slug>/ and point the paths there,
  //     e.g. cover: '/work/tuckon/cover.png',
  //     screenshots: ['/work/tuckon/1.png', '/work/tuckon/2.png'].
  //     `video` is optional, e.g. video: '/work/hospitality-erp/demo.mp4'.
  work: {
    kicker: 'Selected Work',
    title: 'Things I’ve built',
    projects: [
      {
        slug: 'boutique-ecommerce',
        title: 'Boutique E-commerce Website',
        year: '2026',
        tag: 'React · Express · Postgres · E-commerce',
        desc: 'A designer boutique online — shop ready-made, or have the same piece stitched to your own measurements.',
        hue: 356,
        cover: boutiqueCover,
        detail: {
          tagline: 'Made to your measure — a boutique storefront where custom stitching is part of the checkout.',
          role: 'Full-stack developer',
          overview:
            'A designer boutique’s own platform, built to replace the templated SaaS site it was running on. Customers browse sarees, blouses, kurtis and lehengas, then choose between a ready-made piece and the same piece stitched to their measurements — the measurement form changes per category and is checked again on the server before an order is taken. Underneath sit Razorpay payments, server-generated PDF bills and a fashion-academy section. The admin side is built phone-first in plain words, so shop staff who don’t work with computers can run orders, products and content without being taught a dashboard.',
          features: [
            'Storefront with categories and sub-categories, plus size, colour, price and “ready to ship / stitched to your size” filters',
            'Custom stitching — measurement rules per category, saved measurements on the account, and guide videos for each field',
            'Razorpay checkout with server-created orders, HMAC verification and a webhook',
            'PDF bills generated on the server for paid orders',
            'Customer accounts with Google sign-in alongside email, plus order tracking',
            'Fashion Design Academy section with courses and enquiries',
            'Admin panel written for non-technical staff — next-step buttons instead of raw status dropdowns',
            'Banners, categories, products, orders, enquiries and page text all editable from admin',
          ],
          tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Express', 'Prisma', 'PostgreSQL', 'Razorpay', 'Railway', 'Cloudflare'],
          screenshots: [boutiqueShot1, boutiqueShot2],
        },
      },
      {
        slug: 'boutique-erp',
        title: 'Boutique ERP',
        year: '2026',
        tag: 'React · Express · PostgreSQL · ERP',
        desc: 'The system the boutique actually runs on — counter billing, the stitching workshop, stock, staff and the books.',
        hue: 342,
        cover: boutiqueErpCover,
        detail: {
          tagline: 'One app for the whole shop: scan, bill, stitch, pay, and close the books.',
          role: 'Full-stack developer',
          overview:
            'A custom ERP that runs a boutique’s entire day. The counter bills by barcode; the workshop follows every garment from booking to hand-over with the customer’s measurements, the tailor assigned and what that tailor earns; stock is an append-only ledger so a value is never typed in by hand; and the accounts build themselves out of the documents, so the shop’s accountant gets a trial balance and a balance sheet without anyone doing double entry. It prints on the shop’s existing dot-matrix printer and is written throughout in the words the staff already use.',
          features: [
            'Counter billing — barcode scan, a fast keyboard-only mode, split payments and credit',
            'Stitching jobs — measurements per garment, tailor assignment, ready-by dates, job costing and profit per job',
            'Brand orders — stitching under other labels, with part deliveries, a bill per delivery and brand statements',
            'Inventory as an append-only ledger — stock value and average cost written by one engine, never edited directly',
            'Purchases, suppliers, payments, returns and supplier statements',
            'Staff with monthly and per-piece pay, payslips and tailor settlements',
            'Training institute — students, batches, fees and receipts',
            'Expenses, day book, cash counts and profit & loss',
            'Double-entry accounts generated from the documents, with trial balance and balance sheet',
            'Excel export and a date range on every list, barcode labels, and dot-matrix or PDF bills',
            'Nightly database backups with a restore script that was tested against a scratch database',
          ],
          tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Express', 'Prisma', 'PostgreSQL', 'ExcelJS', 'PDFKit'],
          screenshots: [boutiqueErpShot1, boutiqueErpShot2],
        },
      },
      {
        slug: 'gym-website',
        title: 'Gym Website',
        year: '2026',
        tag: 'React · Tailwind · Motion',
        desc: 'A gym’s site built around the questions a walk-in actually asks — and a WhatsApp button beside every answer.',
        hue: 36,
        cover: gymCover,
        detail: {
          tagline: 'Real prices, real trainers, no hidden charges — a gym site that gets people through the door.',
          role: 'Designer & front-end developer',
          overview:
            'A single-page site for a local gym, built section by section around what someone actually wants to know before they join: who will train me, what does it really cost, what equipment is there, and does it work for people like me. Membership pricing comes straight from the gym’s own plan manager and shows a per-month figure for every duration, so nothing reads as hidden. The enquiry form doesn’t vanish into an inbox — it composes a WhatsApp message with the person’s goal already filled in, which is how this gym’s customers get in touch anyway.',
          features: [
            'Membership plans with the gym’s real pricing — two training types, six durations, per-month equivalents and a couple rate',
            'Trainers, member transformations and Google reviews',
            'Equipment and gallery sections built from the gym’s own photos',
            'Enquiry form that opens a pre-filled WhatsApp message, plus floating call and WhatsApp buttons',
            'Google Maps embed and one-tap directions to the exact pin',
            'Address, phone, timings and plans all driven from one data file the gym can edit',
            'Scroll-reveal motion throughout, built mobile-first',
            'Local SEO — title, metadata and details matched to the Google Business Profile',
          ],
          tech: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Google Maps'],
          screenshots: [gymShot1, gymShot2],
        },
      },
      {
        slug: 'ai-receptionist',
        title: 'AI Receptionist',
        year: '2026',
        tag: 'PERN · AI Voice · Multi-tenant SaaS',
        desc: 'An AI receptionist that answers a clinic’s calls, books appointments 24/7 — plus a full clinic-management dashboard.',
        hue: 262,
        cover: aiRecCover,
        detail: {
          tagline: 'A virtual front desk that never sleeps — bolted onto a full clinic-management system.',
          role: 'Full-stack developer',
          overview:
            'An AI receptionist for clinics: patients call or text and the AI greets them (in English or Malayalam), understands they want an appointment, checks the doctor’s real availability and books — or cancels — it, saving every conversation automatically. Underneath sits a complete clinic-management platform: doctors, services, medicines, appointments, patient records and prescriptions. It’s multi-tenant — a super admin spins up new clinics, each with its own login, settings and AI — so it sells as SaaS. The AI and human staff share the exact same booking engine, so nothing ever falls out of sync.',
          features: [
            'AI receptionist — answers calls (Retell voice) and messages (OpenAI chat), books and cancels appointments 24/7',
            'Bilingual — handles patients in English or Malayalam, with every conversation saved automatically',
            'Shared booking engine — AI and front-desk staff book against the same real-time availability, never out of sync',
            'Clinic management — doctors, schedules, services, time-off, medicines and waitlists',
            'Appointments — book, reschedule, no-show, recurring and a calendar view',
            'Patients — records, history, vitals, documents and allergies',
            'Prescriptions doctors write and print',
            'Multi-tenant SaaS — super admin creates clinics, each with its own login, settings and AI',
            'Notifications across in-app, email and SMS, with two-way Google Calendar sync',
          ],
          tech: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Retell AI', 'OpenAI', 'Google Calendar', 'Twilio', 'JWT'],
          screenshots: [aiRecShot1, aiRecShot3],
        },
      },
      {
        slug: 'hospitality-erp',
        title: 'Hotel Ops & Accounts ERP',
        year: '2025',
        tag: 'React · Django · ERP / CRM',
        desc: 'A full internal ERP that runs a resort’s daily operations and accounts.',
        hue: 198,
        cover: hospitalityErpCover,
        detail: {
          tagline: 'The system a real business runs its day on — staff + admin, end to end.',
          role: 'Full-stack developer',
          overview:
            'A complete internal management system that runs a hospitality business day to day — expenses, payroll, bookings, laundry, room cleaning and cafeteria — split into separate Staff and Admin roles. Bookings from the public website flow straight into the system, and every entry rolls up into live ledgers and reports. This is the project I’m proudest of: real users, real money, real responsibility.',
          features: [
            'Role-based access — separate Staff and Admin modules with secure login and login alerts',
            'Expense management — Salary, Rental, Capital, Service and Maintenance, with bill / voucher uploads',
            'Tamper-proof records — submitted entries are locked; edits require Admin OTP approval',
            'Bookings — website + manual entries, guest details, billing, paid / pending and auto check-in reminders',
            'Laundry, room-cleaning and cafeteria modules with stock tracking',
            'Day Book, ledgers and daily / monthly reports, exportable to Excel',
            'Admin dashboard — income vs expense, category breakdowns and approvals',
          ],
          tech: ['React', 'Django REST', 'PostgreSQL', 'JWT', 'Twilio OTP', 'Email', 'Render / AWS'],
          screenshots: [erpShot1, erpShot2],
        },
      },
      {
        slug: 'tuckon',
        title: 'Tuckon',
        year: '2025',
        tag: 'MERN · E-commerce',
        desc: 'A bold fashion-accessories store — rings, chains, watches, caps & more.',
        hue: 28,
        cover: tuckonCover,
        detail: {
          tagline: 'Adorn your story — a full-stack fashion-accessories store.',
          role: 'Full-stack developer',
          overview:
            'A production MERN e-commerce store for fashion accessories — rings, chains, bracelets, watches, caps and eyewear. It pairs a bold, editorial storefront with a complete shopping flow: browse curated categories, add to cart, pay securely and track the order. Built and shipped solo, front to back.',
          features: [
            'Category storefront — Necklaces, Bracelets, Watches, Caps, Eyewear & Women’s with dropdown navigation',
            'Curated collections — Best Sellers, Trending, New Arrivals & Clearance Sale',
            'Product detail pages with images, pricing and add-to-cart',
            'Cart and secure Razorpay checkout',
            'JWT authentication and user accounts',
            'Order management and “Track Your Order”',
            'Promo bar, contact page and a mobile-first responsive layout',
          ],
          tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'JWT', 'Razorpay', 'Supabase', 'Railway'],
          screenshots: [tuckonShot2, tuckonShot3],
        },
      },
      {
        slug: 'naamb',
        title: 'Naamb',
        year: '2025',
        tag: 'MERN · Portfolio + E-commerce',
        desc: 'An Indian art & handcrafted-goods brand — part portfolio, part online store — with its own admin CMS.',
        hue: 14,
        cover: naambCover,
        detail: {
          tagline: 'Experience the art of India — a MERN brand portfolio & crafts store.',
          role: 'Full-stack developer',
          overview:
            'A MERN platform for Naamb’s Indian art and handcrafted goods that works two ways: a portfolio that showcases the brand’s story, craft and collections, and a full e-commerce store layered on top. It has category-based browsing, a complete cart-to-checkout flow with online payments, and a custom admin CMS so the owner can manage the whole catalogue without touching code.',
          features: [
            'Brand portfolio — showcases the production’s story, craft and collections, not just a checkout',
            'Category catalogue with dedicated product detail pages',
            'Cart and secure Razorpay checkout',
            'JWT authentication and user accounts',
            'Admin dashboard (CMS) to manage products, categories, stock and images',
            'In-app image uploads stored with the application',
            'About, contact and a fully responsive layout',
          ],
          tech: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Razorpay', 'Render → Hostinger'],
          screenshots: [naambShot2, naambShot3],
        },
      },
    ],
  },

  // Client / company work — projects I contributed to as part of a team. Shown
  // as a compact honest list (no solo case-study claims).
  clientWork: {
    kicker: 'Also worked on',
    title: 'Client & company work',
    note: 'Production apps I helped build as part of a team during my work — shipped for real clients.',
    items: [
      {
        name: 'Manufacturing ERP',
        desc: 'An internal ERP and workflow platform for an Australian architectural-metalwork manufacturer — one app that runs the whole business. It walks every job through an 11-stage quote-to-cash workflow with role-based access (director, sales, factory, installers), AI-powered drawing analysis, PDF generation, and two-way sync with NetSuite accounting and Outlook calendars. Live and in daily use.',
        tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'NetSuite', 'Outlook', 'AI'],
      },
      {
        name: 'Ottila Travel Platforms',
        desc: 'B2B travel and tourism platforms for Ottila, customised across global, India and Switzerland markets. I worked on scalable React front-ends backed by Django REST APIs — building reusable components and region-specific configuration so each market runs its own catalogue, content and booking flows on a shared, maintainable codebase.',
        tech: ['React', 'Django', 'PostgreSQL'],
      },
      {
        name: 'Tatmeen — Trace & Track',
        desc: 'A secure product-traceability platform for the UAE supply-chain market, enabling real-time tracking and authentication of products across the chain. Built with React and Django on SQL Server, with a focus on data integrity, scalability and reliable performance for production-level supply-chain operations.',
        tech: ['React', 'Django', 'SQL Server'],
      },
      {
        name: 'Deftlab',
        desc: 'A mobile-friendly corporate website for Deftlab, an IT-consulting brand. Built in React with a clean, responsive layout and SEO best practices to improve search visibility and give the company a fast, professional online presence.',
        tech: ['React', 'SEO', 'Responsive'],
      },
    ],
  },

  services: {
    title: 'What I do',
    items: [
      {
        no: '01',
        name: 'Full-Stack Web Apps',
        desc: 'End-to-end products: React on the front, Node/Express or Django on the back, a real database underneath. I take an idea from the first commit to a live URL.',
      },
      {
        no: '02',
        name: 'Front-End Development',
        desc: 'Responsive, accessible interfaces in React and Next.js — clean state, smooth UX and components that stay easy to maintain as the product grows.',
      },
      {
        no: '03',
        name: 'Back-End & APIs',
        desc: 'REST APIs, auth, data models and business logic with Node/Express and Django REST — structured, secure and built to scale.',
      },
      {
        no: '04',
        name: 'E-Commerce',
        desc: 'Full storefronts: catalogs, carts, checkout, order management and secure online payments with Razorpay, JWT and Google OAuth.',
      },
      {
        no: '05',
        name: 'Dashboards & Internal Tools',
        desc: 'Admin panels, CRMs and ops/accounts systems with role-based access, reports and the real workflows a team actually needs day to day.',
      },
      {
        no: '06',
        name: 'Deployment & Delivery',
        desc: 'Shipping to the cloud — Railway, Render, MongoDB Atlas, Supabase — with the env, build and hosting wired up and actually running.',
      },
    ],
  },

  // Tools, languages & AI I work with — shown as a pinned, horizontally
  // scrolling gallery (the heading stays put, the cards slide right → left).
  // Logos come from the Simple Icons CDN (https://simpleicons.org) — swap
  // `icon` to any slug, or point it at a local file in /public (like the
  // ChatGPT mark below). `color` is the brand colour shown on hover; omit it
  // for mono-brands so they keep the theme ink. `note` is the short caption.
  stack: {
    kicker: 'Toolkit',
    title: 'Tools I work with',
    intro:
      'A living snapshot of the languages, frameworks and AI tools I reach for to design, build and ship — chosen for clarity, speed and craft.',
    groups: [
      {
        name: 'Languages',
        items: [
          { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript', color: '#3178C6', note: 'My default for anything built to last — types catch mistakes before they ship and make big refactors fearless. The backbone of every serious project.' },
          { name: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript', color: '#F7DF1E', note: 'The language I think in for the web, front to back. Flexible enough for a five-minute prototype, powerful enough for a full product.' },
          { name: 'Python', icon: 'https://cdn.simpleicons.org/python', color: '#3776AB', note: 'My tool for scripting, automation and data work. When I need to glue systems together or crunch something quickly, this is what I reach for.' },
          { name: 'HTML5', icon: 'https://cdn.simpleicons.org/html5', color: '#E34F26', note: 'The semantic, accessible foundation under everything I make. Get the structure right first — it is what keeps a site fast, readable and inclusive.' },
          { name: 'CSS', icon: 'https://cdn.simpleicons.org/css', color: '#663399', note: 'Where I sweat the details — layout, motion, theming and design systems, all hand-tuned. Modern CSS does far more than it gets credit for.' },
        ],
      },
      {
        name: 'Frameworks',
        items: [
          { name: 'React', icon: 'https://cdn.simpleicons.org/react', color: '#61DAFB', note: 'My core library for building interfaces — composable, predictable and a joy to reason about. Almost everything I ship starts here.' },
          { name: 'Angular', icon: 'https://cdn.simpleicons.org/angular', color: '#DD0031', note: 'A batteries-included framework for large, structured apps — TypeScript-first, with routing, forms and DI out of the box. My pick when a project wants strong conventions.' },
          { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs', note: 'Production React with routing, server rendering and the full stack handled. The framework I trust to take an idea all the way to launch.' },
          { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs', color: '#5FA04E', note: 'JavaScript on the server and the engine behind my tooling. One language across the whole stack keeps everything cohesive.' },
          { name: 'Tailwind CSS', icon: 'https://cdn.simpleicons.org/tailwindcss', color: '#06B6D4', note: 'Utility-first styling that lets me design right in the markup and ship at speed. Consistent, maintainable and surprisingly expressive.' },
          { name: 'Three.js', icon: 'https://cdn.simpleicons.org/threedotjs', note: 'WebGL and real-time 3D made approachable. How I bring shaders, particles and interactive scenes into the browser.' },
          { name: 'GSAP', icon: 'https://cdn.simpleicons.org/greensock', color: '#88CE02', note: 'Precise, buttery timeline animation with control over every frame. My weapon of choice for motion that feels intentional.' },
          { name: 'Vite', icon: 'https://cdn.simpleicons.org/vite', color: '#646CFF', note: 'An instant dev server and lightning-fast builds. The tooling fades into the background so I can stay focused on building.' },
          { name: 'Framer', icon: 'https://cdn.simpleicons.org/framer', color: '#0055FF', note: 'Rapid interactive prototypes and motion studies. Where I test how something should feel before committing it to code.' },
        ],
      },
      {
        name: 'AI Tools',
        items: [
          { name: 'Claude', icon: 'https://cdn.simpleicons.org/claude', color: '#D97757', note: 'Where I go for long, careful reasoning — large refactors, architecture decisions and serious writing. Holds huge context without ever losing the thread.' },
          { name: 'GitHub Copilot', icon: 'https://cdn.simpleicons.org/githubcopilot', note: 'In-editor autocomplete that finishes the boilerplate before I do. Keeps me in flow so my energy goes into the hard parts, not the busywork.' },
          { name: 'Antigravity', icon: '/logos/antigravity.svg', note: 'Google’s agentic coding IDE — I lean on it to plan, build and refactor across a whole project, not just a single file.' },
          { name: 'Cursor', icon: 'https://cdn.simpleicons.org/cursor', note: 'My AI-first code editor — chat, edits and agents right inside the codebase, exactly where I work.' },
          { name: 'Replit', icon: 'https://cdn.simpleicons.org/replit', color: '#F26207', note: 'A cloud IDE with an AI agent — I use it to spin up, prototype and ship apps straight from the browser, no local setup.' },
          { name: 'n8n', icon: 'https://cdn.simpleicons.org/n8n', color: '#EA4B71', note: 'Workflow automation I wire up to connect apps, APIs and AI — turning repetitive steps and integrations into hands-off pipelines.' },
        ],
      },
      {
        name: 'Version Control',
        items: [
          { name: 'Git', icon: 'https://cdn.simpleicons.org/git', color: '#F05032', note: 'Version control for every line I write — branching, history and safe experiments. The safety net that makes moving fast cheap.' },
          { name: 'GitHub', icon: 'https://cdn.simpleicons.org/github', note: 'Where my code lives — repos, pull requests and the place I collaborate and ship from.' },
        ],
      },
      {
        name: 'Hosting & Deployment',
        items: [
          { name: 'Render', icon: 'https://cdn.simpleicons.org/render', color: '#46E3B7', note: 'Simple cloud hosting for back-ends and full-stack apps — push to deploy, no DevOps headache.' },
          { name: 'Railway', icon: 'https://cdn.simpleicons.org/railway', note: 'Fast deploys for APIs and databases — spin up a service and a Postgres in minutes.' },
          { name: 'DigitalOcean', icon: 'https://cdn.simpleicons.org/digitalocean', color: '#0080FF', note: 'Droplets and managed services for when I want full control over the server.' },
          { name: 'Hostinger', icon: 'https://cdn.simpleicons.org/hostinger', color: '#673DE6', note: 'Affordable hosting and domains — my go-to for getting client sites live.' },
          { name: 'VPS Server', icon: '/logos/vps.svg', note: 'A raw Linux box I configure myself — Nginx, environments and deploys, full control end to end.' },
        ],
      },
    ],
  },

  testimonial: {
    kicker: 'How I work',
    quote:
      'I’d rather ship something real and refine it than polish something that never goes live. Clarity over cleverness, momentum over perfection — and code I won’t be scared to open six months from now.',
    author: 'Vishnudev K',
    role: 'Full-Stack Developer',
  },

  about: {
    kicker: 'About',
    statement:
      'I’m a full-stack developer who loves turning ideas into real, shipped products — fast, reliable and built to scale.',
    paragraphs: [
      'I’m Vishnudev — a 22-year-old developer from Kerala with 2+ years building production web apps across the MERN stack and Django. I’ve shipped live e-commerce stores, an internal operations & accounts ERP, and B2B platforms used by real teams.',
      'I care about clean REST APIs, performance and actually getting things to production — auth, payments, role-based access and cloud deploys. I learn fast, ship faster, and I’m always chasing the next thing to build.',
    ],
    columns: [
      { title: 'Stack', items: ['React / Next.js', 'Node.js / Express', 'Django', 'MongoDB / PostgreSQL'] },
      { title: 'Languages', items: ['English', 'Malayalam', 'Hindi', 'Tamil'] },
    ],
  },

  contact: {
    kicker: 'Contact',
    title: 'Got an idea? Let’s build something fast, scalable and real.',
    note: 'Available for new projects, collaborations and the right opportunities — I usually reply within a day.',
  },

  socials: [
    { label: 'LinkedIn', href: 'https://linkedin.com/in/vishnudevk2003' },
    { label: 'GitHub', href: 'https://github.com/Vishnuheyireeh1' },
    { label: 'WhatsApp', href: 'https://wa.me/919746653420' },
    { label: 'Email', href: 'mailto:vishnudkbalan@gmail.com' },
  ],
}
