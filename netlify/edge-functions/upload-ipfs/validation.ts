import { ValidationError, errors } from './error.ts';

export function validateMethod(request: Request) {
  if (request.method.toUpperCase() != 'POST') {
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

export function validatePDFFile(file: File | null) {
  if (!file) {
    console.debug('No file sent');

    throw new ValidationError(
      errors.fileNotFound.message,
      errors.fileNotFound.status
    );
  }

  const contentType = (file as File).type;

  if (!contentType.includes('application/pdf')) {
    throw new ValidationError(
      errors.contentTypeDifferentAllowed.message,
      errors.contentTypeDifferentAllowed.status
    );
  }

  const fileSize = file.size / 1e6;
  const defaultMaxSize = '100';
  const maxFileSize = parseInt(
    Deno.env.get('FILE_MAX_SIZE') || defaultMaxSize,
    10
  );

  if (fileSize > maxFileSize) {
    throw new ValidationError(
      errors.fileSizeOverflow.message.replace(
        '{MAX_SIZE}',
        maxFileSize.toString()
      ),
      errors.fileSizeOverflow.status
    );
  }
}
