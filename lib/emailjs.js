import emailjs from '@emailjs/browser';

const SERVICE_ID      = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const WELCOME_ID      = import.meta.env.VITE_EMAILJS_WELCOME_TEMPLATE;
const NOTIFY_ID       = import.meta.env.VITE_EMAILJS_NOTIFY_TEMPLATE;
const PUBLIC_KEY      = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/**
 * Send a welcome / confirmation email when a user subscribes.
 * @param {string} name  - Subscriber display name (falls back to 'Friend')
 * @param {string} email - Subscriber email address
 */
export async function sendWelcomeEmail(name, email) {
  return emailjs.send(
    SERVICE_ID,
    WELCOME_ID,
    {
      subscriber_name:  name || 'Friend',
      subscriber_email: email,
    },
    PUBLIC_KEY
  );
}

/**
 * Send a newsletter notification email to ONE subscriber.
 * Call this in a loop (one per subscriber) with a small delay between sends.
 *
 * @param {Object} params
 * @param {string} params.subscriber_name
 * @param {string} params.subscriber_email
 * @param {string} params.newsletter_title
 * @param {string} params.scholar_name
 * @param {string} params.batch_year
 * @param {string} params.publish_date
 * @param {string} params.newsletter_url
 */
export async function sendNewsletterNotify(params) {
  return emailjs.send(SERVICE_ID, NOTIFY_ID, params, PUBLIC_KEY);
}
