import { ChevronDown } from "lucide-react";
import { faqItems } from "@/lib/site";

export function Faq() {
  return (
    <section className="block" id="faq" aria-labelledby="faq-title">
      <div className="container narrow">
        <h2 className="h2 center reveal" id="faq-title">Frequently asked questions.</h2>
        <div className="faq-list reveal">
          {faqItems.map((item, idx) => (
            <details key={idx} className="faq-item" open={idx === 0}>
              <summary className="faq-question">
                <span>{item.q}</span>
                <ChevronDown className="faq-icon" size={18} aria-hidden />
              </summary>
              <div className="faq-answer">
                <p>{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
