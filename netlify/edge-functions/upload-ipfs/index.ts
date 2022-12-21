import { ValidationError, errors } from './error.ts';
import {
  validateMethod,
  validateOrigin,
  validatePDFFile,
} from './validation.ts';

import type { Context } from 'https://edge.netlify.com';
import { pinFile } from './pin_file.ts';

const handler = async (
  request: Request,
  { json }: Context
): Promise<Response> => {
  try {
    validateMethod(request);
    validateOrigin(request);

    const body = await request.formData();
    const file = body.get('file') as File | null;

    validatePDFFile(file);

    const ipfsHash = await pinFile(file as File);
    return json({ ipfsHash });
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
