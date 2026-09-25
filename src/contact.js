import './styles.css';
import './site-shell.js';

const form = document.querySelector('#contact-form');
const status = document.querySelector('.form-status');

form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  status.textContent = 'Sending…';
  try {
    const response = await fetch('/api/inquire', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, items: [] })
    });
    if (!response.ok) throw new Error('request failed');
    status.textContent = 'Message sent. We will write back.';
    form.reset();
  } catch {
    const subject = encodeURIComponent(data.subject || 'Forever Can note');
    const body = encodeURIComponent(`${data.name}\n${data.email}\n${data.shipping || ''}\n\n${data.message}`);
    window.location.href = `mailto:hello@theforevercan.com?subject=${subject}&body=${body}`;
  }
});
