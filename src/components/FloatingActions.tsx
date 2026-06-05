import { MessageCircle, Phone } from "lucide-react";

const PHONE = "919876543210";
const WHATSAPP_MSG = encodeURIComponent("Hi ShahiCrunch! I'd like to know more about your ice creams.");

export const FloatingActions = () => (
  <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
    <a
      href={`https://wa.me/${PHONE}?text=${WHATSAPP_MSG}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="h-14 w-14 rounded-full grid place-items-center bg-[#25D366] text-white shadow-gold hover:scale-110 transition-transform"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
    <a
      href={`tel:+${PHONE}`}
      aria-label="Call ShahiCrunch"
      className="h-14 w-14 rounded-full grid place-items-center bg-gradient-gold text-secondary shadow-gold hover:scale-110 transition-transform"
    >
      <Phone className="h-6 w-6" />
    </a>
  </div>
);
