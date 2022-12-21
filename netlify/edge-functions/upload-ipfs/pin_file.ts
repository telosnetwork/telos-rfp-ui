import { ValidationError, errors } from './error.ts';

export const pinFile = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append(
    'pinataMetadata',
    JSON.stringify({
      name: file.name,
    })
  );
  formData.append(
    'pinataOptions',
    JSON.stringify({
      cidVersion: 0,
    })
  );

  try {
    const res = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'post',
      body: formData,
      headers: {
        pinata_api_key: Deno.env.get('PINATA_API_KEY') as string,
        pinata_secret_api_key: Deno.env.get('PINATA_SECRET_KEY') as string,
      },
    });

    if (res.status > 201) {
      console.log(`Pinata returned err status code: ${res.status}`);

      throw new ValidationError(
        errors.notAuthorizedResponse.message,
        errors.notAuthorizedResponse.status
      );
    }

    const jsonBody: PinFileToIPFS = await res.json();

    return jsonBody.IpfsHash;
  } catch (error) {
    console.log(error);

    throw error;
  }
};

export interface PinFileToIPFS {
  // This is the IPFS multi-hash provided back for your content
  IpfsHash: string;
  // This is how large (in bytes) the content you just pinned is
  PinSize: string;
  // This is the timestamp for your content pinning (represented in ISO 8601 format)
  Timestamp: string;
}
