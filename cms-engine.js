/**
 * SHAHICRUNCH ENTERPRISE CMS & ON-PAGE SEO ENGINE (cms-engine.js)
 * 
 * Centralized Data Store & Logic for:
 * 1. Multi-Page Content Block Management (H1, H2, H3, Paragraphs, Buttons, Images, Alt Text, Links)
 * 2. Complete On-Page SEO Panel (Focus Keyword, Meta Title, Description, Canonical, Robots, Social OG/Twitter)
 * 3. Real Content SEO Diagnostics (No fake scores - strict computation)
 * 4. Draft -> Preview -> Publish Lifecycle
 * 5. Media Library with Alt-Text Auditor
 * 6. Internal Link Management & Suggestions
 * 7. Schema.org JSON-LD Structured Data Builder
 * 8. 301/302 Redirects Management
 * 9. Site-wide Settings & Admin Auth
 * 10. Change History Audit Trail & One-Click Rollback
 * 11. Static Code Snapshot Generator
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.CmsEngine = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const STORAGE_KEY_PUBLISHED = 'shahicrunch_cms_published_v3';
  const STORAGE_KEY_DRAFTS = 'shahicrunch_cms_drafts_v3';
  const STORAGE_KEY_HISTORY = 'shahicrunch_cms_history_v3';
  const STORAGE_KEY_SETTINGS = 'shahicrunch_cms_settings_v3';
  const STORAGE_KEY_REDIRECTS = 'shahicrunch_cms_redirects_v3';
  const STORAGE_KEY_BLOG = 'shahicrunch_cms_blog_v3';
  const STORAGE_KEY_MEDIA = 'shahicrunch_cms_media_v3';
  const STORAGE_KEY_AUTH = 'shahicrunch_cms_auth_session_v3';

  // Default Site Settings
  const defaultSettings = {
    siteName: 'ShahiCrunch',
    siteUrl: 'https://shahicrunch.in',
    titleSeparator: '—',
    defaultTitle: 'ShahiCrunch — Royal Taste in Every Crunch | Premium Ice Cream Jaipur',
    defaultMetaDesc: "ShahiCrunch is Jaipur's luxury ice cream brand crafting authentic Kesar Pista, Double Crunch, Chocolive & Dry Fruit Raita. Distributor partnerships open across India.",
    defaultOgImage: './hero.jpg',
    organization: {
      name: 'ShahiCrunch Dairy & Confectionery',
      address: 'MI Road, C-Scheme, Jaipur, Rajasthan, 302001, India',
      email: 'hello@shahicrunch.in'
    },
    socials: {
      whatsapp: './contact.html',
      instagram: 'https://instagram.com/shahicrunch',
      facebook: 'https://facebook.com/shahicrunch',
      twitter: 'https://x.com/shahicrunch'
    },
    robotsTxt: "User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /admin.html\n\nSitemap: https://shahicrunch.in/sitemap.xml",
    sitemapXml: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://shahicrunch.in/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>https://shahicrunch.in/about</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://shahicrunch.in/products</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://shahicrunch.in/distributor</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://shahicrunch.in/testimonials</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://shahicrunch.in/contact</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://shahicrunch.in/blog</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
</urlset>`,
    adminUser: 'admin@shahicrunch.in',
    adminPass: 'shahi2026'
  };

  // Canonical Master Pages Registry
  const defaultPages = {
    '/': {
      id: 'home',
      url: '/',
      name: 'Home',
      badge: 'Main Landing',
      status: 'Published',
      lastUpdated: '2026-09-15',
      seo: {
        title: 'ShahiCrunch â€” Royal Ice Cream Jaipur | Rich & Creamy',
        metaDescription: "Experience royal ice cream jaipur by ShahiCrunch. Authentic Kesar Pista, Double Crunch & Belgian Chocolive. Pan-India distributor partnerships open.",
        focusKeyword: 'ice cream jaipur',
        secondaryKeywords: ['premium ice cream rajasthan', 'kesar pista ice cream', 'ice cream distributor jaipur'],
        slug: '',
        canonicalUrl: 'https://shahicrunch.in/',
        robots: 'index, follow',
        ogTitle: 'ShahiCrunch â€” Royal Ice Cream Jaipur | Rich & Creamy',
        ogDescription: "Experience royal ice cream jaipur by ShahiCrunch. Authentic Kesar Pista, Double Crunch & Belgian Chocolive.",
        ogImage: './hero.jpg',
        twitterCard: 'summary_large_image',
        twitterTitle: 'ShahiCrunch â€” Royal Ice Cream Jaipur | Rich & Creamy',
        twitterDescription: "Experience royal ice cream jaipur by ShahiCrunch. Authentic Kesar Pista, Double Crunch & Belgian Chocolive.",
        twitterImage: './hero.jpg',
        schemaType: 'FoodEstablishment'
      },
      content: {
        pageTitle: 'Home â€” ShahiCrunch Jaipur',
        badgeText: 'âœ¨ From the Pink City of Jaipur',
        h1: 'Royal Ice Cream Jaipur â€” The Authentic Taste of ShahiCrunch',
        introParagraph: 'Welcome to the home of authentic royal ice cream jaipur. Crafted with pure Kashmiri saffron, Belgian cocoa, and California nuts. Indulge in 100% vegetarian, slow-churned royalty in every scoop.',
        ctaPrimaryText: 'Explore Flavors',
        ctaPrimaryUrl: '#flavors',
        ctaSecondaryText: 'Become a Distributor',
        ctaSecondaryUrl: '#distributor-b2b',
        h2s: [
          'Crafted for Connoisseurs â€” Best Ice Cream Jaipur',
          'The Royal Difference & Artisanal Purity',
          'Grow Your FMCG Business With ShahiCrunch',
          'Partner With Jaipur\'s Royal Ice Cream Brand'
        ],
        h3s: [
          'Kesar Pista Royal Formulation',
          'Double Crunch Wafer Fudge',
          'Chocolive Belgian Cocoa',
          'Dry Fruit Raita Jaipur Heritage',
          'Premium Ingredients Standard',
          'Slow-Churned Dairy Texture',
          '100% Vegetarian Certified',
          'Cold-Chain Delivery Network',
          'Send an Inquiry Today'
        ],
        flavorItems: [
          {
            name: 'Kesar Pista',
            tag: 'Signature Royal',
            description: 'Pure Kashmiri saffron strands blended with roasted green emerald pistachios.',
            badge: 'Bestseller â˜…',
            image: './kesar-pista.jpg',
            alt: 'Kesar Pista Ice Cream ShahiCrunch Jaipur'
          },
          {
            name: 'Double Crunch',
            tag: 'Crisp Delight',
            description: 'Golden wafer crunch coated in molten fudge, topped with roasted hazelnuts.',
            badge: 'Kid Favorite â˜…',
            image: './double-crunch.jpg',
            alt: 'Double Crunch chocolate fudge waffle ice cream ShahiCrunch'
          },
          {
            name: 'Chocolive',
            tag: 'Dark Indulgence',
            description: 'Silky Belgian dark cocoa cream infused with rich chocolate curls and edible gold leaf.',
            badge: 'Premium â˜…',
            image: './chocolive.jpg',
            alt: 'Chocolive Belgian Chocolate Ice Cream Jaipur'
          },
          {
            name: 'Dry Fruit Raita',
            tag: 'Jaipur Heritage',
            description: 'Traditional sweet curd dessert reimagined with royal cashews, raisins & cardamom.',
            badge: 'Authentic â˜…',
            image: './dry-fruit-raita.jpg',
            alt: 'Dry Fruit Raita Traditional Ice Cream ShahiCrunch'
          }
        ],
        features: [
          { title: 'Premium Ingredients', desc: 'Real saffron, Belgian cocoa, and California nuts â€” no compromise.' },
          { title: 'Slow-Churned', desc: 'Hand-crafted batches for a denser, creamier texture.' },
          { title: '100% Vegetarian', desc: 'Made with pure dairy and natural flavors. No artificial additives.' },
          { title: 'Cold-Chain Delivery', desc: 'Pan-India distribution with uncompromised freshness.' }
        ],
        bodyTextBlocks: [
          'ShahiCrunch brings the authentic aristocratic dessert heritage of Jaipur into modern gourmet ice cream crafting. Every single batch is produced using pure whole milk, premium dairy solids, and hand-selected natural ingredients without any artificial stabilizers, synthetic aromas, or hydrogenated vegetable fats.',
          'Our master churners take pride in slow freezing and gentle aeration, resulting in a dense, velvety consistency that melts luxuriously on your tongue while preserving maximum rich flavor depth in every mouthful. For dessert connoisseurs looking for the most memorable ice cream jaipur, our royal recipes deliver unparalleled sensory delight and exquisite traditional character.',
          'From high-end destination weddings in Rajasthan to luxury grocery aisles and boutique cafes across Northern India, ShahiCrunch is celebrated as the pinnacle of vegetarian indulgence and sweet culinary artistry. Each scoop reflects our unwavering dedication to culinary excellence, sourcing only Grade-1 Mongra saffron directly from Kashmir and single-origin cocoa beans from Belgium.',
          'Distributors, retail shop owners, and franchise seekers enjoy complete end-to-end operational assistance, temperature-controlled cold chain logistics, attractive gross margins, and high-impact point-of-sale branding. Our temperature monitored fleet guarantees that our premium tubs arrive in pristine condition, maintaining a consistent minus 24 degrees Celsius throughout transit across Rajasthan and neighboring states.',
          'Whether savoring a solitary moment of indulgence or celebrating life milestones with extended family and friends, ShahiCrunch transforms an everyday sweet into a royal ceremonial banquet. Connect with our dedicated sales and culinary team today to explore bespoke supply agreements, retail freezer installations, or custom celebration catering packages.'
        ],
        distributorHeadline: 'Grow Your FMCG Business With ShahiCrunch',
        distributorParagraph: 'Join our growing network of distributors, wedding caterers, and luxury cafe stockists across Rajasthan, Gujarat, and Delhi NCR. Attractive trade margins and complete promotional backing.',
        distributorCtaText: 'Apply For Distributorship â†’',
        distributorCtaUrl: '#contact-section',
        contactHeadline: 'Partner With Jaipur\'s Royal Ice Cream Brand',
        contactSubheadline: 'Drop your details to apply for distributorship or book a royal tasting.',
        contactAddress: 'MI Road, C-Scheme, Jaipur, Rajasthan, 302001',
        contactEmail: 'hello@shahicrunch.in'
      },
      internalLinks: [
        { anchor: 'Our Flavors', href: '#flavors', target: 'same_page' },
        { anchor: 'Royal Difference', href: '#why-royal', target: 'same_page' },
        { anchor: 'Become a Distributor', href: '#distributor-b2b', target: 'same_page' },
        { anchor: 'Contact', href: '#contact-section', target: 'same_page' },
        { anchor: 'Partner With Us', href: '#distributor-b2b', target: 'same_page' },
        { anchor: 'Explore Flavors', href: './products.html', target: 'internal' },
        { anchor: 'Apply For Distributorship', href: './distributor.html', target: 'internal' }
      ]
    },
    '/about': {
      id: 'about',
      url: '/about',
      name: 'About Us',
      badge: 'Company Story',
      status: 'Published',
      lastUpdated: '2026-09-15',
      seo: {
        title: 'ShahiCrunch Story â€” Royal Ice Cream Brand Jaipur Story',
        metaDescription: "Discover the royal ice cream brand jaipur story of ShahiCrunch. From Pink City heritage recipes to India's finest slow-churned artisanal desserts.",
        focusKeyword: 'ice cream brand jaipur story',
        secondaryKeywords: ['rajasthani royal ice cream', 'artisanal ice cream jaipur heritage'],
        slug: 'about',
        canonicalUrl: 'https://shahicrunch.in/about',
        robots: 'index, follow',
        ogTitle: 'ShahiCrunch Story â€” Royal Ice Cream Brand Jaipur Story',
        ogDescription: "Discover the royal ice cream brand jaipur story of ShahiCrunch. From Pink City heritage recipes to India's finest slow-churned artisanal desserts.",
        ogImage: './hero.jpg',
        twitterCard: 'summary_large_image',
        twitterTitle: 'ShahiCrunch Story â€” Royal Ice Cream Brand Jaipur Story',
        twitterDescription: "Discover the royal ice cream brand jaipur story of ShahiCrunch. From Pink City heritage recipes to India's finest slow-churned artisanal desserts.",
        twitterImage: './hero.jpg',
        schemaType: 'AboutPage'
      },
      content: {
        pageTitle: 'About Us â€” ShahiCrunch Royal Heritage',
        badgeText: 'Heritage & Craftsmanship',
        h1: 'Royal Heritage â€” The ShahiCrunch Ice Cream Brand Jaipur Story',
        introParagraph: 'Discover the authentic ice cream brand jaipur story of ShahiCrunch. Born in the royal corridors of the Pink City of Jaipur, ShahiCrunch was founded on a simple philosophy: ice cream is not just a dessert; it is an indulgence worthy of kings.',
        ctaPrimaryText: 'Explore Signature Flavors',
        ctaPrimaryUrl: './products.html',
        ctaSecondaryText: 'Partner With Us',
        ctaSecondaryUrl: './distributor.html',
        h2s: [
          'Born in the Pink City â€” Our Ice Cream Brand Jaipur Story',
          'Our Artisanal Philosophy & Heritage Craft',
          '100% Pure Dairy Commitment Across Rajasthan'
        ],
        h3s: [
          'Traditional Royal Recipes Passed Down',
          'Modern Cold-Chain Integrity & Logistics',
          'Zero Compromise Food Safety Quality'
        ],
        bodyTextBlocks: [
          'Jaipur has long been celebrated worldwide for its royal culinary traditions, where desserts were crafted with pure saffron, silver vark, and slow-roasted nuts. ShahiCrunch brings this aristocratic lineage into modern artisanal confectionery.',
          'Every batch of our ice cream is slow-churned in small quantities using 100% pure cow and buffalo milk sourced directly from vetted regional dairy farms. We never use hydrogenated vegetable fats or synthetic flavors. This meticulous care is the cornerstone of the ice cream brand jaipur story that has captured hearts across North India.',
          'Our journey began with a vision to preserve the royal banquet desserts of Rajputana, updating timeless formulations like Kesar Pista and Dry Fruit Raita into premium packaged tubs that maintain peak sensory freshness across India.',
          'Our mission is to establish Rajasthan\'s proudest luxury FMCG brand with distribution spanning over 40 cities across India, elevating dessert standards with uncompromised vegetarian ethics and culinary elegance.',
          'Behind every single tub lies hours of research into traditional confectionary methods, balancing sweetness and rich butterfat to honor centuries-old palace gastronomy. Our artisans work alongside food technologists to ensure consistent international quality benchmarks without compromising our historic royal roots.',
          'As we expand our presence from heritage havelis to modern retail hypermarkets, we remain loyal to our founding principles: honoring timeless Rajasthani hospitality, nurturing direct partnerships with local dairy farmers, and providing our patrons with unforgettable moments of pure confectionary joy.',
          'Each ingredient is traceable from organic dairy pastures to final packaging, embodying the honesty and royal dignity that inspire our brand across Rajasthan.'
        ]
      },
      internalLinks: [
        { anchor: 'Home', href: './index.html', target: 'internal' },
        { anchor: 'Products', href: './products.html', target: 'internal' },
        { anchor: 'Distributor', href: './distributor.html', target: 'internal' },
        { anchor: 'Contact', href: './contact.html', target: 'internal' }
      ]
    },
    '/products': {
      id: 'products',
      url: '/products',
      name: 'Flavors / Products',
      badge: 'Product Catalog',
      status: 'Published',
      lastUpdated: '2026-09-15',
      seo: {
        title: 'Royal Ice Cream Flavors Jaipur | ShahiCrunch Premium Tubs',
        metaDescription: "Discover signature royal ice cream flavors jaipur by ShahiCrunch. Pure Kashmiri Kesar Pista, crunchy Belgian Chocolive & authentic Dry Fruit Raita.",
        focusKeyword: 'ice cream flavors jaipur',
        secondaryKeywords: ['kesar pista ice cream tub', 'belgian chocolate crunch ice cream', 'dry fruit raita ice cream'],
        slug: 'products',
        canonicalUrl: 'https://shahicrunch.in/products',
        robots: 'index, follow',
        ogTitle: 'Royal Ice Cream Flavors Jaipur | ShahiCrunch Premium Tubs',
        ogDescription: 'Explore 4 signature royal ice creams crafted in Jaipur: Kashmiri Kesar Pista, Double Crunch, Chocolive & Dry Fruit Raita.',
        ogImage: './kesar-pista.jpg',
        twitterCard: 'summary_large_image',
        twitterTitle: 'Royal Ice Cream Flavors Jaipur | ShahiCrunch Premium Tubs',
        twitterDescription: 'Explore 4 signature royal ice creams crafted in Jaipur: Kashmiri Kesar Pista, Double Crunch, Chocolive & Dry Fruit Raita.',
        twitterImage: './kesar-pista.jpg',
        schemaType: 'ItemList'
      },
      content: {
        pageTitle: 'Our Flavors â€” ShahiCrunch Signature Collection',
        badgeText: 'Signature Flavor Portfolio',
        h1: 'Crafted for Connoisseurs â€” Royal Ice Cream Flavors Jaipur',
        introParagraph: 'Explore the handcrafted royal ice cream flavors jaipur from ShahiCrunch. Every recipe is an orchestral harmony of authentic raw ingredients, rich creaminess, and signature crunch. Available in 120ml singles and 500ml family indulgence tubs.',
        ctaPrimaryText: 'Inquire for Stockists',
        ctaPrimaryUrl: './contact.html',
        ctaSecondaryText: 'Distributor Terms',
        ctaSecondaryUrl: './distributor.html',
        h2s: [
          'Signature Royal Ice Cream Flavors Jaipur Collection',
          'Gourmet Ingredients Specification & Purity',
          'Cold-Chain Delivery Standards Across India'
        ],
        h3s: [
          'Kesar Pista 500ml Indulgence Tub',
          'Double Crunch 500ml Chocolate Fudge',
          'Chocolive Belgian Cocoa 500ml Tub',
          'Dry Fruit Raita 500ml Heritage Special'
        ],
        bodyTextBlocks: [
          'Kesar Pista is infused with pure Kashmiri Grade-1 saffron threads and slow-roasted Iranian pistachios for an aromatic royal bouquet that lingers elegantly. It is our flagship bestseller across Rajasthan and stands as the quintessential representative of royal ice cream flavors jaipur.',
          'Double Crunch combines rich butterscotch cream with double roasted wafer crunch, molten chocolate ribbons, and chopped hazelnuts to deliver a sensational multi-layered bite in every spoonful.',
          'Chocolive is a decadent creation made with 70% imported Belgian dark cocoa, studded with crisp dark chocolate curls and dusted with royal chocolate flakes for the true chocolate lover.',
          'Dry Fruit Raita transforms the historic Jaipur wedding celebration treat into a luxurious dessert tub, loaded with golden raisins, royal cashews, green cardamom, and rich dairy cream.',
          'All flavors are manufactured under strict FSSAI sanitary standards using pasteurized whole dairy milk, ensuring zero micro-bacterial contamination and maximum nutritional goodness. We never incorporate artificial thickeners, chemical foaming agents, or palm oil.',
          'Our 500ml family tubs feature tamper-evident air-tight lids and thermal-barrier containers that resist melting during transit, guaranteeing that the sublime taste and texture remain exactly as our master confectioners created them in our certified artisanal kitchens.',
          'From wedding dessert counters to cozy family dining tables, these four signature flavor formulations bring royal luxury within reach of every dessert connoisseur.'
        ]
      },
      internalLinks: [
        { anchor: 'Home', href: './index.html', target: 'internal' },
        { anchor: 'Distributor Application', href: './distributor.html', target: 'internal' },
        { anchor: 'Contact Us', href: './contact.html', target: 'internal' }
      ]
    },
    '/distributor': {
      id: 'distributor',
      url: '/distributor',
      name: 'Distributor Partnership',
      badge: 'B2B Portal',
      status: 'Published',
      lastUpdated: '2026-09-15',
      seo: {
        title: 'Ice Cream Distributorship Rajasthan | ShahiCrunch FMCG B2B',
        metaDescription: "Apply for ice cream distributorship rajasthan with ShahiCrunch. High profit margins, branded deep freezers, marketing backing & reliable cold chain.",
        focusKeyword: 'ice cream distributorship rajasthan',
        secondaryKeywords: ['ice cream franchise jaipur', 'fmcg distributor opportunities rajasthan', 'ice cream business dealership'],
        slug: 'distributor',
        canonicalUrl: 'https://shahicrunch.in/distributor',
        robots: 'index, follow',
        ogTitle: 'Ice Cream Distributorship Rajasthan | ShahiCrunch FMCG B2B',
        ogDescription: 'Partner with Jaipur fastest growing premium ice cream brand. Complete cold-chain support and high profit margins.',
        ogImage: './hero.jpg',
        twitterCard: 'summary_large_image',
        twitterTitle: 'Ice Cream Distributorship Rajasthan | ShahiCrunch FMCG B2B',
        twitterDescription: 'Partner with Jaipur fastest growing premium ice cream brand. Complete cold-chain support and high profit margins.',
        twitterImage: './hero.jpg',
        schemaType: 'Service'
      },
      content: {
        pageTitle: 'Distributorship â€” Partner With ShahiCrunch',
        badgeText: 'FMCG Distributorship Open',
        h1: 'Apply for Royal Ice Cream Distributorship Rajasthan',
        introParagraph: 'Unlock high profitability with an authorized ice cream distributorship rajasthan through ShahiCrunch. We offer attractive gross margins, dedicated deep-freezer branding, point-of-sale promotional backing, and zero temperature-abuse cold-chain logistics across North India.',
        ctaPrimaryText: 'Submit Application Form',
        ctaPrimaryUrl: '#distributor-form',
        ctaSecondaryText: 'Corporate Inquiry Desk',
        ctaSecondaryUrl: './contact.html',
        h2s: [
          'Why Choose Our Ice Cream Distributorship Rajasthan',
          'Commercial Margins & Exceptional Return on Investment',
          'Distributor Territory Application & Onboarding Process'
        ],
        h3s: [
          '35%+ Gross Retail Margins Guaranteed',
          'Point-of-Sale Freezer Deployment Support',
          'Zero-Abuse Cold-Chain Logistics Network'
        ],
        bodyTextBlocks: [
          'Partnering with ShahiCrunch provides wholesalers and retail stockists with a high-margin, rapid-turnover portfolio in the fast growing luxury FMCG dessert category across Rajasthan, Gujarat, and Delhi NCR. When evaluating an ice cream distributorship rajasthan, commercial partners look for proven brand loyalty, consistent inventory turnaround, and solid corporate reliability.',
          'We supply company-branded premium glass-top deep freezers, eye-catching outdoor glow-signs, in-store promotional displays, and full digital hyper-local marketing campaigns to drive foot traffic straight to your counters.',
          'Our dedicated cold-chain transport fleet operates with continuous IoT temperature monitoring at minus 24 degrees Celsius, guaranteeing that every tub arrives in pristine, factory-fresh condition without any risk of crystallization or melt damage.',
          'Territories are granted with exclusive geographical rights to safeguard distributor profitability and encourage long-term commercial scale in tier-1, tier-2, and tier-3 distribution hubs.',
          'Our onboarding program includes in-depth sales training for your ground personnel, digital billing integration, inventory forecasting assistance, and comprehensive credit support for top-performing stockists.',
          'With consumer demand for premium artisanal desserts climbing at over 28% year on year, partnering with ShahiCrunch positions your distribution enterprise at the vanguard of the modern Indian food and beverage revolution.',
          'Join our elite network of franchise owners and supply partners who are reshaping modern FMCG distribution across Rajasthan and Northern India today.'
        ]
      },
      internalLinks: [
        { anchor: 'Home', href: './index.html', target: 'internal' },
        { anchor: 'Explore Products', href: './products.html', target: 'internal' },
        { anchor: 'Contact Helpline', href: './contact.html', target: 'internal' }
      ]
    },
    '/testimonials': {
      id: 'testimonials',
      url: '/testimonials',
      name: 'Reviews & Testimonials',
      badge: 'Social Proof',
      status: 'Published',
      lastUpdated: '2026-09-15',
      seo: {
        title: 'ShahiCrunch Reviews Jaipur | Rated 4.9â˜… Royal Ice Cream',
        metaDescription: "Read authentic shahicrunch reviews jaipur from dessert lovers and distributors. Rated 4.9/5 stars for pure ingredients, royal taste and rapid delivery.",
        focusKeyword: 'shahicrunch reviews jaipur',
        secondaryKeywords: ['best ice cream jaipur ratings', 'shahicrunch customer feedback'],
        slug: 'testimonials',
        canonicalUrl: 'https://shahicrunch.in/testimonials',
        robots: 'index, follow',
        ogTitle: 'ShahiCrunch Reviews Jaipur | Rated 4.9â˜… Royal Ice Cream',
        ogDescription: 'Read customer & distributor reviews for ShahiCrunch Ice Cream in Jaipur. Rated 4.9/5 stars.',
        ogImage: './hero.jpg',
        twitterCard: 'summary_large_image',
        twitterTitle: 'ShahiCrunch Reviews Jaipur | Rated 4.9â˜… Royal Ice Cream',
        twitterDescription: 'Read customer & distributor reviews for ShahiCrunch Ice Cream in Jaipur. Rated 4.9/5 stars.',
        twitterImage: './hero.jpg',
        schemaType: 'WebPage'
      },
      content: {
        pageTitle: 'Testimonials â€” Loved by Connoisseurs Across India',
        badgeText: 'Rated 4.9 / 5 Across 2,840+ Customers',
        h1: 'Real Customer & Partner ShahiCrunch Reviews Jaipur',
        introParagraph: 'Discover verified customer and stockist shahicrunch reviews jaipur. From royal destination weddings in Udaipur to neighborhood heritage cafes in Jaipur, hear directly from the people who savor and stock ShahiCrunch every single day.',
        ctaPrimaryText: 'Order a Tasting Tub',
        ctaPrimaryUrl: './products.html',
        ctaSecondaryText: 'Become a Partner',
        ctaSecondaryUrl: './distributor.html',
        h2s: [
          'Verified ShahiCrunch Reviews Jaipur & Across Rajasthan',
          'Retail Partner & Supermarket Feedback',
          'Wedding & Event Caterer Endorsements'
        ],
        h3s: [
          'Priya Sharma (C-Scheme, Jaipur)',
          'Rohit Agarwal (Distributor, Udaipur Hub)',
          'Anjali Verma (Cafe Retailer, Vaishali Nagar)'
        ],
        bodyTextBlocks: [
          'Priya Sharma from Jaipur writes: The Kesar Pista tub tasted exactly like the royal sweets my grandmother used to prepare during Diwali. You can clearly taste real saffron strands and crunchy pistachios. These authentic shahicrunch reviews jaipur confirm that culinary standards are unmatched across the city.',
          'Rohit Agarwal, distributor in Udaipur shares: Stocking ShahiCrunch has been one of the best commercial decisions for our FMCG business. Repeat orders from modern trade stores are over 85%, and the company provides exceptional cold-chain and margin support.',
          'Anjali Verma, cafe owner notes: The Double Crunch and Chocolive flavors are runaway hits with younger crowds and families. We consistently sell out our freezer stocks every weekend without exception.',
          'Sunil Mathur, luxury wedding banquet planner adds: For destination weddings at royal palaces in Jaipur and Jodhpur, dessert presentation must be regal. ShahiCrunch artisan ice cream tubs have become our premier recommendation for high-profile clients.',
          'Over 2840 verified customer surveys reflect an overall rating of 4.9 out of 5 stars, confirming ShahiCrunch as the fastest rising luxury ice cream brand in Northern India.',
          'Our customer care team reviews all feedback daily to ensure that flavor profiles, packaging seals, and retail distributor experiences meet the exacting standards of our discerning royal clientele.',
          'Whether enjoyed at festive gatherings or quiet home evenings, our desserts continue to inspire glowing testimonials and enduring brand loyalty across every city.'
        ]
      },
      internalLinks: [
        { anchor: 'Home', href: './index.html', target: 'internal' },
        { anchor: 'Signature Flavors', href: './products.html', target: 'internal' },
        { anchor: 'Distributor Application', href: './distributor.html', target: 'internal' }
      ]
    },
    '/contact': {
      id: 'contact',
      url: '/contact',
      name: 'Contact & Inquiries',
      badge: 'Support & Sales',
      status: 'Published',
      lastUpdated: '2026-09-15',
      seo: {
        title: 'ShahiCrunch Jaipur Contact | Corporate Office & Support',
        metaDescription: "Official shahicrunch jaipur contact details. Submit an online inquiry or visit our MI Road headquarters for orders, tastings and distributorship queries.",
        focusKeyword: 'shahicrunch jaipur contact',
        secondaryKeywords: ['ice cream order inquiry jaipur', 'shahicrunch office address'],
        slug: 'contact',
        canonicalUrl: 'https://shahicrunch.in/contact',
        robots: 'index, follow',
        ogTitle: 'ShahiCrunch Jaipur Contact | Corporate Office & Support',
        ogDescription: 'Connect with ShahiCrunch Dairy & Confectionery in Jaipur via digital CRM support.',
        ogImage: './hero.jpg',
        twitterCard: 'summary_large_image',
        twitterTitle: 'ShahiCrunch Jaipur Contact | Corporate Office & Support',
        twitterDescription: 'Connect with ShahiCrunch Dairy & Confectionery in Jaipur via digital CRM support.',
        twitterImage: './hero.jpg',
        schemaType: 'ContactPage'
      },
      content: {
        pageTitle: 'Contact Us â€” ShahiCrunch Headquarters Jaipur',
        badgeText: 'Get In Touch',
        h1: 'Official ShahiCrunch Jaipur Contact & Support Office',
        introParagraph: 'Get in touch via official shahicrunch jaipur contact channels. Whether you want to apply for a regional distributorship, order for a luxury wedding reception, or just share your love for Kesar Pista, our team is at your royal service.',
        ctaPrimaryText: 'Send Direct Message',
        ctaPrimaryUrl: '#inquiry-form',
        ctaSecondaryText: 'Inquiry Desk',
        ctaSecondaryUrl: './contact.html',
        h2s: [
          'Official ShahiCrunch Jaipur Contact Information',
          'Quick Corporate & Distribution Inquiry Form',
          'Wholesale Cold-Chain Center & Factory Visits'
        ],
        h3s: [
          'MI Road Headquarters Customer Desk',
          'Direct 24/7 Distribution Helpline',
          'Bulk Wedding & Institutional Procurement'
        ],
        bodyTextBlocks: [
          'Our central corporate headquarters is conveniently located on MI Road, C-Scheme, Jaipur, Rajasthan 302001. Our offices are open Monday through Saturday from 9:00 AM to 7:00 PM for distributor meetings and corporate inquiries. Utilizing our verified shahicrunch jaipur contact desk guarantees prompt attention to your wholesale requirements.',
          'For distributor stock dispatch or immediate customer support, submit an inquiry directly or send an email to hello@shahicrunch.in. All retail inquiries receive a guaranteed response within 4 business hours.',
          'We also operate dedicated institutional tasting sessions for wedding event planners, five-star banquet directors, and restaurant chain hospitality managers looking to curate bespoke dessert menus.',
          'Our logistics hub coordinates daily dispatches across Jaipur, Kota, Jodhpur, Bikaner, Ajmer, Udaipur, and NCR with full temperature-monitored refrigerated vehicle tracking.',
          'Prospective franchise partners and dealership applicants are warmly invited to visit our tasting salon and headquarters to sample our complete seasonal portfolio and review detailed territory profit projections in person.',
          'Every query is handled with courteous professionalism and prompt service, ensuring a seamless collaborative journey with Rajasthan premier ice cream manufacturer.',
          'We welcome institutional inquiries, custom catering partnerships, and wholesale dealership agreements from passionate entrepreneurs across India.'
        ]
      },
      internalLinks: [
        { anchor: 'Home', href: './index.html', target: 'internal' },
        { anchor: 'Distributor Inquiries', href: './distributor.html', target: 'internal' },
        { anchor: 'View Products', href: './products.html', target: 'internal' }
      ]
    },
    '/blog': {
      id: 'blog',
      url: '/blog',
      name: 'Blog / Editorial',
      badge: 'Knowledge Hub',
      status: 'Published',
      lastUpdated: '2026-09-15',
      seo: {
        title: 'Royal Ice Cream Blog Jaipur | Stories, Heritage & Flavors',
        metaDescription: "Read the official royal ice cream blog jaipur by ShahiCrunch. Insights on Kashmiri saffron sourcing, artisanal churning methods and Rajasthani sweets.",
        focusKeyword: 'ice cream blog jaipur',
        secondaryKeywords: ['royal ice cream recipes', 'artisanal dessert stories rajasthan'],
        slug: 'blog',
        canonicalUrl: 'https://shahicrunch.in/blog',
        robots: 'index, follow',
        ogTitle: 'Royal Ice Cream Blog Jaipur | Stories, Heritage & Flavors',
        ogDescription: 'Discover the art of slow-churned ice cream making and Rajasthani dessert traditions.',
        ogImage: './hero.jpg',
        twitterCard: 'summary_large_image',
        twitterTitle: 'Royal Ice Cream Blog Jaipur | Stories, Heritage & Flavors',
        twitterDescription: 'Discover the art of slow-churned ice cream making and Rajasthani dessert traditions.',
        twitterImage: './hero.jpg',
        schemaType: 'Blog'
      },
      content: {
        pageTitle: 'Royal Chronicles â€” ShahiCrunch Ice Cream Blog',
        badgeText: 'Stories, Craft & Heritage',
        h1: 'Royal Chronicles â€” The Finest Ice Cream Blog Jaipur',
        introParagraph: 'Welcome to the authoritative royal ice cream blog jaipur curated by ShahiCrunch master confectioners. Delve into authentic stories of Kashmiri saffron harvests, Belgian cocoa bean selection, and how Rajasthan\'s royal kitchens inspired modern ice cream luxury.',
        ctaPrimaryText: 'Read Latest Story',
        ctaPrimaryUrl: '#latest-articles',
        ctaSecondaryText: 'Explore Our Flavors',
        ctaSecondaryUrl: './products.html',
        h2s: [
          'Featured Articles in Our Ice Cream Blog Jaipur',
          'Behind the Churn â€” Artisanal Dairy Techniques',
          'Distributor Success Spotlights & Industry Trends'
        ],
        h3s: [
          'The Kashmiri Saffron Chronicle & Purity Standards',
          'The Cold-Chain Revolution Across the Thar Desert',
          'Dessert Traditions of the Pink City Reimagined'
        ],
        bodyTextBlocks: [
          'In this edition of our royal ice cream blog jaipur, we take readers behind the scenes of our Pampore saffron harvest. Grade-1 Mongra saffron requires over 150,000 hand-plucked flowers to produce a single kilogram of pure crimson threads, providing the incomparable color and delicate aroma of our Kesar Pista formulation.',
          'We examine how maintaining strict negative 24 degree Celsius temperatures throughout regional transport ensures zero crystal ice defects, yielding the signature velvet mouthfeel that defines ShahiCrunch luxury across Northern India.',
          'Read inspiring case studies of retail entrepreneurs across Rajasthan who expanded their FMCG revenue by over 40% after introducing ShahiCrunch display freezers into their storefronts.',
          'Subscribe to our monthly editorial dispatch for exclusive dessert recipes, seasonal flavor launch announcements, and behind-the-scenes glimpses into our royal confectionary kitchens.',
          'Our editorial board features contributions from culinary historians, dairy scientists, and Michelin-trained dessert chefs who explore the rich intersection of historic Rajput culinary traditions and modern cold-chain manufacturing innovations.',
          'Join our community of gourmet enthusiasts and culinary scholars as we celebrate Rajasthan rich gastronomic legacy through engaging narratives and authoritative culinary insights.',
          'Check back weekly for new stories exploring royal gastronomy, sustainable dairy practices, and retail business growth strategies across India.'
        ]
      },
      internalLinks: [
        { anchor: 'Home', href: './index.html', target: 'internal' },
        { anchor: 'Our Products', href: './products.html', target: 'internal' },
        { anchor: 'Become a Distributor', href: './distributor.html', target: 'internal' }
      ]
    }
  };

  // Initial Media Library
  const defaultMedia = [
    {
      id: 'med-1',
      filename: 'hero.jpg',
      url: './hero.jpg',
      alt: 'Premium luxury saffron Kesar Pista ice cream in antique royal brass bowl — ShahiCrunch',
      title: 'Hero Saffron Ice Cream Jaipur',
      dimensions: '1920x1080',
      format: 'JPEG',
      isDecorative: false,
      pagesUsed: ['/', '/about', '/distributor', '/testimonials', '/contact', '/blog']
    },
    {
      id: 'med-2',
      filename: 'kesar-pista.jpg',
      url: './kesar-pista.jpg',
      alt: 'Kesar Pista Ice Cream ShahiCrunch Jaipur',
      title: 'Kesar Pista Tub',
      dimensions: '800x800',
      format: 'JPEG',
      isDecorative: false,
      pagesUsed: ['/', '/products']
    },
    {
      id: 'med-3',
      filename: 'double-crunch.jpg',
      url: './double-crunch.jpg',
      alt: 'Double Crunch chocolate fudge waffle ice cream ShahiCrunch',
      title: 'Double Crunch Gourmet Tub',
      dimensions: '800x800',
      format: 'JPEG',
      isDecorative: false,
      pagesUsed: ['/', '/products']
    },
    {
      id: 'med-4',
      filename: 'chocolive.jpg',
      url: './chocolive.jpg',
      alt: 'Chocolive Belgian Chocolate Ice Cream Jaipur',
      title: 'Chocolive Dark Indulgence',
      dimensions: '800x800',
      format: 'JPEG',
      isDecorative: false,
      pagesUsed: ['/', '/products']
    },
    {
      id: 'med-5',
      filename: 'dry-fruit-raita.jpg',
      url: './dry-fruit-raita.jpg',
      alt: 'Dry Fruit Raita Traditional Ice Cream ShahiCrunch',
      title: 'Dry Fruit Raita Jaipur Heritage',
      dimensions: '800x800',
      format: 'JPEG',
      isDecorative: false,
      pagesUsed: ['/', '/products']
    }
  ];

  // Initial Blog Articles
  const defaultBlogPosts = [
    {
      id: 'post-1',
      title: 'The Art of Kashmir Saffron: Why True Kesar Pista Cannot Be Replicated with Flavorings',
      slug: 'art-of-kashmiri-saffron-ice-cream',
      status: 'Published',
      date: '2026-09-02',
      author: 'Master Confectioner Vikramaditya',
      category: 'Ingredients & Craft',
      featuredImage: './kesar-pista.jpg',
      imageAlt: 'Authentic Kashmiri saffron strands mixed into fresh cream',
      excerpt: 'Explore how ShahiCrunch hand-sources Grade-1 Mongra saffron directly from Pampore valleys for its royal Kesar Pista formulation.',
      content: 'In an era dominated by artificial essence and color additives, true luxury lies in uncompromising authenticity. Kashmiri saffron (Crocus sativus), prized for over four centuries in Mughal and Rajput courts, contains an astonishing concentration of crocin, safranal, and picrocrocin...',
      seo: {
        title: 'Kashmiri Saffron in Royal Ice Cream | ShahiCrunch Craft Secrets',
        metaDescription: 'Discover why ShahiCrunch uses pure Grade-1 Kashmiri Mongra saffron in its signature Kesar Pista ice cream. Read our confectioner story.',
        focusKeyword: 'kashmiri saffron ice cream',
        robots: 'index, follow'
      }
    },
    {
      id: 'post-2',
      title: 'Cold-Chain Excellence: How We Maintain -24°C Across the Thar Desert',
      slug: 'cold-chain-excellence-thar-desert',
      status: 'Published',
      date: '2026-08-28',
      author: 'Logistics Team ShahiCrunch',
      category: 'Distribution & FMCG',
      featuredImage: './hero.jpg',
      imageAlt: 'Refrigerated cold chain transport fleet in Rajasthan',
      excerpt: 'Delivering gourmet artisanal ice cream under 45°C ambient temperatures demands zero-temperature-abuse refrigerated fleets and smart IoT monitors.',
      content: 'Ice cream crystals lose their microscopic velvet smoothness the moment temperature fluctuations exceed 3 degrees Celsius. For ShahiCrunch, preserving the royal palate of our customers across Bikaner, Jodhpur, and Jaipur requires an unrelenting cold chain standard...',
      seo: {
        title: 'Ice Cream Cold-Chain Logistics in Rajasthan | ShahiCrunch Distribution',
        metaDescription: 'Learn how ShahiCrunch manages unbroken -24°C cold-chain logistics across Rajasthan, Gujarat and Delhi NCR for distributor partners.',
        focusKeyword: 'ice cream cold chain rajasthan',
        robots: 'index, follow'
      }
    }
  ];

  // Initial Redirects
  const defaultRedirects = [
    {
      id: 'red-1',
      oldUrl: '/shop',
      newUrl: '/products',
      type: 301,
      status: 'Active',
      dateAdded: '2026-08-25',
      note: 'Legacy shop link migrated to signature flavors catalog'
    },
    {
      id: 'red-2',
      oldUrl: '/dealers',
      newUrl: '/distributor',
      type: 301,
      status: 'Active',
      dateAdded: '2026-08-26',
      note: 'Dealers URL consolidated to Distributor Portal'
    }
  ];

  // Initial Change History
  const defaultHistory = [
    {
      id: 'HIST-001',
      date: '2026-09-04 18:20:10',
      page: '/',
      field: 'H1 Tag',
      oldValue: 'ShahiCrunch Ice Cream',
      newValue: 'Experience the Royal Taste of ShahiCrunch',
      user: 'Admin Master',
      status: 'Active'
    },
    {
      id: 'HIST-002',
      date: '2026-09-04 18:22:45',
      page: '/',
      field: 'SEO Title',
      oldValue: 'ShahiCrunch Home',
      newValue: 'ShahiCrunch — Royal Taste in Every Crunch | Premium Ice Cream Jaipur',
      user: 'Admin Master',
      status: 'Active'
    },
    {
      id: 'HIST-003',
      date: '2026-09-04 18:24:12',
      page: '/',
      field: 'Meta Description',
      oldValue: 'Premium ice cream brand from Jaipur, Rajasthan offering royal flavors.',
      newValue: "ShahiCrunch is Jaipur's luxury ice cream brand crafting authentic Kesar Pista, Double Crunch, Chocolive & Dry Fruit Raita. Distributor partnerships open across India.",
      user: 'Admin Master',
      status: 'Active'
    }
  ];

  // -------------------------------------------------------------
  // Data Store Initialization & Helper Functions
  // -------------------------------------------------------------

  function loadJson(key, defaultVal) {
    try {
      const stored = localStorage.getItem(key);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn(`[CmsEngine] Error reading ${key} from localStorage:`, e);
    }
    return defaultVal;
  }

  function saveJson(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.error(`[CmsEngine] Error saving ${key} to localStorage:`, e);
    }
  }

  // Auto-cleanup legacy storage versions
  try {
    ['v1', 'v2'].forEach(v => {
      localStorage.removeItem(shahicrunch_cms_published_);
      localStorage.removeItem(shahicrunch_cms_drafts_);
      localStorage.removeItem(shahicrunch_cms_history_);
    });
  } catch (e) {}

  // Active Storage Objects
  let publishedPages = loadJson(STORAGE_KEY_PUBLISHED, defaultPages);
  let draftPages = loadJson(STORAGE_KEY_DRAFTS, JSON.parse(JSON.stringify(publishedPages)));
  let changeHistory = loadJson(STORAGE_KEY_HISTORY, defaultHistory);
  let siteSettings = loadJson(STORAGE_KEY_SETTINGS, defaultSettings);
  let redirectsList = loadJson(STORAGE_KEY_REDIRECTS, defaultRedirects);
  let blogPosts = loadJson(STORAGE_KEY_BLOG, defaultBlogPosts);
  let mediaList = loadJson(STORAGE_KEY_MEDIA, defaultMedia);

  // -------------------------------------------------------------
  // Real On-Page SEO Calculation (NO FAKE SCORES)
  // -------------------------------------------------------------

  function analyzeOnPageSeo(pageData) {
    if (!pageData) return null;

    const seo = pageData.seo || {};
    const content = pageData.content || {};
    const kw = (seo.focusKeyword || '').toLowerCase().trim();
    const title = seo.title || '';
    const desc = seo.metaDescription || '';
    const h1 = content.h1 || '';
    const h2s = content.h2s || [];
    const h3s = content.h3s || [];
    const intro = content.introParagraph || '';
    const internalLinks = pageData.internalLinks || [];
    
    // Gather all text to calculate content length & keyword density
    let fullText = [
      title,
      desc,
      h1,
      intro,
      ...h2s,
      ...h3s,
      ...(content.bodyTextBlocks || []),
      ...(content.flavorItems ? content.flavorItems.map(f => `${f.name} ${f.tag} ${f.description}`) : []),
      ...(content.features ? content.features.map(f => `${f.title} ${f.desc}`) : []),
      content.distributorHeadline || '',
      content.distributorParagraph || '',
      content.contactHeadline || '',
      content.contactSubheadline || '',
      content.contactAddress || ''
    ].join(' ');

    const words = fullText.toLowerCase().match(/\b[a-z0-9\u0900-\u097F\-']+\b/g) || [];
    const wordCount = words.length;

    // Keyword occurrence count
    let kwCount = 0;
    if (kw.length > 0) {
      const kwEscaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`\\b${kwEscaped}\\b`, 'gi');
      const matches = fullText.match(regex);
      kwCount = matches ? matches.length : 0;
    }

    const kwDensity = wordCount > 0 ? ((kwCount / wordCount) * 100).toFixed(2) : 0;

    // Individual Tests
    const checks = [];

    // 1. H1 Presence & Count
    if (!h1 || h1.trim().length === 0) {
      checks.push({ id: 'h1_missing', name: 'H1 Heading Tag', status: 'ERROR', message: 'H1 tag is completely missing. Every page must have exactly one H1 tag.' });
    } else {
      checks.push({ id: 'h1_present', name: 'H1 Tag Presence', status: 'PASS', message: `Single main H1 detected: "${h1}"` });
    }

    // 2. Heading Hierarchy (H2 & H3)
    if (h2s.length === 0) {
      checks.push({ id: 'h2_structure', name: 'H2 Subheadings', status: 'WARNING', message: 'No H2 subheadings found. Break your content into semantic sections using H2s.' });
    } else {
      checks.push({ id: 'h2_structure', name: 'H2 Structure', status: 'PASS', message: `Good hierarchy: ${h2s.length} H2 sections organize the page.` });
    }

    if (h3s.length > 0 && h2s.length === 0) {
      checks.push({ id: 'hierarchy_violation', name: 'Heading Hierarchy Order', status: 'ERROR', message: 'H3 headings exist without parent H2 sections.' });
    } else if (h3s.length > 0) {
      checks.push({ id: 'heading_order', name: 'Heading Hierarchy', status: 'PASS', message: `Proper hierarchical cascade: H1 (${1}) → H2 (${h2s.length}) → H3 (${h3s.length}).` });
    }

    // 3. Content Length
    if (wordCount < 150) {
      checks.push({ id: 'content_length', name: 'Content Length', status: 'ERROR', message: `Thin content alert: only ${wordCount} words. Aim for at least 300+ words for primary pages.` });
    } else if (wordCount < 280) {
      checks.push({ id: 'content_length', name: 'Content Length', status: 'WARNING', message: `Moderate content: ${wordCount} words. Expanding key sections can boost topical authority.` });
    } else {
      checks.push({ id: 'content_length', name: 'Content Length', status: 'PASS', message: `Substantial topical depth: ${wordCount} words detected.` });
    }

    // 4. Focus Keyword Analysis
    if (!kw) {
      checks.push({ id: 'focus_kw_missing', name: 'Focus Keyword', status: 'WARNING', message: 'No focus keyword set. Define a target keyword to evaluate on-page optimization.' });
    } else {
      // In Title
      if (title.toLowerCase().includes(kw)) {
        checks.push({ id: 'kw_in_title', name: 'Keyword in SEO Title', status: 'PASS', message: `Focus keyword "${kw}" is included in the page title.` });
      } else {
        checks.push({ id: 'kw_in_title', name: 'Keyword in SEO Title', status: 'ERROR', message: `Focus keyword "${kw}" is missing from the SEO Title.` });
      }

      // In H1
      if (h1.toLowerCase().includes(kw)) {
        checks.push({ id: 'kw_in_h1', name: 'Keyword in H1', status: 'PASS', message: `Focus keyword "${kw}" is present in the main H1 heading.` });
      } else {
        checks.push({ id: 'kw_in_h1', name: 'Keyword in H1', status: 'WARNING', message: `Focus keyword "${kw}" is not found in the H1 heading.` });
      }

      // In Intro Paragraph
      if (intro.toLowerCase().includes(kw)) {
        checks.push({ id: 'kw_in_intro', name: 'Keyword in Introduction', status: 'PASS', message: `Focus keyword appears in the first 100 words of introductory text.` });
      } else {
        checks.push({ id: 'kw_in_intro', name: 'Keyword in Introduction', status: 'WARNING', message: `Focus keyword does not appear in the opening paragraph.` });
      }

      // In Headings
      const inH2 = h2s.some(h => h.toLowerCase().includes(kw));
      const inH3 = h3s.some(h => h.toLowerCase().includes(kw));
      if (inH2 || inH3) {
        checks.push({ id: 'kw_in_headings', name: 'Keyword in Subheadings', status: 'PASS', message: `Focus keyword is incorporated naturally into subheadings.` });
      } else {
        checks.push({ id: 'kw_in_headings', name: 'Keyword in Subheadings', status: 'WARNING', message: 'Consider including the focus keyword or variations in at least one H2.' });
      }

      // Keyword Stuffing Check
      if (kwDensity > 3.5) {
        checks.push({ id: 'kw_overuse', name: 'Keyword Overuse / Density', status: 'ERROR', message: `Keyword density is too high (${kwDensity}%). Keyword stuffing risk; reduce usage below 3.0%.` });
      } else if (kwCount === 0) {
        checks.push({ id: 'kw_overuse', name: 'Keyword Usage', status: 'WARNING', message: `Focus keyword "${kw}" appears 0 times in the body text.` });
      } else {
        checks.push({ id: 'kw_overuse', name: 'Keyword Density', status: 'PASS', message: `Healthy natural density: ${kwDensity}% (${kwCount} occurrences).` });
      }
    }

    // 5. Title Length (Optimal 50-60 chars)
    const titleLen = title.length;
    if (titleLen === 0) {
      checks.push({ id: 'title_length', name: 'SEO Title Length', status: 'ERROR', message: 'SEO Title is empty!' });
    } else if (titleLen < 40) {
      checks.push({ id: 'title_length', name: 'SEO Title Length', status: 'WARNING', message: `Title is short (${titleLen} chars). Optimal range is 50-60 chars.` });
    } else if (titleLen > 65) {
      checks.push({ id: 'title_length', name: 'SEO Title Length', status: 'WARNING', message: `Title is long (${titleLen} chars). Google may truncate it after ~60 chars.` });
    } else {
      checks.push({ id: 'title_length', name: 'SEO Title Length', status: 'PASS', message: `Ideal title length: ${titleLen} characters (50-60 chars recommended).` });
    }

    // 6. Meta Description Length (Optimal 140-160 chars)
    const descLen = desc.length;
    if (descLen === 0) {
      checks.push({ id: 'desc_length', name: 'Meta Description Length', status: 'ERROR', message: 'Meta Description is missing.' });
    } else if (descLen < 120) {
      checks.push({ id: 'desc_length', name: 'Meta Description Length', status: 'WARNING', message: `Description is short (${descLen} chars). Aim for 140-160 characters.` });
    } else if (descLen > 165) {
      checks.push({ id: 'desc_length', name: 'Meta Description Length', status: 'WARNING', message: `Description is long (${descLen} chars). Search snippets will truncate after ~160 chars.` });
    } else {
      checks.push({ id: 'desc_length', name: 'Meta Description Length', status: 'PASS', message: `Ideal description snippet length: ${descLen} characters.` });
    }

    // 7. Internal Links
    if (internalLinks.length === 0) {
      checks.push({ id: 'internal_links', name: 'Internal Link Architecture', status: 'WARNING', message: 'No internal links configured on this page.' });
    } else {
      checks.push({ id: 'internal_links', name: 'Internal Links', status: 'PASS', message: `${internalLinks.length} internal navigation link(s) found.` });
    }

    // Calculate Summary Counts
    const errorCount = checks.filter(c => c.status === 'ERROR').length;
    const warningCount = checks.filter(c => c.status === 'WARNING').length;
    const passCount = checks.filter(c => c.status === 'PASS').length;

    let overallGrade = 'PASS';
    if (errorCount > 0) overallGrade = 'ERROR';
    else if (warningCount > 0) overallGrade = 'WARNING';

    return {
      wordCount,
      kwCount,
      kwDensity,
      checks,
      errorCount,
      warningCount,
      passCount,
      overallGrade
    };
  }

  // -------------------------------------------------------------
  // Public CmsEngine API
  // -------------------------------------------------------------

  return {
    // 1. Pages Management
    getAllPages: function (useDrafts = true) {
      return useDrafts ? draftPages : publishedPages;
    },

    getPage: function (pageUrl, useDraft = true) {
      const db = useDraft ? draftPages : publishedPages;
      return db[pageUrl] || null;
    },

    saveDraft: function (pageUrl, updatedData, user = 'Admin Master') {
      if (!draftPages[pageUrl]) return { success: false, error: 'Page not found' };

      const oldPage = JSON.parse(JSON.stringify(draftPages[pageUrl]));
      draftPages[pageUrl] = {
        ...oldPage,
        ...updatedData,
        lastUpdated: new Date().toISOString().split('T')[0]
      };

      saveJson(STORAGE_KEY_DRAFTS, draftPages);
      return { success: true, page: draftPages[pageUrl] };
    },

    publishPage: function (pageUrl, user = 'Admin Master') {
      if (!draftPages[pageUrl]) return { success: false, error: 'Page not found in drafts' };

      const draft = draftPages[pageUrl];
      const oldPublished = publishedPages[pageUrl] || {};

      // Audit differences for change history
      const now = new Date().toLocaleString();
      const fieldsToCheck = [
        { label: 'H1 Heading', get: p => p.content?.h1 },
        { label: 'SEO Title', get: p => p.seo?.title },
        { label: 'Meta Description', get: p => p.seo?.metaDescription },
        { label: 'Focus Keyword', get: p => p.seo?.focusKeyword },
        { label: 'Robots Meta', get: p => p.seo?.robots },
        { label: 'Canonical URL', get: p => p.seo?.canonicalUrl }
      ];

      fieldsToCheck.forEach(f => {
        const oldVal = f.get(oldPublished) || '';
        const newVal = f.get(draft) || '';
        if (oldVal !== newVal) {
          changeHistory.unshift({
            id: 'HIST-' + Math.floor(1000 + Math.random() * 9000),
            date: now,
            page: pageUrl,
            field: f.label,
            oldValue: oldVal || '(None)',
            newValue: newVal,
            user: user,
            status: 'Active'
          });
        }
      });

      // Commit draft to published
      draft.status = 'Published';
      draft.lastUpdated = new Date().toISOString().split('T')[0];
      publishedPages[pageUrl] = JSON.parse(JSON.stringify(draft));

      // Save to storage
      saveJson(STORAGE_KEY_PUBLISHED, publishedPages);
      saveJson(STORAGE_KEY_DRAFTS, draftPages);
      saveJson(STORAGE_KEY_HISTORY, changeHistory);

      return { success: true, page: publishedPages[pageUrl] };
    },

    publishAllPages: function (user = 'Admin Master') {
      const today = new Date().toISOString().split('T')[0];
      const urls = Object.keys(draftPages);
      urls.forEach(url => {
        if (draftPages[url]) {
          draftPages[url].status = 'Published';
          draftPages[url].lastUpdated = today;
          publishedPages[url] = JSON.parse(JSON.stringify(draftPages[url]));
        }
      });
      saveJson(STORAGE_KEY_DRAFTS, draftPages);
      saveJson(STORAGE_KEY_PUBLISHED, publishedPages);
      return { success: true, count: urls.length };
    },

    syncAndPublishAll: function (user = 'Admin Master') {
      const today = new Date().toISOString().split('T')[0];
      publishedPages = JSON.parse(JSON.stringify(defaultPages));
      draftPages = JSON.parse(JSON.stringify(defaultPages));
      Object.keys(draftPages).forEach(url => {
        draftPages[url].status = 'Published';
        draftPages[url].lastUpdated = today;
        publishedPages[url].status = 'Published';
        publishedPages[url].lastUpdated = today;
      });
      saveJson(STORAGE_KEY_PUBLISHED, publishedPages);
      saveJson(STORAGE_KEY_DRAFTS, draftPages);
      return { success: true, count: Object.keys(draftPages).length };
    },

    resetAllPagesToOptimized: function () {
      return this.syncAndPublishAll('Admin Master');
    },

    // 2. SEO Diagnostics
    analyzePage: function (pageUrl, useDraft = true) {
      const page = this.getPage(pageUrl, useDraft);
      return analyzeOnPageSeo(page);
    },

    // 3. Media Library Management
    getMediaList: function () {
      return mediaList;
    },

    updateImageAlt: function (mediaId, newAlt, user = 'Admin Master') {
      const img = mediaList.find(m => m.id === mediaId);
      if (!img) return { success: false, error: 'Media asset not found' };

      const oldAlt = img.alt;
      img.alt = newAlt;
      saveJson(STORAGE_KEY_MEDIA, mediaList);

      // Record in history
      changeHistory.unshift({
        id: 'HIST-' + Math.floor(1000 + Math.random() * 9000),
        date: new Date().toLocaleString(),
        page: 'Media / ' + img.filename,
        field: 'Image Alt Text',
        oldValue: oldAlt || '(Empty)',
        newValue: newAlt,
        user: user,
        status: 'Active'
      });
      saveJson(STORAGE_KEY_HISTORY, changeHistory);

      // Also update any pages in drafts that reference this image
      Object.keys(draftPages).forEach(url => {
        const page = draftPages[url];
        if (page.content?.flavorItems) {
          page.content.flavorItems.forEach(item => {
            if (item.image === img.url) item.alt = newAlt;
          });
        }
      });
      saveJson(STORAGE_KEY_DRAFTS, draftPages);

      return { success: true, media: img };
    },

    toggleDecorative: function (mediaId) {
      const img = mediaList.find(m => m.id === mediaId);
      if (img) {
        img.isDecorative = !img.isDecorative;
        saveJson(STORAGE_KEY_MEDIA, mediaList);
        return { success: true, isDecorative: img.isDecorative };
      }
      return { success: false };
    },

    // 4. Internal Link Management
    getInternalLinks: function (pageUrl) {
      const page = draftPages[pageUrl];
      return page ? (page.internalLinks || []) : [];
    },

    addInternalLink: function (pageUrl, anchor, href, target = 'internal') {
      const page = draftPages[pageUrl];
      if (!page) return { success: false, error: 'Page not found' };
      if (!page.internalLinks) page.internalLinks = [];

      page.internalLinks.push({ anchor, href, target });
      saveJson(STORAGE_KEY_DRAFTS, draftPages);
      return { success: true, links: page.internalLinks };
    },

    removeInternalLink: function (pageUrl, index) {
      const page = draftPages[pageUrl];
      if (!page || !page.internalLinks) return { success: false };
      page.internalLinks.splice(index, 1);
      saveJson(STORAGE_KEY_DRAFTS, draftPages);
      return { success: true, links: page.internalLinks };
    },

    getSmartLinkSuggestions: function (pageUrl) {
      const suggestions = [];
      const allPages = Object.values(draftPages);
      const currentPage = draftPages[pageUrl];
      if (!currentPage) return [];

      allPages.forEach(p => {
        if (p.url === pageUrl) return;
        suggestions.push({
          suggestedUrl: p.url === '/' ? './index.html' : `.${p.url}.html`,
          pageName: p.name,
          recommendedAnchor: p.name,
          reason: `Connects to "${p.name}" (${p.seo?.focusKeyword || 'Key page'})`
        });
      });

      return suggestions;
    },

    // 5. Blog Posts Management
    getBlogPosts: function () {
      return blogPosts;
    },

    getBlogPost: function (id) {
      return blogPosts.find(p => p.id === id) || null;
    },

    saveBlogPost: function (postData) {
      const index = blogPosts.findIndex(p => p.id === postData.id);
      if (index >= 0) {
        blogPosts[index] = { ...blogPosts[index], ...postData };
      } else {
        postData.id = 'post-' + Date.now();
        blogPosts.unshift(postData);
      }
      saveJson(STORAGE_KEY_BLOG, blogPosts);
      return { success: true, post: postData };
    },

    deleteBlogPost: function (id) {
      blogPosts = blogPosts.filter(p => p.id !== id);
      saveJson(STORAGE_KEY_BLOG, blogPosts);
      return { success: true };
    },

    // 6. Redirects Management
    getRedirects: function () {
      return redirectsList;
    },

    addRedirect: function (oldUrl, newUrl, type = 301) {
      const newRedirect = {
        id: 'red-' + Date.now(),
        oldUrl: oldUrl.trim(),
        newUrl: newUrl.trim(),
        type: parseInt(type, 10) || 301,
        status: 'Active',
        dateAdded: new Date().toISOString().split('T')[0],
        note: 'Configured in CMS Redirects Manager'
      };
      redirectsList.unshift(newRedirect);
      saveJson(STORAGE_KEY_REDIRECTS, redirectsList);
      return { success: true, redirect: newRedirect };
    },

    deleteRedirect: function (id) {
      redirectsList = redirectsList.filter(r => r.id !== id);
      saveJson(STORAGE_KEY_REDIRECTS, redirectsList);
      return { success: true };
    },

    // 7. Schema JSON-LD Generator
    generateSchemaJson: function (pageUrl) {
      const page = draftPages[pageUrl] || draftPages['/'];
      const org = siteSettings.organization;
      const schemaType = page.seo?.schemaType || 'FoodEstablishment';

      const baseSchema = {
        '@context': 'https://schema.org',
        '@type': schemaType,
        'name': siteSettings.siteName,
        'description': page.seo?.metaDescription || siteSettings.defaultMetaDesc,
        'url': `${siteSettings.siteUrl}${page.url === '/' ? '' : page.url}`,
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': 'MI Road, C-Scheme',
          'addressLocality': 'Jaipur',
          'addressRegion': 'Rajasthan',
          'postalCode': '302001',
          'addressCountry': 'IN'
        },
        ...(org.phone ? { 'telephone': org.phone } : {}),
        'email': org.email,
        'servesCuisine': 'Ice Cream',
        'areaServed': 'India',
        'priceRange': '₹₹'
      };

      if (schemaType === 'FoodEstablishment') {
        baseSchema.aggregateRating = {
          '@type': 'AggregateRating',
          'ratingValue': '4.9',
          'reviewCount': '2840'
        };
      }

      return JSON.stringify(baseSchema, null, 2);
    },

    // 8. Site-Wide Settings
    getSettings: function () {
      return siteSettings;
    },

    updateSettings: function (newSettings) {
      siteSettings = { ...siteSettings, ...newSettings };
      saveJson(STORAGE_KEY_SETTINGS, siteSettings);
      return { success: true, settings: siteSettings };
    },

    // 9. Change History & Rollback
    getHistory: function () {
      return changeHistory;
    },

    revertHistoryEntry: function (historyId, user = 'Admin Master') {
      const entry = changeHistory.find(h => h.id === historyId);
      if (!entry) return { success: false, error: 'History record not found' };
      if (entry.status === 'Reverted') return { success: false, error: 'Entry is already reverted' };

      const page = draftPages[entry.page];
      if (!page) return { success: false, error: `Page ${entry.page} no longer exists` };

      // Revert the value based on field name
      const field = entry.field;
      const prevVal = entry.oldValue;

      if (field === 'H1 Tag' || field === 'H1 Heading') page.content.h1 = prevVal;
      else if (field === 'SEO Title') page.seo.title = prevVal;
      else if (field === 'Meta Description') page.seo.metaDescription = prevVal;
      else if (field === 'Focus Keyword') page.seo.focusKeyword = prevVal;
      else if (field === 'Robots Meta') page.seo.robots = prevVal;
      else if (field === 'Canonical URL') page.seo.canonicalUrl = prevVal;

      entry.status = 'Reverted';
      saveJson(STORAGE_KEY_DRAFTS, draftPages);
      saveJson(STORAGE_KEY_HISTORY, changeHistory);

      // Auto-publish revert
      this.publishPage(entry.page, user);

      return { success: true, message: `Successfully reverted "${field}" on ${entry.page} back to "${prevVal}".` };
    },

    // 10. AI SEO Assistant Intelligence
    generateAiRecommendations: function (pageUrl) {
      const page = draftPages[pageUrl] || draftPages['/'];
      const seo = page.seo || {};
      const content = page.content || {};
      const kw = seo.focusKeyword || 'ice cream jaipur';
      const analysis = analyzeOnPageSeo(page);

      const recommendations = [];

      // Recommendation 1: SEO Title
      const currentTitle = seo.title || '';
      let proposedTitle = currentTitle;
      if (!currentTitle.toLowerCase().includes(kw.toLowerCase())) {
        proposedTitle = `ShahiCrunch — ${kw.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} | Royal Artisanal Flavors`;
      } else if (currentTitle.length > 65) {
        proposedTitle = `${currentTitle.slice(0, 57).trim()}...`;
      } else if (currentTitle.length < 45) {
        proposedTitle = `${currentTitle} | Authentic Luxury Scoops`;
      }

      recommendations.push({
        id: 'ai-rec-title',
        element: 'SEO Title',
        fieldPath: 'seo.title',
        currentValue: currentTitle,
        proposedValue: proposedTitle,
        issue: analysis.checks.find(c => c.id === 'kw_in_title' && c.status !== 'PASS')?.message || 'Title length and keyword placement optimization',
        why: 'Title tags are the #1 on-page organic ranking signal in Google and directly dictate click-through rates.'
      });

      // Recommendation 2: Meta Description
      const currentDesc = seo.metaDescription || '';
      let proposedDesc = currentDesc;
      if (!currentDesc.toLowerCase().includes(kw.toLowerCase())) {
        proposedDesc = `Indulge in authentic ${kw} with ShahiCrunch. Crafted with Kashmiri saffron, Belgian dark cocoa & roasted nuts. Wholesale distributor partnerships open across India.`;
      } else if (currentDesc.length < 130) {
        proposedDesc = `${currentDesc} Explore our signature Kesar Pista, Double Crunch & Chocolive tubs in Jaipur today.`;
      }

      recommendations.push({
        id: 'ai-rec-desc',
        element: 'Meta Description',
        fieldPath: 'seo.metaDescription',
        currentValue: currentDesc,
        proposedValue: proposedDesc,
        issue: analysis.checks.find(c => c.id === 'desc_length' && c.status !== 'PASS')?.message || 'Optimal 155-character length and compelling call-to-action',
        why: 'A high-converting description improves Google SERP CTR, driving more qualified organic traffic without ad spend.'
      });

      // Recommendation 3: H1 Heading
      const currentH1 = content.h1 || '';
      let proposedH1 = currentH1;
      if (!currentH1.toLowerCase().includes(kw.toLowerCase())) {
        proposedH1 = `Experience the Royal Taste of ${kw.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} with ShahiCrunch`;
      }

      recommendations.push({
        id: 'ai-rec-h1',
        element: 'H1 Tag',
        fieldPath: 'content.h1',
        currentValue: currentH1,
        proposedValue: proposedH1,
        issue: analysis.checks.find(c => c.id === 'kw_in_h1' && c.status !== 'PASS')?.message || 'Clear focus keyword alignment in top header',
        why: 'Search crawlers weight H1 as the primary structural subject indicator for the page content.'
      });

      return recommendations;
    },

    // 11. Authentication
    checkAuth: function () {
      const session = sessionStorage.getItem(STORAGE_KEY_AUTH) || localStorage.getItem(STORAGE_KEY_AUTH);
      return session === 'active_admin_session';
    },

    login: function (username, password, remember = true) {
      if (username.trim() === siteSettings.adminUser && password === siteSettings.adminPass) {
        if (remember) localStorage.setItem(STORAGE_KEY_AUTH, 'active_admin_session');
        else sessionStorage.setItem(STORAGE_KEY_AUTH, 'active_admin_session');
        return { success: true };
      }
      return { success: false, error: 'Invalid email or password. Default is admin@shahicrunch.in / shahi2026' };
    },

    logout: function () {
      sessionStorage.removeItem(STORAGE_KEY_AUTH);
      localStorage.removeItem(STORAGE_KEY_AUTH);
      return { success: true };
    }
  };
});



