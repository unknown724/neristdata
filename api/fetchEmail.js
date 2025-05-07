export default async function handler(req, res) {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: 'Email ID is required' });
  }

  try {
    const response = await fetch(`https://nerist.symphonyx.in/login/verify/emailId?emailId=${encodeURIComponent(email)}&instituteId=1`, {
      method: 'GET',
      headers: {
        'Authorization': process.env.JWT_TOKEN,
        'Accept': 'application/json',
        'User-Agent': 'NeristTerminal/1.0'
      }
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Server Error', details: error.message });
  }
}
