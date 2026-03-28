'use client';

import { useState } from 'react';

interface FaqItem {
  q: string;
  a: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="space-y-3">
      {items.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={faq.q}
            className={`border rounded-xl overflow-hidden transition-colors duration-300 ${
              isOpen
                ? 'border-[#C8A96E]/40 border-l-2 border-l-[#C8A96E]'
                : 'border-white/8 hover:border-white/15'
            }`}
            style={{ background: 'rgba(20, 20, 20, 0.6)' }}
          >
            <button
              type="button"
              onClick={() => toggle(idx)}
              className="w-full flex items-center justify-between px-6 py-5 text-left gap-4 group"
              aria-expanded={isOpen}
              id={`faq-question-${idx}`}
              aria-controls={`faq-answer-${idx}`}
            >
              <span
                className={`font-semibold font-body text-sm md:text-base transition-colors duration-200 ${
                  isOpen ? 'text-[#EDEDED]' : 'text-[#AAAAAA] group-hover:text-[#EDEDED]'
                }`}
              >
                {faq.q}
              </span>
              <span
                className={`shrink-0 w-5 h-5 flex items-center justify-center rounded-full border transition-all duration-300 ${
                  isOpen
                    ? 'border-[#C8A96E] text-[#C8A96E] rotate-45'
                    : 'border-white/20 text-white/40 rotate-0'
                }`}
                aria-hidden="true"
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 1V9M1 5H9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </button>

            <div
              id={`faq-answer-${idx}`}
              role="region"
              aria-labelledby={`faq-question-${idx}`}
              className="overflow-hidden transition-all duration-400 ease-in-out"
              style={{
                maxHeight: isOpen ? '500px' : '0px',
                transition: 'max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <p className="px-6 pb-5 text-sm leading-relaxed text-[#8A8A8A] font-body border-t border-white/5 pt-4">
                {faq.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
