import { useState } from "react";
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
      <section className="bg-gradient-chocolate text-secondary-foreground">
        <div className="container-tight py-20">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">Partnership Opportunity</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold mt-3 max-w-3xl">Become a <span className="text-gradient-gold">ShahiCrunch</span> Distributor</h1>
          <p className="text-secondary-foreground/80 mt-5 max-w-2xl">Join our rapidly growing network and bring royal-taste ice creams to your city. Low investment, high margins, full support.</p>
        </div>
      </section>

      <section className="container-tight py-16 grid md:grid-cols-3 gap-6">
        {[
          { icon: TrendingUp, title: "High Margins", text: "Competitive trade margins and exclusive territory rights." },
          { icon: Truck, title: "Cold-Chain Support", text: "End-to-end logistics with temperature-controlled delivery." },
          { icon: Megaphone, title: "Marketing Support", text: "Co-branded campaigns, POP material and digital assets." },
        ].map(({ icon: Icon, title, text }) => (
          <div key={title} className="p-7 rounded-2xl bg-card border border-border shadow-card">
            <div className="h-12 w-12 rounded-xl bg-gradient-gold grid place-items-center text-secondary mb-4"><Icon className="h-6 w-6" /></div>
            <h3 className="font-display text-xl font-bold">{title}</h3>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{text}</p>
          </div>
        ))}
      </section>

      <section className="container-tight pb-24 grid lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="font-display text-3xl font-bold">Why partner with us?</h2>
          {[
            "Established brand with proven product-market fit",
            "Exclusive territory & first-right of refusal",
            "Premium pricing for healthy margins",
            "Onboarding & sales training included",
            "Regular product launches to drive footfall",
            "Direct access to founders & response within 48hrs",
          ].map(point => (
            <div key={point} className="flex gap-2 text-foreground/85">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <span>{point}</span>
            </div>
          ))}
        </div>

        <form onSubmit={onSubmit} className="lg:col-span-3 bg-card border border-border rounded-2xl p-8 shadow-card space-y-4">
          <h3 className="font-display text-2xl font-bold">Distributor Application</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5"><Label htmlFor="name">Full name *</Label><Input id="name" name="name" required /></div>
            <div className="space-y-1.5"><Label htmlFor="phone">Phone *</Label><Input id="phone" name="phone" required placeholder="+91 98xxxxxxxx"/></div>
            <div className="space-y-1.5"><Label htmlFor="email">Email *</Label><Input id="email" name="email" type="email" required /></div>
            <div className="space-y-1.5"><Label htmlFor="business">Business name</Label><Input id="business" name="business" /></div>
            <div className="space-y-1.5"><Label htmlFor="city">City *</Label><Input id="city" name="city" required /></div>
            <div className="space-y-1.5"><Label htmlFor="state">State *</Label><Input id="state" name="state" required /></div>
            <div className="space-y-1.5 sm:col-span-2"><Label htmlFor="experience">Experience in FMCG / Frozen</Label><Input id="experience" name="experience" placeholder="e.g. 3 years"/></div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="message">Tell us about your business</Label>
            <Textarea id="message" name="message" rows={4} />
          </div>
          <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
            {loading ? "Submitting..." : "Submit Application"}
          </Button>
        </form>
      </section>
    </Layout>
  );
};

export default Distributor;
