import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).send({ message: 'Only DELETE requests allowed' });
  }

  const { ipfs } = req.query;

  if (!ipfs) {
    res.status(400).json({ message: 'IPFS is required' });
  }

  await axios.delete(`https://api.pinata.cloud/pinning/unpin/${ipfs}`, {
    headers: {
      Authorization: `Bearer ${process.env.PINATA_JWT}`,
    },
  });

  return res.status(200).json({ message: 'Success' });
}
