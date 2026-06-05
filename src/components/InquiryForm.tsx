import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(100),
  phone: z.string().trim().regex(/^[0-9+\-\s]{7,15}$/, "Enter a valid phone"),
  email: z.string().trim().email("Invalid email").max(255),
  city: z.string().trim().min(2, "Enter your city").max(80),
  message: z.string().trim().max(1000).optional(),
});

export const InquiryForm = ({ title = "Send us an inquiry", defaultMessage = "" }: { title?: string; defaultMessage?: string }) => {
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      toast({ title: "Please check your details", description: parsed.error.errors[0].message, variant: "destructive" });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Inquiry received!", description: "Our team will reach out within 24 hours." });
      (e.target as HTMLFormElement).reset();
    }, 700);
  };

  return (
    <form onSubmit={onSubmit} className="bg-card border border-border rounded-2xl p-7 shadow-card space-y-4">
      <h3 className="font-display text-2xl font-bold">{title}</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" name="name" placeholder="Your name" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" placeholder="+91 98xxxxxxxx" required />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="you@email.com" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="city">City</Label>
          <Input id="city" name="city" placeholder="Jaipur" required />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" rows={4} defaultValue={defaultMessage} placeholder="Tell us how we can help..." />
      </div>
      <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
        {loading ? "Sending..." : "Send Inquiry"}
      </Button>
    </form>
  );
};
