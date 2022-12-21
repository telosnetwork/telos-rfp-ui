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
  requiredIpfs: {
    status: 422,
    message: 'IPFS is required',
  },
  unpinningFail: {
    status: 400,
    message:
      'There was an error unpinning your file. Please contact the Telos admin.',
  },
  notMappedErr: {
    status: 500,
    message: 'Error',
  },
};
