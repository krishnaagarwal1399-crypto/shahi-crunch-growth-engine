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

    <section className="container-tight pb-16 grid lg:grid-cols-2 gap-10 items-start">
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
          <div><div className="font-semibold">Visit Our Flagship Parlor</div><div className="text-muted-foreground text-sm">Plot No. 12, Royal Heritage Lane, MI Road, C-Scheme, Jaipur, Rajasthan 302001</div></div>
        </div>
      </div>

      <InquiryForm title="Request a Callback" />
    </section>

    {/* Google Map Section for Local SEO */}
    <section className="container-tight pb-24">
      <div className="rounded-3xl overflow-hidden border border-border shadow-card h-80">
        <iframe
          title="ShahiCrunch Jaipur Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14234.677943560756!2d75.7956!3d26.9124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db419a4e3286b%3A0xb304b7b209e99216!2sMI%20Road%2C%20Jaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  </Layout>
);

export default Contact;
