import { Resend } from 'resend';

const resend = new Resend('re_jKE7twFF_8mDxZ9btJVmQN8kFYyq7ZMSk');

async function test() {
  const response = await resend.emails.send({
    from: 'Assurgit <noreply@assurgit.com>',
    to: 'asa@assurgit.com',
    subject: '🚀 Assurgit Test Email',
    html: `
      <h1>It works</h1>
      <p>This is your first test email.</p>
    `,
  });

  console.log(response);
}

test();