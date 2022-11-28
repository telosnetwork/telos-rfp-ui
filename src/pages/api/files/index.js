import fs from 'fs/promises';
import { Readable } from 'stream';
import FormData from 'form-data';
import axios from 'axios';
import { formidablePromise } from '@utils/formidablePromise';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed' });
  }

  const { file } = await formidablePromise(req);

  if (!file) {
    return res.status(400).send({ message: 'File is required' });
  }

  const buffer = await fs.readFile(file.filepath);
  const stream = Readable.from(buffer);

  const formData = new FormData();
  formData.append('file', stream, {
    filepath: file.originalFilename,
  });

  const { data } = await axios.post(
    'https://api.pinata.cloud/pinning/pinFileToIPFS',
    formData,
    {
      maxBodyLength: 'Infinity',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        Authorization: `Bearer ${process.env.PINATA_JWT}`,
      },
    }
  );

  return res.status(200).json({ ipfsHash: data.IpfsHash });
}
