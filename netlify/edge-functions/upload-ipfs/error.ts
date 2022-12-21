export class ValidationError extends Error {
  statusCode: number;

  constructor(message: string, statusCode?: number) {
    super(message);
    this.statusCode = statusCode || 400;
  }
}

export const errors = {
  notAuthorizedResponse: {
    status: 403,
    message: 'Not authorized',
  },
  methodNotAllowed: {
    status: 405,
    message: 'Method not allowed',
  },
  fileNotFound: {
    status: 422,
    message: 'No file sent',
  },
  contentTypeDifferentAllowed: {
    status: 422,
    message: 'Only PDF files are allowed',
  },
  fileSizeOverflow: {
    status: 422,
    message: 'PDF file is bigger than {MAX_SIZE} Mb',
  },
  pinningFail: {
    status: 400,
    message:
      'There was an error uploading your file. Please contact the Telos admin.',
  },
  notMappedErr: {
    status: 500,
    message: 'Error',
  },
};
