import formidable from 'formidable';

export function formidablePromise(req) {
  return new Promise((resolve, reject) => {
    const form = formidable();

    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err);
      }
      return resolve({ ...fields, ...files });
    });
  });
}
