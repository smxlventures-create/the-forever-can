function parseBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string' && req.body) {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return {};
}

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const body = parseBody(req);
  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim();
  const shipping = String(body.shipping || '').trim();
  const message = String(body.message || '').trim();
  const items = Array.isArray(body.items) ? body.items : [];

  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ ok: false, error: 'Name and a valid email are required.' });
  }

  console.log(
    JSON.stringify({
      type: 'forever-can-inquiry',
      name,
      email,
      shipping,
      message,
      items,
      at: new Date().toISOString()
    })
  );

  return res.status(200).json({
    ok: true,
    message: 'Inquiry received. Purchase still completes on Etsy unless the studio follows up directly.'
  });
}
