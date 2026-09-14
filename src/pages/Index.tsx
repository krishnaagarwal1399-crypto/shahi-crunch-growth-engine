import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import heroImg from "@/assets/hero.jpg";
import { ArrowRight, Award, Leaf, MapPin, Snowflake, Sparkles, Star, Truck } from "lucide-react";
import { InquiryForm } from "@/components/InquiryForm";

const Home = () => {
  useEffect(() => {
    document.title = "ShahiCrunch — Royal Taste in Every Crunch | Premium Ice Cream Jaipur";
  }, []);

  return (
    <Layout>
      {/* HERO SECTION - MIDNIGHT ROYAL NAVY BLUE */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <img
          src={heroImg}
          alt="Premium Kesar Pista ice cream in a golden bowl — ShahiCrunch Jaipur"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div 
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, rgba(11, 15, 25, 0.88) 0%, rgba(11, 15, 25, 0.80) 100%)" }}
        />
        <div className="relative container-tight py-24 text-white z-10">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="h-3.5 w-3.5" /> From the Pink City of Jaipur
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold mt-6 leading-[1.08] text-white">
              Experience the <span className="text-gradient-gold">Royal Taste</span> of ShahiCrunch
            </h1>
            <p className="mt-6 text-lg md:text-xl text-slate-200 max-w-xl leading-relaxed">
              Premium ice creams crafted with pure Kashmiri saffron, Belgian cocoa, and California nuts. Indulge in 100% vegetarian, slow-churned royalty in every scoop.
            </p>
            <p className="mt-3 font-display italic text-[#D4AF37] text-xl">"Royal Taste in Every Crunch"</p>
            <div className="mt-8 flex flex-wrap gap-4 items-center">
              <Link to="/products">
                <Button variant="hero" size="xl" className="bg-gradient-gold text-[#0B0F19] font-bold shadow-gold">
                  Explore Flavors <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/distributor">
                <Button variant="outline" size="xl" className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-[#0B0F19] font-semibold">
                  Become a Distributor
                </Button>
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-6 text-sm text-slate-300">
              <div className="flex items-center gap-1.5 text-amber-400">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="text-white font-semibold">4.9 / 5</span>
                <span className="text-slate-400">(2,840+ Reviews)</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-slate-300">
                <MapPin className="h-4 w-4 text-[#D4AF37]" /> MI Road, C-Scheme, Jaipur
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-24 container-tight">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#D4AF37] text-sm font-semibold tracking-widest uppercase">Our Signature Range</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 text-slate-900">Crafted for Connoisseurs</h2>
          <p className="text-muted-foreground mt-4 text-base">Four signature royal creations, each a celebration of taste, texture and Rajasthani tradition.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <Link to="/products" key={p.slug} className="group rounded-2xl overflow-hidden bg-white shadow-card border border-amber-500/20 hover:border-[#D4AF37] hover:shadow-gold transition-all duration-300 hover:-translate-y-2">
              <div className="aspect-square overflow-hidden relative">
                <img src={p.image} alt={`${p.name} ice cream`} width={800} height={800} loading="lazy" className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700" />
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#0B0F19]/80 backdrop-blur-md text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/30">
                  ₹180 / Tub
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl font-bold text-slate-900 group-hover:text-[#D4AF37] transition-colors">{p.name}</h3>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{p.tagline}</p>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#D4AF37]">
                  <span>Explore Details</span>
                  <span>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* THE ROYAL DIFFERENCE - DEEP MIDNIGHT BLUE */}
      <section className="py-24 bg-[#0B0F19] text-white">
        <div className="container-tight">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#D4AF37] text-sm font-semibold tracking-widest uppercase">Why ShahiCrunch</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 text-white">The Royal Difference</h2>
            <p className="text-slate-300 mt-4 text-base">Uncompromising quality inspired by traditional royal kitchens of Rajasthan.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Award, title: "Premium Ingredients", text: "Pure Kashmiri saffron, Belgian dark cocoa, and California nuts — zero compromise." },
              { icon: Snowflake, title: "Slow-Churned", text: "Handcrafted small batches for a denser, richer, velvety texture." },
              { icon: Leaf, title: "100% Vegetarian", text: "Pure dairy cream without palm oil, synthetic fillers, or gelatin." },
              { icon: Truck, title: "Cold-Chain Delivery", text: "Strict temperature-controlled delivery for uncompromised freshness." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="p-7 rounded-2xl bg-slate-900/60 border border-[#D4AF37]/25 hover:border-[#D4AF37] transition-all hover:-translate-y-1">
                <div className="h-12 w-12 rounded-xl bg-gradient-gold grid place-items-center text-[#0B0F19] mb-5 font-bold">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-white">{title}</h3>
                <p className="text-slate-300 mt-2.5 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DISTRIBUTOR CTA - ROYAL NAVY BLUE WITH GOLD ACCENTS */}
      <section className="py-24 container-tight">
        <div className="rounded-3xl bg-[#0B0F19] border border-[#D4AF37]/30 p-10 md:p-16 grid md:grid-cols-2 gap-8 items-center shadow-gold relative overflow-hidden text-white">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#D4AF37]/10 blur-3xl pointer-events-none" />
          <div className="relative">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#D4AF37]">Business Partnership</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 leading-tight text-white">
              Grow your business with <span className="text-gradient-gold">ShahiCrunch</span>
            </h2>
            <p className="mt-4 text-slate-300 max-w-md leading-relaxed">
              Join our fast-growing network of distributors and retailers across India. High profit margins, end-to-end cold chain support, and strong brand recall.
            </p>
          </div>
          <div className="relative flex flex-col sm:flex-row md:flex-col gap-3 md:items-end">
            <Link to="/distributor" className="w-full md:w-auto">
              <Button variant="hero" size="xl" className="w-full md:w-auto bg-gradient-gold text-[#0B0F19] font-bold shadow-gold">
                Apply as Distributor <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/contact" className="w-full md:w-auto">
              <Button variant="outline" size="xl" className="w-full md:w-auto border-2 border-white/80 text-white hover:bg-white hover:text-[#0B0F19] bg-transparent">
                Request a Callback
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 container-tight">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[#D4AF37] text-sm font-semibold tracking-widest uppercase">Loved Across India</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 text-slate-900">What Our Family Says</h2>
          <p className="text-muted-foreground mt-3">Rated 4.9/5 stars by thousands of delighted customers and trusted partners.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Priya Sharma", role: "Customer, Jaipur", text: "The Kesar Pista is unmatched. Tastes exactly like my grandmother's recipe — pure royal indulgence in every spoon!" },
            { name: "Rohit Agarwal", role: "Distributor, Udaipur", text: "Margins are great and the cold-chain support is reliable. ShahiCrunch sells itself in premium retail stores." },
            { name: "Anjali Verma", role: "Retailer, Ajmer", text: "Customers ask for Chocolive by name. Best decision to stock ShahiCrunch in our dessert parlour." },
          ].map((t) => (
            <div key={t.name} className="p-7 rounded-2xl bg-white shadow-card border border-amber-500/20 hover:shadow-gold transition-all">
              <div className="flex gap-1 text-amber-500 mb-3.5">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-500" />)}
              </div>
              <p className="text-slate-700 italic leading-relaxed text-sm">"{t.text}"</p>
              <div className="mt-5 pt-4 border-t border-slate-100">
                <div className="font-bold text-slate-900">{t.name}</div>
                <div className="text-xs text-[#D4AF37] font-semibold">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ROYAL FAQ SECTION (GEO) */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="container-tight max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-[#D4AF37] text-sm font-semibold tracking-widest uppercase">Got Questions?</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 text-slate-900">Frequently Asked Questions</h2>
            <p className="text-muted-foreground mt-3">Everything you need to know about our royal heritage recipes, ingredients, and partnerships.</p>
          </div>
          <div className="space-y-4">
            {[
              {
                q: "What makes ShahiCrunch ice cream unique in Jaipur?",
                a: "ShahiCrunch is inspired by royal Rajasthani heritage recipes. We slow-churn in small batches using pure Kashmiri saffron, California pistachios, Belgian cocoa, and 100% vegetarian dairy cream without palm oil or synthetic additives."
              },
              {
                q: "Where can I buy ShahiCrunch ice cream in Jaipur?",
                a: "Our flagship experience center is located at MI Road, C-Scheme, Jaipur. You can also find our signature tubs across authorized premium retail partners in Jaipur, or request online delivery."
              },
              {
                q: "How can I apply for a ShahiCrunch distributorship in Rajasthan or India?",
                a: "We offer attractive margins, dedicated cold-chain logistics support, and promotional marketing assistance. Simply visit our Distributor page or fill out the callback form below."
              },
              {
                q: "Are all ShahiCrunch ice creams 100% vegetarian?",
                a: "Yes, 100%. All our ice creams are crafted with pure vegetarian dairy, natural ingredients, and certified food standards."
              }
            ].map((faq, i) => (
              <details key={i} className="group p-6 rounded-2xl bg-white border border-amber-500/20 shadow-sm transition-all">
                <summary className="font-display text-lg md:text-xl font-bold cursor-pointer list-none flex justify-between items-center text-slate-900">
                  <span>{faq.q}</span>
                  <span className="text-[#D4AF37] font-bold text-2xl group-open:rotate-45 transition-transform duration-200">+</span>
                </summary>
                <p className="mt-4 text-slate-600 leading-relaxed text-sm md:text-base border-t border-slate-100 pt-4">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT & CALLBACK */}
      <section className="py-24 bg-[#0B0F19] text-white">
        <div className="container-tight grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="text-[#D4AF37] text-sm font-semibold tracking-widest uppercase">Get in Touch</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 text-white">Let's start a conversation</h2>
            <p className="text-slate-300 mt-4 max-w-md leading-relaxed">
              Whether you're a customer, retailer, wedding caterer or future distributor — we'd love to hear from you.
            </p>
            <div className="mt-8 space-y-4 text-sm text-slate-200">
              <div className="flex gap-3 items-center"><MapPin className="text-[#D4AF37]" /> Plot No. 12, Royal Heritage Lane, MI Road, C-Scheme, Jaipur</div>
              <div className="flex gap-3 items-center"><Sparkles className="text-[#D4AF37]" /> Pan-India temperature-controlled distribution</div>
            </div>
          </div>
          <div className="bg-white text-slate-900 p-8 rounded-3xl shadow-gold">
            <InquiryForm title="Request a Royal Callback" />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
