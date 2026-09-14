import { useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Award, Heart, MapPin, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const About = () => {
  useEffect(() => {
    document.title = "Our Royal Heritage & Story | ShahiCrunch Ice Cream Jaipur";
  }, []);

  return (
    <Layout>
      <section className="container-tight py-20">
        <span className="text-primary text-sm font-semibold tracking-widest uppercase">Our Story</span>
        <h1 className="font-display text-5xl md:text-6xl font-bold mt-3 max-w-3xl">
          Born in <span className="text-gradient-gold">Jaipur</span>, crafted for India.
        </h1>
        <p className="text-lg text-muted-foreground mt-6 max-w-2xl leading-relaxed">
          ShahiCrunch was born from a simple belief — that ice cream should taste royal. Inspired by the flavors of Rajasthan and crafted with uncompromising quality, every scoop tells a story of heritage, indulgence and care.
        </p>
      </section>

      <section className="container-tight py-12 grid md:grid-cols-3 gap-6">
        {[
          { icon: Heart, title: "Made with passion", text: "Small batches, hand-stirred recipes, and a relentless commitment to flavor." },
          { icon: Award, title: "Premium-only sourcing", text: "Kashmiri saffron, Belgian cocoa, California pistachios, pure dairy." },
          { icon: MapPin, title: "Rooted in Rajasthan", text: "Inspired by Jaipur's royal heritage of decadent desserts and timeless taste." },
        ].map(({ icon: Icon, title, text }) => (
          <div key={title} className="p-7 rounded-2xl bg-card border border-border shadow-card">
            <div className="h-12 w-12 rounded-xl bg-gradient-gold grid place-items-center text-secondary mb-4"><Icon className="h-6 w-6" /></div>
            <h3 className="font-display text-xl font-bold">{title}</h3>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{text}</p>
          </div>
        ))}
      </section>

      <section className="py-20 bg-secondary text-secondary-foreground mt-12">
        <div className="container-tight grid md:grid-cols-2 gap-10 items-center">
          <div>
            <Sparkles className="h-8 w-8 text-primary" />
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-4">Our Mission</h2>
            <p className="text-secondary-foreground/80 mt-4 leading-relaxed">
              To bring the joy of premium, royal-tasting ice cream to every corner of India — one scoop, one smile, one happy partner at a time.
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-secondary-foreground/5 border border-primary/20">
            <h3 className="font-display text-2xl font-bold">The Royal Promise</h3>
            <ul className="mt-4 space-y-2.5 text-secondary-foreground/80 text-sm">
              <li>✓ 100% Vegetarian & Pure Dairy</li>
              <li>✓ No artificial stabilizers or bulk fillers</li>
              <li>✓ Sourced directly from authentic origins</li>
              <li>✓ Unbroken cold-chain delivery</li>
            </ul>
            <div className="mt-6">
              <Link to="/products"><Button variant="hero">Explore Our Flavors</Button></Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
