import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/distributor", label: "Distributor" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/contact", label: "Contact" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-40 transition-all ${scrolled ? "bg-background/85 backdrop-blur-md shadow-soft" : "bg-transparent"}`}>
      <nav className="container-tight flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2">
          <span className="h-9 w-9 rounded-full bg-gradient-gold grid place-items-center text-secondary font-display font-bold">S</span>
          <span className="font-display text-xl md:text-2xl font-bold tracking-tight">
            Shahi<span className="text-gradient-gold">Crunch</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-primary ${isActive ? "text-primary" : "text-foreground/80"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link to="/distributor"><Button variant="hero" size="sm">Become a Distributor</Button></Link>
        </div>

        <button className="lg:hidden p-2 rounded-md text-foreground" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden bg-background border-t border-border">
          <div className="container-tight py-4 flex flex-col gap-3">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === "/"} className={({ isActive }) =>
                `py-2 font-medium ${isActive ? "text-primary" : "text-foreground/80"}`
              }>{l.label}</NavLink>
            ))}
            <Link to="/distributor"><Button variant="hero" className="w-full">Become a Distributor</Button></Link>
          </div>
        </div>
      )}
    </header>
  );
};
