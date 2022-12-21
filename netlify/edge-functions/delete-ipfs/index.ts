import { ValidationError, errors } from './error.ts';
import { validateIpfs, validateMethod, validateOrigin } from './validation.ts';

import type { Context } from 'https://edge.netlify.com';
import { unpinFile } from './delete_file.ts';

const handler = async (
  request: Request,
  { json }: Context
): Promise<Response> => {
  try {
    validateMethod(request);
    validateOrigin(request);

    const url = new URL(request.url);
    const ipfs = url.searchParams.get('ipfs');

    validateIpfs(ipfs);

    await unpinFile(ipfs as string);
    return new Response(null, {
      status: 204,
    });
  } catch (e) {
    if (e instanceof ValidationError) {
      return json(
        { error: e.message },
        {
          status: e.statusCode,
        }
      );
    }

    console.error('Not mapped error', e);

    return json(
      { error: errors.notMappedErr.message },
      { status: errors.notMappedErr.status }
    );
  }
};

export default handler;
