import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import heroImg from "@/assets/hero.jpg";
import { ArrowRight, Award, Leaf, MapPin, Snowflake, Sparkles, Star, Truck } from "lucide-react";
import { InquiryForm } from "@/components/InquiryForm";

const Home = () => {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <img
          src={heroImg}
          alt="Premium Kesar Pista ice cream in a golden bowl — ShahiCrunch"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero" style={{ background: "var(--gradient-hero)" }} />
        <div className="relative container-tight py-24 text-secondary-foreground">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-medium tracking-wider uppercase">
              <Sparkles className="h-3.5 w-3.5" /> From the Pink City of Jaipur
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold mt-6 leading-[1.05]">
              Experience the <span className="text-gradient-gold">Royal Taste</span> of ShahiCrunch
            </h1>
            <p className="mt-6 text-lg md:text-xl text-secondary-foreground/85 max-w-xl leading-relaxed">
              Premium ice creams crafted with rich flavors, quality ingredients, and unforgettable taste.
            </p>
            <p className="mt-3 font-display italic text-primary text-lg">"Royal Taste in Every Crunch"</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/products"><Button variant="hero" size="xl">Explore Flavors <ArrowRight /></Button></Link>
              <Link to="/distributor"><Button variant="outlineGold" size="xl">Become a Distributor</Button></Link>
            </div>
            <div className="mt-10 flex items-center gap-6 text-sm text-secondary-foreground/70">
              <div className="flex items-center gap-1.5"><Star className="h-4 w-4 fill-primary text-primary" /> 4.9 / 5 from 2,800+ customers</div>
              <div className="hidden sm:flex items-center gap-1.5"><MapPin className="h-4 w-4 text-primary" /> Jaipur, Rajasthan</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-24 container-tight">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">Our Flavors</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">Crafted for Connoisseurs</h2>
          <p className="text-muted-foreground mt-4">Four signature creations, each a celebration of taste, texture and tradition.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <Link to="/products" key={p.slug} className="group rounded-2xl overflow-hidden bg-card shadow-card hover:shadow-gold transition-all hover:-translate-y-1">
              <div className="aspect-square overflow-hidden">
                <img src={p.image} alt={`${p.name} ice cream`} width={800} height={800} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl font-bold">{p.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{p.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="py-24 bg-secondary text-secondary-foreground">
        <div className="container-tight">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">Why ShahiCrunch</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">The Royal Difference</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Award, title: "Premium Ingredients", text: "Real saffron, Belgian cocoa, and California nuts — no compromise." },
              { icon: Snowflake, title: "Slow-Churned", text: "Hand-crafted batches for a denser, creamier texture." },
              { icon: Leaf, title: "100% Vegetarian", text: "Made with pure dairy and natural flavors. No artificial additives." },
              { icon: Truck, title: "Cold-Chain Delivery", text: "Pan-India distribution with uncompromised freshness." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="p-6 rounded-2xl bg-secondary-foreground/5 border border-primary/15 hover:border-primary/40 transition-colors">
                <div className="h-12 w-12 rounded-xl bg-gradient-gold grid place-items-center text-secondary mb-4">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-semibold">{title}</h3>
                <p className="text-secondary-foreground/70 mt-2 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DISTRIBUTOR CTA */}
      <section className="py-24 container-tight">
        <div className="rounded-3xl bg-gradient-gold p-10 md:p-16 grid md:grid-cols-2 gap-8 items-center shadow-gold relative overflow-hidden">
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />
          <div className="relative text-secondary">
            <span className="text-xs font-semibold tracking-widest uppercase">Partner with us</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 leading-tight">Grow your business with ShahiCrunch</h2>
            <p className="mt-4 text-secondary/85 max-w-md">
              Join our growing network of distributors and retailers across India. High margins, marketing support, and a brand customers love.
            </p>
          </div>
          <div className="relative flex flex-col sm:flex-row md:flex-col gap-3 md:items-end">
            <Link to="/distributor" className="w-full md:w-auto"><Button variant="royal" size="xl" className="w-full md:w-auto">Apply as Distributor <ArrowRight /></Button></Link>
            <Link to="/contact" className="w-full md:w-auto"><Button variant="outline" size="xl" className="w-full md:w-auto bg-transparent border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">Request a Callback</Button></Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 container-tight">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">Loved by India</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">What Our Family Says</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Priya Sharma", role: "Customer, Jaipur", text: "The Kesar Pista is unmatched. Tastes exactly like my grandmother's recipe — pure royal!" },
            { name: "Rohit Agarwal", role: "Distributor, Udaipur", text: "Margins are great and the cold-chain support is reliable. ShahiCrunch sells itself." },
            { name: "Anjali Verma", role: "Retailer, Ajmer", text: "Customers ask for Chocolive by name. Best decision to stock ShahiCrunch in our store." },
          ].map((t) => (
            <div key={t.name} className="p-7 rounded-2xl bg-card shadow-card border border-border">
              <div className="flex gap-0.5 text-primary mb-3">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="text-foreground/85 italic">"{t.text}"</p>
              <div className="mt-5">
                <div className="font-semibold">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-24 bg-muted/50">
        <div className="container-tight grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">Get in touch</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">Let's start a conversation</h2>
            <p className="text-muted-foreground mt-4 max-w-md">
              Whether you're a customer, retailer or future distributor — we'd love to hear from you. Drop a message and we'll get back within 24 hours.
            </p>
            <div className="mt-8 space-y-4 text-sm">
              <div className="flex gap-3"><MapPin className="text-primary" /> Jaipur, Rajasthan, India</div>
              <div className="flex gap-3"><Sparkles className="text-primary" /> Pan-India distribution network</div>
            </div>
          </div>
          <InquiryForm />
        </div>
      </section>
    </Layout>
  );
};

export default Home;
