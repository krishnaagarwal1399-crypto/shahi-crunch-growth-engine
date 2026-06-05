import { Layout } from "@/components/Layout";
import { InquiryForm } from "@/components/InquiryForm";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

const PHONE = "919876543210";

const Contact = () => (
  <Layout>
    <section className="container-tight py-16">
      <span className="text-primary text-sm font-semibold tracking-widest uppercase">Contact Us</span>
      <h1 className="font-display text-5xl md:text-6xl font-bold mt-3">Let's <span className="text-gradient-gold">talk</span></h1>
      <p className="text-muted-foreground max-w-2xl mt-5">Questions, partnerships, or just love for ice cream — we'd love to hear from you.</p>
    </section>

    <section className="container-tight pb-24 grid lg:grid-cols-2 gap-10 items-start">
      <div className="space-y-5">
        <a href={`tel:+${PHONE}`} className="flex gap-4 p-5 rounded-2xl bg-card border border-border shadow-card hover:border-primary transition-colors">
          <div className="h-12 w-12 rounded-xl bg-gradient-gold grid place-items-center text-secondary"><Phone className="h-5 w-5" /></div>
          <div><div className="font-semibold">Call us</div><div className="text-muted-foreground text-sm">+91 98765 43210</div></div>
        </a>
        <a href={`https://wa.me/${PHONE}`} target="_blank" rel="noopener noreferrer" className="flex gap-4 p-5 rounded-2xl bg-card border border-border shadow-card hover:border-primary transition-colors">
          <div className="h-12 w-12 rounded-xl bg-[#25D366] grid place-items-center text-white"><MessageCircle className="h-5 w-5" /></div>
          <div><div className="font-semibold">WhatsApp</div><div className="text-muted-foreground text-sm">Chat with our team instantly</div></div>
        </a>
        <a href="mailto:hello@shahicrunch.in" className="flex gap-4 p-5 rounded-2xl bg-card border border-border shadow-card hover:border-primary transition-colors">
          <div className="h-12 w-12 rounded-xl bg-gradient-gold grid place-items-center text-secondary"><Mail className="h-5 w-5" /></div>
          <div><div className="font-semibold">Email</div><div className="text-muted-foreground text-sm">hello@shahicrunch.in</div></div>
        </a>
        <div className="flex gap-4 p-5 rounded-2xl bg-card border border-border shadow-card">
          <div className="h-12 w-12 rounded-xl bg-gradient-gold grid place-items-center text-secondary"><MapPin className="h-5 w-5" /></div>
          <div><div className="font-semibold">Visit</div><div className="text-muted-foreground text-sm">Jaipur, Rajasthan, India</div></div>
        </div>
      </div>

      <InquiryForm title="Request a Callback" />
    </section>
  </Layout>
);

export default Contact;
