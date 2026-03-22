import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

export async function POST(req: NextRequest) {
  try {
    const { amount, senderName, senderEmail, recipientName, recipientEmail, message } =
      await req.json();

    if (!amount || amount < 10 || amount > 500) {
      return NextResponse.json({ error: "Amount must be between $10 and $500." }, { status: 400 });
    }
    if (!senderEmail || !recipientEmail) {
      return NextResponse.json({ error: "Email addresses are required." }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // cents
      currency: "usd",
      metadata: {
        type: "gift_card",
        senderName,
        senderEmail,
        recipientName,
        recipientEmail,
        message: message || "",
      },
      receipt_email: senderEmail,
      description: `AZ Laundry Gift Card — $${amount}`,
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Payment failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
