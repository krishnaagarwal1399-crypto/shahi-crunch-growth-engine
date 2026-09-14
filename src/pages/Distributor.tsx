import { useState, useEffect } from "react";
import { z } from "zod";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { CheckCircle2, TrendingUp, Truck, Megaphone } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().regex(/^[0-9+\-\s]{7,15}$/),
  email: z.string().trim().email().max(255),
  city: z.string().trim().min(2).max(80),
  state: z.string().trim().min(2).max(80),
  business: z.string().trim().max(150).optional(),
  experience: z.string().trim().max(80).optional(),
  message: z.string().trim().max(1000).optional(),
});

const Distributor = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Ice Cream Distributorship in Rajasthan | High Margin FMCG Franchise";
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse(Object.fromEntries(fd.entries()));
    if (!parsed.success) {
      toast({ title: "Please complete required fields", description: "Check the marked fields and try again.", variant: "destructive" });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Application received!", description: "Our partnership team will contact you within 48 hours." });
      (e.target as HTMLFormElement).reset();
    }, 800);
  };

  return (
    <Layout>
      <section className="container-tight py-16 text-center">
        <span className="text-primary text-sm font-semibold tracking-widest uppercase">Business Partnership</span>
        <h1 className="font-display text-5xl md:text-6xl font-bold mt-3">Partner with <span className="text-gradient-gold">ShahiCrunch</span></h1>
        <p className="text-muted-foreground max-w-2xl mx-auto mt-5">
          Join one of Rajasthan's fastest growing premium FMCG ice cream brands. Attractive margins, strong brand recall, and end-to-end cold-chain support.
        </p>
      </section>

      <section className="container-tight pb-16 grid md:grid-cols-4 gap-6">
        {[
          { icon: TrendingUp, title: "High ROI & Margins", text: "Competitive distributor and retailer margins designed for profitability." },
          { icon: Truck, title: "Reliable Cold Chain", text: "Temperature-controlled logistics guarantee products arrive in prime condition." },
          { icon: Megaphone, title: "Marketing Support", text: "POS branding, promotional sampling, and localized digital campaigns." },
          { icon: CheckCircle2, title: "Fast-Moving SKU", text: "Four high-demand signature flavors with strong repeat purchase behavior." },
        ].map(({ icon: Icon, title, text }) => (
          <div key={title} className="p-6 rounded-2xl bg-card border border-border shadow-card">
            <div className="h-12 w-12 rounded-xl bg-gradient-gold grid place-items-center text-secondary mb-4"><Icon className="h-6 w-6" /></div>
            <h3 className="font-display text-lg font-bold">{title}</h3>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{text}</p>
          </div>
        ))}
      </section>

      <section className="container-tight pb-24 max-w-3xl mx-auto">
        <div className="p-8 md:p-12 rounded-3xl bg-card border border-border shadow-card">
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl font-bold">Distributor Application Form</h2>
            <p className="text-muted-foreground mt-2 text-sm">Tell us about your distribution footprint. We'll get in touch promptly.</p>
          </div>
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5"><Label htmlFor="name">Full name *</Label><Input id="name" name="name" required /></div>
              <div className="space-y-1.5"><Label htmlFor="phone">Phone *</Label><Input id="phone" name="phone" required placeholder="+91 98xxxxxxxx" /></div>
              <div className="space-y-1.5"><Label htmlFor="email">Email *</Label><Input id="email" name="email" type="email" required /></div>
              <div className="space-y-1.5"><Label htmlFor="business">Business name</Label><Input id="business" name="business" /></div>
              <div className="space-y-1.5"><Label htmlFor="city">City *</Label><Input id="city" name="city" required /></div>
              <div className="space-y-1.5"><Label htmlFor="state">State *</Label><Input id="state" name="state" required /></div>
              <div className="space-y-1.5 sm:col-span-2"><Label htmlFor="experience">Experience in FMCG / Frozen</Label><Input id="experience" name="experience" placeholder="e.g. 3 years" /></div>
            </div>
            <div className="space-y-1.5"><Label htmlFor="message">Tell us about your business</Label><Textarea id="message" name="message" rows={4} /></div>
            <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
              {loading ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Distributor;
