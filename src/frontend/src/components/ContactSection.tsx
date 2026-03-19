import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useSubmitContact } from "../hooks/useQueries";
import { useReveal } from "../hooks/useReveal";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const submitContact = useSubmitContact();
  const leftRef = useReveal();
  const rightRef = useReveal();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitContact.mutateAsync(form);
      setSubmitted(true);
      toast.success("Message sent! We'll be in touch soon.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#F5F0EA]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest-xl text-warm-gray mb-3 font-sans">
            Get in Touch
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light uppercase tracking-wide-lg text-off-black mb-4">
            Contact
          </h2>
          <p className="text-warm-gray font-sans font-light">
            We would love to hear from you
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Left: contact info */}
          <div ref={leftRef} className="reveal space-y-8">
            <div className="flex gap-4">
              <MapPin size={18} className="text-taupe flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs uppercase tracking-widest-xl text-off-black mb-1 font-sans">
                  Store
                </p>
                <p className="text-warm-gray font-sans font-light text-sm">
                  Galleria DLF IV, Sector 27, Gurgaon, Haryana, India
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Phone size={18} className="text-taupe flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs uppercase tracking-widest-xl text-off-black mb-1 font-sans">
                  Phone
                </p>
                <a
                  href="tel:+919368045151"
                  className="text-warm-gray font-sans font-light text-sm hover:text-off-black transition-colors"
                >
                  +91 93680 45151
                </a>
              </div>
            </div>
            <div className="flex gap-4">
              <Mail size={18} className="text-taupe flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs uppercase tracking-widest-xl text-off-black mb-1 font-sans">
                  Email
                </p>
                <a
                  href="mailto:labelradhikachandna@gmail.com"
                  className="text-warm-gray font-sans font-light text-sm hover:text-off-black transition-colors"
                >
                  labelradhikachandna@gmail.com
                </a>
              </div>
            </div>
            <div className="flex gap-4">
              <Clock size={18} className="text-taupe flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs uppercase tracking-widest-xl text-off-black mb-1 font-sans">
                  Hours
                </p>
                <p className="text-warm-gray font-sans font-light text-sm">
                  Monday – Saturday: 10:00 AM – 8:00 PM
                </p>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              data-ocid="contact.whatsapp.button"
              href="https://wa.me/919368045151"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] text-white text-xs uppercase tracking-widest-xl px-6 py-4 rounded-pill hover:bg-[#20c45c] transition-colors font-sans"
            >
              <MessageCircle size={16} />
              Chat on WhatsApp
            </a>
          </div>

          {/* Right: contact form */}
          <div ref={rightRef} className="reveal">
            {submitted ? (
              <div
                data-ocid="contact.success_state"
                className="text-center py-16"
              >
                <div className="font-display text-3xl font-light text-off-black mb-4">
                  Thank You
                </div>
                <p className="text-warm-gray font-sans font-light">
                  Your message has been received. We'll get back to you within
                  24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs uppercase tracking-widest-xl text-off-black mb-2 font-sans"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    data-ocid="contact.name.input"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full border border-warm-border bg-white px-4 py-3 text-sm text-off-black placeholder:text-warm-gray focus:outline-none focus:border-taupe transition-colors font-sans"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs uppercase tracking-widest-xl text-off-black mb-2 font-sans"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    data-ocid="contact.email.input"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, email: e.target.value }))
                    }
                    className="w-full border border-warm-border bg-white px-4 py-3 text-sm text-off-black placeholder:text-warm-gray focus:outline-none focus:border-taupe transition-colors font-sans"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-phone"
                    className="block text-xs uppercase tracking-widest-xl text-off-black mb-2 font-sans"
                  >
                    Phone
                  </label>
                  <input
                    id="contact-phone"
                    data-ocid="contact.phone.input"
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, phone: e.target.value }))
                    }
                    className="w-full border border-warm-border bg-white px-4 py-3 text-sm text-off-black placeholder:text-warm-gray focus:outline-none focus:border-taupe transition-colors font-sans"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs uppercase tracking-widest-xl text-off-black mb-2 font-sans"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    data-ocid="contact.message.textarea"
                    rows={4}
                    value={form.message}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, message: e.target.value }))
                    }
                    className="w-full border border-warm-border bg-white px-4 py-3 text-sm text-off-black placeholder:text-warm-gray focus:outline-none focus:border-taupe transition-colors font-sans resize-none"
                    placeholder="Tell us how we can help..."
                  />
                </div>
                <button
                  data-ocid="contact.submit_button"
                  type="submit"
                  disabled={submitContact.isPending}
                  className="w-full bg-off-black text-white text-xs uppercase tracking-widest-xl py-4 hover:bg-taupe transition-colors duration-400 font-sans disabled:opacity-60"
                >
                  {submitContact.isPending ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
