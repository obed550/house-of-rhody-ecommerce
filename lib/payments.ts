export function getPaystackConfig() {
  return {
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || 'pk_test_demo',
    secretKey: process.env.PAYSTACK_SECRET_KEY || 'sk_test_demo',
  };
}

export async function initializePaystackPayment(email: string, amount: number, reference: string) {
  const config = getPaystackConfig();

  const response = await fetch('https://api.paystack.co/transaction/initialize', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.secretKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      amount: amount * 100, // Convert to kobo
      reference,
    }),
  });

  return response.json();
}

export async function verifyPaystackPayment(reference: string) {
  const config = getPaystackConfig();

  const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${config.secretKey}`,
    },
  });

  return response.json();
}
