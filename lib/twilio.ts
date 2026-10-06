import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID || '';
const authToken = process.env.TWILIO_AUTH_TOKEN || '';
const fromNumber = process.env.TWILIO_FROM_NUMBER || '';

let client: any = null;

if (accountSid && authToken) {
  client = twilio(accountSid, authToken);
}

export async function sendOtpSms(contact: string, otp: string) {
  if (!client) {
    console.warn('Twilio not configured. Skipping SMS.');
    return true; // Allow demo mode
  }

  try {
    await client.messages.create({
      body: `Your House of Rhody verification code is: ${otp}. Valid for 5 minutes.`,
      from: fromNumber,
      to: contact,
    });
    return true;
  } catch (error) {
    console.error('SMS send failed:', error);
    return false;
  }
}
