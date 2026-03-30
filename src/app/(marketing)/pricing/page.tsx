import type { Metadata } from 'next'
import { AnimateIn } from '@/components/shared/animate-in'
import { PricingPlans } from '@/components/marketing/pricing-plans'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export const metadata: Metadata = {
  title: 'Pricing · Aesthetica',
  description:
    'Simple, transparent pricing for independent esthetics students and Virginia schools managing cohorts.',
}

const faqs = [
  {
    value: 'item-1',
    question: 'Is Aesthetica approved by Virginia DPOR?',
    answer:
      "Aesthetica's curriculum is aligned with Virginia DPOR (18VAC41-70) esthetics regulations. Schools using the platform are responsible for maintaining their state approval status.",
  },
  {
    value: 'item-2',
    question: 'Can I enroll without going through a school?',
    answer:
      'Yes. Students can enroll directly through our B2C plan and complete theory content independently, then partner with a VA-approved practical training provider.',
  },
  {
    value: 'item-3',
    question: 'How are hours tracked?',
    answer:
      'Hours are tracked automatically as you watch videos and complete reading content. Manual clock-in is available for self-study. All sessions are logged and verifiable by your instructor.',
  },
  {
    value: 'item-4',
    question: 'What happens when I finish?',
    answer:
      "You'll receive a DPOR-formatted hour report documenting all your verified theory hours, ready to submit with your licensing application.",
  },
  {
    value: 'item-5',
    question: 'Can my school switch from Milady CIMA?',
    answer:
      'Yes. We offer a straightforward migration path. Contact our schools team to discuss enrollment transfer and content mapping.',
  },
]

export default function PricingPage() {
  return (
    <main className="bg-[#FBFBFD] px-5 pt-24 pb-24 text-[#1D1D1F] md:pb-32">
      <section className="py-32 text-center">
        <AnimateIn className="mx-auto max-w-3xl" delay={80}>
          <p className="text-xs font-medium tracking-[0.08em] text-[#6E6E73] uppercase">Simple, transparent pricing</p>
          <h1 className="font-display mt-6 text-[52px] leading-none font-light tracking-[-0.02em] md:text-[80px]">
            Choose your path.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[19px] leading-relaxed text-[#6E6E73]">
            Whether you&apos;re a student learning solo or a school managing a cohort — Aesthetica scales with
            you.
          </p>

          <PricingPlans />
        </AnimateIn>
      </section>

      <section className="mx-auto mt-24 max-w-2xl">
        <AnimateIn delay={80}>
          <h2 className="text-center text-4xl font-semibold tracking-tight text-[#1D1D1F]">Frequently asked questions</h2>

          <Accordion className="mt-10 rounded-3xl bg-white p-6 shadow-sm md:p-8">
            {faqs.map((faq) => (
              <AccordionItem key={faq.value} value={faq.value} className="border-[#D2D2D7]">
                <AccordionTrigger className="py-4 text-base font-medium text-[#1D1D1F] hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-[15px] leading-relaxed text-[#6E6E73]">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimateIn>
      </section>
    </main>
  )
}
