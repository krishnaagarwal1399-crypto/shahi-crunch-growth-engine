/**
 * SHAHICRUNCH SIMPLE & CLEAR MULTI-PAGE SEO CRM CONTROLLER
 * Easy to understand, multi-page management with instant Google preview
 */

(function () {
  'use strict';

  // 1. Multi-Page SEO Database
  const sitePages = {
    home: {
      id: "home",
      name: "🏠 Home Page",
      slug: "/",
      title: "ShahiCrunch — Royal Taste in Every Crunch | Premium Ice Cream Jaipur",
      desc: "ShahiCrunch is Jaipur's luxury ice cream brand crafting authentic Kesar Pista, Double Crunch, Chocolive & Dry Fruit Raita. Distributor partnerships open across India.",
      keyword: "ice cream jaipur",
      h1: "Experience the Royal Taste of ShahiCrunch"
    },
    flavors: {
      id: "flavors",
      name: "🍨 Flavors Page",
      slug: "/flavors",
      title: "Royal Ice Cream Flavors | Kesar Pista & Belgian Chocolate ShahiCrunch",
      desc: "Explore 4 signature royal ice creams crafted in Jaipur: Kashmiri Kesar Pista, Double Crunch waffle fudge, Chocolive Belgian dark cocoa & Rajasthani Dry Fruit Raita.",
      keyword: "ice cream flavors jaipur",
      h1: "Crafted for Connoisseurs — Signature Flavors"
    },
    distributor: {
      id: "distributor",
      name: "🤝 Distributor Page",
      slug: "/distributor",
      title: "Ice Cream Distributorship in Rajasthan | High Margin FMCG Franchise",
      desc: "Partner with Jaipur's fastest growing premium ice cream brand. Complete cold-chain support, attractive profit margins, and promotional backing for all distributors.",
      keyword: "ice cream distributorship rajasthan",
      h1: "Grow Your Business With ShahiCrunch Distributorship"
    },
    contact: {
      id: "contact",
      name: "📞 Contact Page",
      slug: "/contact",
      title: "Contact ShahiCrunch Jaipur | Corporate Office & Order Helpline",
      desc: "Connect with the ShahiCrunch team at MI Road, C-Scheme, Jaipur. Call +91 98765 43210 for wholesale orders, distributor inquiries, and wedding catering bookings.",
      keyword: "shahicrunch jaipur contact",
      h1: "Partner With Jaipur's Royal Ice Cream Brand"
    }
  };

  // Currently selected page (default: home)
  let activePageKey = "home";

  // Preloaded Leads
  let crmLeads = [
    {
      id: "LEAD-1",
      name: "Rajesh Khandelwal",
      phone: "+91 98290 12456",
      city: "Jaipur (Mansarovar)",
      type: "Distributor",
      message: "Interested in taking distributorship for Mansarovar. Have cold-chain storage ready.",
      date: "Today"
    },
    {
      id: "LEAD-2",
      name: "Vikram Rathore",
      phone: "+91 94140 88219",
      city: "Udaipur",
      type: "Retail Partner",
      message: "Want to stock Chocolive & Kesar Pista tubs in our 3 heritage cafes.",
      date: "Yesterday"
    },
    {
      id: "LEAD-3",
      name: "Meenakshi Choudhary",
      phone: "+91 98285 77102",
      city: "Jodhpur",
      type: "Wedding Catering",
      message: "Looking for royal ice cream catering for 1,200 guest destination wedding.",
      date: "02 Sep"
    }
  ];

  // Try loading saved data from localStorage
  try {
    const savedData = localStorage.getItem("shahicrunch_pages_seo");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      Object.assign(sitePages, parsed);
    }
  } catch (e) {}

  // ----------------- Switch Page -----------------
  window.selectPageForSeo = function (pageKey) {
    if (!sitePages[pageKey]) return;
    activePageKey = pageKey;

    // Update active tab styling
    document.querySelectorAll(".page-tab-btn").forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-page") === pageKey);
    });

    const page = sitePages[pageKey];

    // Populate Input fields
    const titleInput = document.getElementById("seo-input-title");
    const descInput = document.getElementById("seo-input-desc");
    const kwInput = document.getElementById("seo-input-keyword");
    const h1Input = document.getElementById("seo-input-h1");
    const activeLabel = document.getElementById("current-editing-page-name");

    if (titleInput) titleInput.value = page.title;
    if (descInput) descInput.value = page.desc;
    if (kwInput) kwInput.value = page.keyword;
    if (h1Input) h1Input.value = page.h1;
    if (activeLabel) activeLabel.textContent = `${page.name} (${page.slug})`;

    // Refresh live preview
    updateSimplePreview();
  };

  // ----------------- Update Real-time Google Preview -----------------
  function updateSimplePreview() {
    const page = sitePages[activePageKey];
    if (!page) return;

    // Current values from inputs
    const titleVal = document.getElementById("seo-input-title")?.value || page.title;
    const descVal = document.getElementById("seo-input-desc")?.value || page.desc;
    const kwVal = document.getElementById("seo-input-keyword")?.value || page.keyword;

    // Update Live Google SERP Card
    const serpUrl = document.getElementById("serp-preview-url");
    const serpTitle = document.getElementById("serp-preview-title");
    const serpDesc = document.getElementById("serp-preview-desc");

    if (serpUrl) serpUrl.textContent = `https://shahicrunch.in${page.slug === '/' ? '' : page.slug}`;
    if (serpTitle) serpTitle.textContent = titleVal;
    if (serpDesc) serpDesc.textContent = descVal;

    // Character counters with simple guidance
    const titleLen = titleVal.length;
    const descLen = descVal.length;

    const titleBadge = document.getElementById("title-char-badge");
    if (titleBadge) {
      if (titleLen >= 45 && titleLen <= 65) {
        titleBadge.textContent = `${titleLen} / 60 अक्षर — बिल्कुल सही! ✓`;
        titleBadge.className = "char-badge ok";
      } else if (titleLen < 45) {
        titleBadge.textContent = `${titleLen} / 60 अक्षर — थोड़ा छोटा है`;
        titleBadge.className = "char-badge warn";
      } else {
        titleBadge.textContent = `${titleLen} / 60 अक्षर — ज्यादा लंबा है (Google पर कटेगा)`;
        titleBadge.className = "char-badge warn";
      }
    }

    const descBadge = document.getElementById("desc-char-badge");
    if (descBadge) {
      if (descLen >= 120 && descLen <= 165) {
        descBadge.textContent = `${descLen} / 160 अक्षर — बिल्कुल सही! ✓`;
        descBadge.className = "char-badge ok";
      } else if (descLen < 120) {
        descBadge.textContent = `${descLen} / 160 अक्षर — 1-2 लाइन और लिखें`;
        descBadge.className = "char-badge warn";
      } else {
        descBadge.textContent = `${descLen} / 160 अक्षर — ज्यादा लंबा है`;
        descBadge.className = "char-badge warn";
      }
    }

    // Live Checklist updates
    const chkTitle = document.getElementById("chk-title-length");
    const chkDesc = document.getElementById("chk-desc-length");
    const chkKw = document.getElementById("chk-kw-present");

    if (chkTitle) {
      const isGood = titleLen >= 40 && titleLen <= 65;
      chkTitle.className = "check-icon " + (isGood ? "pass" : "warn");
      chkTitle.textContent = isGood ? "✓" : "!";
    }

    if (chkDesc) {
      const isGood = descLen >= 110 && descLen <= 165;
      chkDesc.className = "check-icon " + (isGood ? "pass" : "warn");
      chkDesc.textContent = isGood ? "✓" : "!";
    }

    if (chkKw) {
      const kw = (kwVal || "").toLowerCase().trim();
      const hasKw = kw.length > 2 && titleVal.toLowerCase().includes(kw);
      chkKw.className = "check-icon " + (hasKw ? "pass" : "warn");
      chkKw.textContent = hasKw ? "✓" : "!";
    }

    // If editing homepage, also update live document title & meta tags
    if (activePageKey === "home") {
      document.title = titleVal;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", descVal);
    }
  }

  // ----------------- Save Changes -----------------
  window.saveCurrentPageSeo = function () {
    const page = sitePages[activePageKey];
    if (!page) return;

    page.title = document.getElementById("seo-input-title")?.value || page.title;
    page.desc = document.getElementById("seo-input-desc")?.value || page.desc;
    page.keyword = document.getElementById("seo-input-keyword")?.value || page.keyword;
    page.h1 = document.getElementById("seo-input-h1")?.value || page.h1;

    try {
      localStorage.setItem("shahicrunch_pages_seo", JSON.stringify(sitePages));
    } catch (e) {}

    showToast(`✅ "${page.name}" का SEO सफलतापूर्वक सेव हो गया!`);
  };

  // ----------------- Switch Views (SEO Form vs Leads) -----------------
  window.switchMainView = function (viewName) {
    document.querySelectorAll(".view-switch-btn").forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-view") === viewName);
    });

    const seoView = document.getElementById("view-seo-manager");
    const leadsView = document.getElementById("view-leads-manager");

    if (viewName === "seo") {
      if (seoView) seoView.style.display = "grid";
      if (leadsView) leadsView.style.display = "none";
    } else {
      if (seoView) seoView.style.display = "none";
      if (leadsView) leadsView.style.display = "block";
      renderSimpleLeadsTable();
    }
  };

  // ----------------- Render Leads Table -----------------
  function renderSimpleLeadsTable() {
    const tbody = document.getElementById("simple-leads-tbody");
    if (!tbody) return;

    tbody.innerHTML = crmLeads.map(lead => `
      <tr>
        <td style="font-weight: 700; color: #E5A93C;">${lead.name}</td>
        <td>${lead.phone}</td>
        <td>📍 ${lead.city}</td>
        <td><span style="background: rgba(229,169,60,0.15); color: #F5B84C; padding: 2px 8px; border-radius: 6px; font-size: 11px;">${lead.type}</span></td>
        <td style="color: #94A3B8; font-size: 12px;">"${lead.message}"</td>
        <td style="color: #94A3B8; font-size: 11px;">${lead.date}</td>
      </tr>
    `).join("");
  }

  // Hook new leads from contact form
  window.addNewLead = function (data) {
    const newLead = {
      id: `LEAD-${crmLeads.length + 1}`,
      name: data.name || "New Customer",
      phone: data.phone || "",
      city: data.city || "Jaipur",
      type: "Website Inquiry",
      message: data.message || "Requested Callback",
      date: "Just now"
    };

    crmLeads.unshift(newLead);
    renderSimpleLeadsTable();
    showToast(`🎉 नई इन्क्वायरी प्राप्त हुई: ${newLead.name} (${newLead.city})`);
  };

  // ----------------- Modal Open / Close -----------------
  window.openSimpleCrm = function (pageKey = "home") {
    const modal = document.getElementById("seo-crm-modal");
    if (!modal) return;
    modal.classList.add("active");
    window.switchMainView("seo");
    window.selectPageForSeo(pageKey);
  };

  window.closeSimpleCrm = function () {
    const modal = document.getElementById("seo-crm-modal");
    if (!modal) return;
    modal.classList.remove("active");
  };

  // ----------------- Toast Notification -----------------
  function showToast(msg) {
    let box = document.getElementById("admin-toast-container");
    if (!box) {
      box = document.createElement("div");
      box.id = "admin-toast-container";
      document.body.appendChild(box);
    }
    const toast = document.createElement("div");
    toast.className = "admin-toast";
    toast.innerHTML = `<span>👑</span> <span>${msg}</span>`;
    box.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(20px)";
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // ----------------- Init Event Listeners -----------------
  document.addEventListener("DOMContentLoaded", function () {
    // Inputs live listeners
    ["seo-input-title", "seo-input-desc", "seo-input-keyword", "seo-input-h1"].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener("input", updateSimplePreview);
      }
    });

    // Contact Form integration
    const form = document.getElementById("website-contact-form");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        const data = {
          name: document.getElementById("form-name")?.value,
          phone: document.getElementById("form-phone")?.value,
          city: document.getElementById("form-city")?.value,
          message: document.getElementById("form-message")?.value
        };
        window.addNewLead(data);
        form.reset();
        const banner = document.getElementById("form-success-banner");
        if (banner) {
          banner.style.display = "block";
          setTimeout(() => banner.style.display = "none", 5000);
        }
      });
    }

    // Default load
    window.selectPageForSeo("home");
  });

})();
