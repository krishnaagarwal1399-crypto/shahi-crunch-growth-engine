import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";

export const Footer = () => (
  <footer className="bg-gradient-chocolate text-secondary-foreground mt-24">
    <div className="container-tight py-16 grid gap-10 md:grid-cols-4">
      <div className="md:col-span-2">
        <div className="flex items-center gap-2 mb-4">
          <span className="h-10 w-10 rounded-full bg-gradient-gold grid place-items-center text-secondary font-display font-bold">S</span>
          <span className="font-display text-2xl font-bold">Shahi<span className="text-gradient-gold">Crunch</span></span>
        </div>
        <p className="text-secondary-foreground/70 max-w-md leading-relaxed">
          Crafted in the royal city of Jaipur, ShahiCrunch brings you premium ice creams made with the finest ingredients and timeless Indian flavors.
        </p>
      </div>
      <div>
        <h4 className="font-display text-lg mb-4 text-primary">Explore</h4>
        <ul className="space-y-2 text-secondary-foreground/80 text-sm">
          <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
          <li><Link to="/products" className="hover:text-primary">Products</Link></li>
          <li><Link to="/distributor" className="hover:text-primary">Distributor</Link></li>
          <li><Link to="/testimonials" className="hover:text-primary">Testimonials</Link></li>
          <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-display text-lg mb-4 text-primary">Reach Us</h4>
        <ul className="space-y-3 text-sm text-secondary-foreground/80">
          <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 text-primary" /> Jaipur, Rajasthan, India</li>
          <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5 text-primary" /> +91 98765 43210</li>
          <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5 text-primary" /> hello@shahicrunch.in</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-primary/15">
      <div className="container-tight py-5 text-xs text-secondary-foreground/60 flex flex-col md:flex-row justify-between gap-2">
        <span>© {new Date().getFullYear()} ShahiCrunch. All rights reserved.</span>
        <span>Made with ♥ in Jaipur</span>
      </div>
    </div>
  </footer>
);
