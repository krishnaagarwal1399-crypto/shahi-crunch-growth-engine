import kesar from "@/assets/kesar-pista.jpg";
import doubleCrunch from "@/assets/double-crunch.jpg";
import chocolive from "@/assets/chocolive.jpg";
import dryFruit from "@/assets/dry-fruit-raita.jpg";

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  notes: string[];
};

export const products: Product[] = [
  {
    slug: "kesar-pista",
    name: "Kesar Pista",
    tagline: "Royal saffron, rich pistachio",
    description:
      "Hand-stirred with Kashmiri saffron and California pistachios for that unmistakable royal flavor of Rajasthan.",
    image: kesar,
    notes: ["Real Saffron", "Roasted Pistachio", "Slow-Churned"],
  },
  {
    slug: "double-crunch",
    name: "Double Crunch",
    tagline: "Twice the crunch, twice the joy",
    description:
      "Creamy vanilla base loaded with caramel crunchies and roasted nuts — every spoon delivers a satisfying bite.",
    image: doubleCrunch,
    notes: ["Caramel Crunch", "Roasted Nuts", "Madagascar Vanilla"],
  },
  {
    slug: "chocolive",
    name: "Chocolive",
    tagline: "Belgian indulgence",
    description:
      "Deep Belgian cocoa folded with chocolate olive bites and silky ganache swirls. Pure indulgence.",
    image: chocolive,
    notes: ["Belgian Cocoa", "Chocolate Olives", "Ganache Swirl"],
  },
  {
    slug: "dry-fruit-raita",
    name: "Dry Fruit Raita",
    tagline: "A signature of Jaipur",
    description:
      "Our signature dessert — cool, creamy yoghurt-style frozen treat loaded with almonds, cashews, raisins and pistachios.",
    image: dryFruit,
    notes: ["Almonds", "Cashews", "Pistachios", "Raisins"],
  },
];
