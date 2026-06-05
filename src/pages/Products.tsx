import { Layout } from "@/components/Layout";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Products = () => (
  <Layout>
    <section className="container-tight py-16 text-center">
      <span className="text-primary text-sm font-semibold tracking-widest uppercase">Our Range</span>
      <h1 className="font-display text-5xl md:text-6xl font-bold mt-3">Signature <span className="text-gradient-gold">Flavors</span></h1>
      <p className="text-muted-foreground max-w-2xl mx-auto mt-5">Every flavor is a celebration of premium ingredients, slow-churned craft, and the royal heritage of Jaipur.</p>
    </section>

    <section className="container-tight pb-20 space-y-16">
      {products.map((p, i) => (
        <div key={p.slug} className={`grid md:grid-cols-2 gap-10 items-center ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
          <div className="rounded-3xl overflow-hidden shadow-gold">
            <img src={p.image} alt={`${p.name} ice cream`} width={800} height={800} loading="lazy" className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">{p.tagline}</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">{p.name}</h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">{p.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {p.notes.map(n => (
                <span key={n} className="px-3 py-1.5 rounded-full bg-muted text-sm font-medium border border-border">{n}</span>
              ))}
            </div>
            <div className="mt-7 flex gap-3 flex-wrap">
              <Link to="/contact"><Button variant="hero">Enquire Now</Button></Link>
              <Link to="/distributor"><Button variant="outlineGold">Stock this Flavor</Button></Link>
            </div>
          </div>
        </div>
      ))}
    </section>
  </Layout>
);

export default Products;
