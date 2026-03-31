import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia',
  typescript: true,
})

// Price ID lookup by plan key — use lookup_key on Stripe for flexibility
export const PRICE_IDS = {
  b2c_monthly:     process.env.STRIPE_PRICE_B2C_MONTHLY!,
  b2c_annual:      process.env.STRIPE_PRICE_B2C_ANNUAL!,
  school_starter:  process.env.STRIPE_PRICE_SCHOOL_STARTER!,
  school_growth:   process.env.STRIPE_PRICE_SCHOOL_GROWTH!,
  ce_pass_annual:  process.env.STRIPE_PRICE_CE_PASS_ANNUAL!,
} as const

export type PlanKey = keyof typeof PRICE_IDS
