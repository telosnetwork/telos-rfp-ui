import { ValidationError, errors } from './error.ts';

export function validateMethod(request: Request) {
  if (request.method.toUpperCase() != 'DELETE') {
    console.error(`Tried to reach the function using ${request.method} method`);

    throw new ValidationError(
      errors.methodNotAllowed.message,
      errors.methodNotAllowed.status
    );
  }
}

export function validateOrigin(request: Request) {
  const origin =
    request.headers.get('origin') || request.headers.get('referer');
  const originDomain = origin ? new URL(origin).hostname : null;

  if (!originDomain) {
    console.error(`Origin different from the expected: ${originDomain}`);

    throw new ValidationError(
      errors.notAuthorizedResponse.message,
      errors.notAuthorizedResponse.status
    );
  }
}

export function validateIpfs(ipfs: string | null) {
  if (!ipfs) {
    throw new ValidationError(
      errors.requiredIpfs.message,
      errors.requiredIpfs.status
    );
  }
}
