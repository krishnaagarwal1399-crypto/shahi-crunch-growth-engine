/**
 * SHAHICRUNCH REAL-TIME CMS PUBLIC CLIENT HYDRATOR (cms-public-client.js)
 * Automatically syncs the public website with the CMS published database.
 * No manual code editing needed for On-Page SEO or content updates.
 */

(function () {
  'use strict';

  function determineCurrentPageUrl() {
    const path = window.location.pathname.toLowerCase();
    if (path.endsWith('about.html') || path.includes('/about')) return '/about';
    if (path.endsWith('products.html') || path.includes('/products')) return '/products';
    if (path.endsWith('distributor.html') || path.includes('/distributor')) return '/distributor';
    if (path.endsWith('testimonials.html') || path.includes('/testimonials')) return '/testimonials';
    if (path.endsWith('contact.html') || path.includes('/contact')) return '/contact';
    if (path.endsWith('blog.html') || path.includes('/blog')) return '/blog';
    return '/';
  }

  function applyCmsData() {
    if (typeof CmsEngine === 'undefined') {
      console.warn('[CmsPublicClient] CmsEngine not loaded yet.');
      return;
    }

    const currentUrl = determineCurrentPageUrl();

    // 1. Check for Active Redirects
    const redirects = CmsEngine.getRedirects() || [];
    const activeRed = redirects.find(r => r.status === 'Active' && (r.oldUrl === currentUrl || window.location.pathname.endsWith(r.oldUrl)));
    if (activeRed) {
      console.log(`[CmsPublicClient] 301 Redirect matched: ${activeRed.oldUrl} -> ${activeRed.newUrl}`);
      window.location.replace(activeRed.newUrl.startsWith('.') ? activeRed.newUrl : `.${activeRed.newUrl}.html`);
      return;
    }

    const page = CmsEngine.getPage(currentUrl, false); // Get published version
    if (!page) return;

    const seo = page.seo || {};
    const content = page.content || {};

    // 2. Hydrate SEO Metadata in <head>
    if (seo.title) {
      document.title = seo.title;
      let titleTag = document.getElementById('page-title');
      if (titleTag) titleTag.textContent = seo.title;
    }

    // Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc && seo.metaDescription) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    if (metaDesc && seo.metaDescription) metaDesc.content = seo.metaDescription;

    // Focus & Secondary Keywords
    let metaKw = document.querySelector('meta[name="keywords"]');
    if (!metaKw) {
      metaKw = document.createElement('meta');
      metaKw.name = 'keywords';
      document.head.appendChild(metaKw);
    }
    const allKeywords = [seo.focusKeyword, ...(seo.secondaryKeywords || [])].filter(Boolean).join(', ');
    if (allKeywords) metaKw.content = allKeywords;

    // Robots
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots && seo.robots) {
      metaRobots = document.createElement('meta');
      metaRobots.name = 'robots';
      document.head.appendChild(metaRobots);
    }
    if (metaRobots && seo.robots) metaRobots.content = seo.robots;

    // Canonical URL
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical && seo.canonicalUrl) {
      linkCanonical = document.createElement('link');
      linkCanonical.rel = 'canonical';
      document.head.appendChild(linkCanonical);
    }
    if (linkCanonical && seo.canonicalUrl) linkCanonical.href = seo.canonicalUrl;

    // Open Graph Tags
    function setMeta(property, val) {
      if (!val) return;
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.content = val;
    }

    setMeta('og:title', seo.ogTitle || seo.title);
    setMeta('og:description', seo.ogDescription || seo.metaDescription);
    setMeta('og:image', seo.ogImage || './hero.jpg');
    setMeta('og:url', seo.canonicalUrl || 'https://shahicrunch.in/');

    // Twitter Tags
    function setTwitterMeta(name, val) {
      if (!val) return;
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.content = val;
    }

    setTwitterMeta('twitter:card', seo.twitterCard || 'summary_large_image');
    setTwitterMeta('twitter:title', seo.twitterTitle || seo.title);
    setTwitterMeta('twitter:description', seo.twitterDescription || seo.metaDescription);
    setTwitterMeta('twitter:image', seo.twitterImage || './hero.jpg');

    // Schema.org JSON-LD
    let schemaScript = document.getElementById('structured-schema-json');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.type = 'application/ld+json';
      schemaScript.id = 'structured-schema-json';
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = CmsEngine.generateSchemaJson(currentUrl);

    // 3. Hydrate DOM Content Elements
    // H1
    const h1El = document.querySelector('[data-cms-field="h1"]') || document.querySelector('h1');
    if (h1El && content.h1) {
      // Check if H1 has styled inner spans like "Royal Taste"
      if (h1El.querySelector('.text-gold') && content.h1.includes('Royal Taste')) {
        h1El.innerHTML = content.h1.replace('Royal Taste', '<span class="text-gold">Royal Taste</span>');
      } else {
        h1El.textContent = content.h1;
      }
    }

    // Badge
    const badgeEl = document.querySelector('[data-cms-field="badge"]');
    if (badgeEl && content.badgeText) badgeEl.textContent = content.badgeText;

    // Intro Paragraph
    const introEl = document.querySelector('[data-cms-field="intro"]');
    if (introEl && content.introParagraph) introEl.textContent = content.introParagraph;

    // Primary CTA Button
    const ctaPrimaryEl = document.querySelector('[data-cms-field="cta-primary"]');
    if (ctaPrimaryEl) {
      if (content.ctaPrimaryText) ctaPrimaryEl.textContent = content.ctaPrimaryText;
      if (content.ctaPrimaryUrl) ctaPrimaryEl.setAttribute('href', content.ctaPrimaryUrl);
    }

    // Secondary CTA Button
    const ctaSecondaryEl = document.querySelector('[data-cms-field="cta-secondary"]');
    if (ctaSecondaryEl) {
      if (content.ctaSecondaryText) ctaSecondaryEl.textContent = content.ctaSecondaryText;
      if (content.ctaSecondaryUrl) ctaSecondaryEl.setAttribute('href', content.ctaSecondaryUrl);
    }

    // Distributor Section
    const distHeadEl = document.querySelector('[data-cms-field="distributor-h2"]');
    if (distHeadEl && content.distributorHeadline) distHeadEl.textContent = content.distributorHeadline;

    const distParaEl = document.querySelector('[data-cms-field="distributor-p"]');
    if (distParaEl && content.distributorParagraph) distParaEl.textContent = content.distributorParagraph;

    // Contact Section
    const contactHeadEl = document.querySelector('[data-cms-field="contact-h2"]');
    if (contactHeadEl && content.contactHeadline) contactHeadEl.textContent = content.contactHeadline;

    // Flavor Cards (Images, Alt Text & Descriptions)
    if (content.flavorItems && Array.isArray(content.flavorItems)) {
      const flavorCards = document.querySelectorAll('.flavor-card');
      flavorCards.forEach((card, idx) => {
        const item = content.flavorItems[idx];
        if (!item) return;

        const img = card.querySelector('img');
        if (img) {
          if (item.image) img.src = item.image;
          if (item.alt) img.alt = item.alt;
        }

        const tag = card.querySelector('.text-amber-600.uppercase');
        if (tag && item.tag) tag.textContent = item.tag;

        const title = card.querySelector('h3');
        if (title && item.name) title.textContent = item.name;

        const desc = card.querySelector('p');
        if (desc && item.description) desc.textContent = item.description;

        const badge = card.querySelector('.border-t span:last-child');
        if (badge && item.badge) badge.textContent = item.badge;
      });
    }

    // Media Alt Text Sync from Master Media Library
    const mediaList = CmsEngine.getMediaList() || [];
    document.querySelectorAll('img').forEach(img => {
      const src = img.getAttribute('src');
      if (!src) return;
      const mediaItem = mediaList.find(m => m.url === src || src.endsWith(m.filename));
      if (mediaItem && mediaItem.alt) {
        img.alt = mediaItem.alt;
      }
    });

    console.log(`[CmsPublicClient] Page "${currentUrl}" successfully hydrated from CMS published database.`);
  }

  // Execute on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyCmsData);
  } else {
    applyCmsData();
  }
})();
