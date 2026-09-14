import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, Sparkles } from "lucide-react";

export const Footer = () => (
  <footer className="bg-[#0B0F19] text-white border-t border-[#D4AF37]/25 mt-20">
    <div className="container-tight py-16 grid gap-10 md:grid-cols-4">
      <div className="md:col-span-2">
        <div className="flex items-center gap-2.5 mb-4">
          <span className="h-10 w-10 rounded-full bg-gradient-gold grid place-items-center text-[#0B0F19] font-display font-bold text-xl shadow-md">
            S
          </span>
          <span className="font-display text-2xl font-bold text-white tracking-tight">
            Shahi<span className="text-gradient-gold">Crunch</span>
          </span>
        </div>
        <p className="text-slate-300 max-w-md leading-relaxed text-sm">
          Crafted in the royal city of Jaipur, ShahiCrunch brings you premium artisanal ice creams made with the finest Kashmiri saffron, Belgian chocolate, and pure vegetarian dairy.
        </p>
        <div className="mt-4 flex items-center gap-2 text-xs text-[#D4AF37] font-semibold tracking-wider uppercase">
          <Sparkles className="h-3.5 w-3.5" /> From the Pink City of Jaipur
        </div>
      </div>
      <div>
        <h4 className="font-display text-base font-bold mb-4 text-[#D4AF37] tracking-wider uppercase">
          Quick Links
        </h4>
        <ul className="space-y-2.5 text-slate-300 text-sm">
          <li><Link to="/" className="hover:text-[#D4AF37] transition-colors">Home</Link></li>
          <li><Link to="/about" className="hover:text-[#D4AF37] transition-colors">Our Story</Link></li>
          <li><Link to="/products" className="hover:text-[#D4AF37] transition-colors">Signature Flavors</Link></li>
          <li><Link to="/distributor" className="hover:text-[#D4AF37] transition-colors">Distributorship</Link></li>
          <li><Link to="/testimonials" className="hover:text-[#D4AF37] transition-colors">Customer Reviews</Link></li>
          <li><Link to="/contact" className="hover:text-[#D4AF37] transition-colors">Contact Us</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-display text-base font-bold mb-4 text-[#D4AF37] tracking-wider uppercase">
          Reach Us
        </h4>
        <ul className="space-y-3.5 text-sm text-slate-300">
          <li className="flex gap-2.5 items-start">
            <MapPin className="h-4 w-4 mt-1 text-[#D4AF37] shrink-0" />
            <span>Plot No. 12, Royal Heritage Lane, MI Road, C-Scheme, Jaipur, Rajasthan 302001</span>
          </li>
          <li className="flex gap-2.5 items-center">
            <Phone className="h-4 w-4 text-[#D4AF37] shrink-0" />
            <span>+91 98765 43210</span>
          </li>
          <li className="flex gap-2.5 items-center">
            <Mail className="h-4 w-4 text-[#D4AF37] shrink-0" />
            <span>hello@shahicrunch.in</span>
          </li>
        </ul>
      </div>
    </div>
    <div className="border-t border-white/10 bg-[#070A10]">
      <div className="container-tight py-5 text-xs text-slate-400 flex flex-col sm:flex-row justify-between items-center gap-3">
        <span>© {new Date().getFullYear()} ShahiCrunch Dairy &amp; Confectionery. All rights reserved.</span>
        <span className="text-slate-400">Crafted with Royal Passion in Jaipur 🇮🇳</span>
      </div>
    </div>
  </footer>
);
