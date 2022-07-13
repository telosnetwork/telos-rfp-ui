import * as yup from 'yup';

export const reportValidationSchema = yup.object({
  title: yup.string().required('Title is required'),

  description: yup.string().required('Description is required'),

  document: yup
    .mixed()
    .test('documentFormat', 'Document must be a PDF file', (value) => {
      if (typeof value === 'string' || value.length === 0) {
        return true;
      }
      return value && value[0] && ['application/pdf'].includes(value[0].type);
    }),
});
