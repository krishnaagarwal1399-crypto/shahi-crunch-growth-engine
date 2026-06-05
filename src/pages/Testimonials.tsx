import { Layout } from "@/components/Layout";
import { Star } from "lucide-react";

const items = [
  { name: "Priya Sharma", role: "Customer · Jaipur", text: "The Kesar Pista is unmatched. Tastes exactly like my grandmother's recipe — pure royal indulgence in every spoon." },
  { name: "Rohit Agarwal", role: "Distributor · Udaipur", text: "Margins are great, the cold-chain support is reliable, and the brand sells itself. Easiest partnership decision I've made." },
  { name: "Anjali Verma", role: "Retailer · Ajmer", text: "Customers ask for Chocolive by name now. Footfall has noticeably grown since we stocked ShahiCrunch." },
  { name: "Vikram Singh", role: "Customer · Jodhpur", text: "Dry Fruit Raita is a masterpiece. I've never tasted anything like it — completely original and outstanding." },
  { name: "Meera Joshi", role: "Customer · Kota", text: "Bought a tub of Double Crunch — finished in one sitting with my family. Incredible texture and flavor." },
  { name: "Sandeep Kumar", role: "Retailer · Bikaner", text: "Premium positioning works. We sell ShahiCrunch at top-shelf prices and customers come back for more." },
];

const Testimonials = () => (
  <Layout>
    <section className="container-tight py-16 text-center">
      <span className="text-primary text-sm font-semibold tracking-widest uppercase">Loved Across India</span>
      <h1 className="font-display text-5xl md:text-6xl font-bold mt-3">What our family <span className="text-gradient-gold">says</span></h1>
      <p className="text-muted-foreground max-w-2xl mx-auto mt-5">Real words from real customers, distributors and retailers.</p>
    </section>

    <section className="container-tight pb-24 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map(t => (
        <div key={t.name} className="p-7 rounded-2xl bg-card border border-border shadow-card hover:shadow-gold transition-shadow">
          <div className="flex gap-0.5 text-primary mb-3">
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
          </div>
          <p className="italic text-foreground/85 leading-relaxed">"{t.text}"</p>
          <div className="mt-5">
            <div className="font-semibold">{t.name}</div>
            <div className="text-xs text-muted-foreground">{t.role}</div>
          </div>
        </div>
      ))}
    </section>
  </Layout>
);

export default Testimonials;
