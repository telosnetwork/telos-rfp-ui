import { ValidationError, errors } from './error.ts';

export const unpinFile = async (ipfs: string): Promise<void> => {
  try {
    const res = await fetch(`https://api.pinata.cloud/pinning/unpin/${ipfs}`, {
      method: 'post',
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
  } catch (error) {
    console.log(error);

    throw error;
  }
};
