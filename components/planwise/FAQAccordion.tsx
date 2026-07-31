'use client';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import type { FaqItem } from '@/lib/content';

interface Props { items: FaqItem[] }

export default function FAQAccordion({ items }: Props) {
  return (
    <Accordion.Root type="single" collapsible className="space-y-3">
      {items.map((item, i) => {
        return (
          <Accordion.Item
            key={i}
            value={`item-${i}`}
            className="rounded-xl border border-navy/10 bg-white overflow-hidden shadow-sm transition-shadow hover:shadow-md"
          >
            <Accordion.Header>
              <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 p-5 text-left text-lg text-navy font-semibold hover:bg-navy/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-inset">
                <span>{item.question}</span>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-navy/5 text-navy transition-transform duration-200 group-data-[state=open]:rotate-180">
                  <ChevronDown className="w-4 h-4" aria-hidden="true" />
                </span>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
              <div className="px-5 pb-5 text-lg text-navy/90 leading-relaxed">{item.answer}</div>
            </Accordion.Content>
          </Accordion.Item>
        );
      })}
    </Accordion.Root>
  );
}
