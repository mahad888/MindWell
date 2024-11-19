import twilio from 'twilio';

export const sendSMS = async (to) => {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);
    
    try {
        const message = await client.messages.create({
        body: 'Your appointment has been confirmed!',
        from: process.env.TWILIO_PHONE_NUMBER,
        to:process.env.MINDWELL_PHONE_NUMBER,
        });
    
        console.log('Message sent:', message.sid);
        return message;
    } catch (error) {
        console.error('Error sending SMS:', error);
        return null;
    }
    }