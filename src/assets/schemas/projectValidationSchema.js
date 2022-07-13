import * as yup from 'yup';

export const projectStepOneValidationSchema = yup.object({
  title: yup.string().required('Project name is required'),

  github_url: yup
    .string()
    .required('Github repository link is required')
    .url('Github repository link must be a valid URL'),

  description: yup.string().required('Description Account is required'),

  pdf: yup
    .mixed()
    .test('pdf', 'Additional documentation is required', (value) => {
      return value.length > 0;
    })
    .test('pdf', 'Additional documentation must be a PDF file', (value) => {
      if (typeof value === 'string' || value.length === 0) {
        return true;
      }
      return value && value[0] && ['application/pdf'].includes(value[0].type);
    }),
});

export const projectStepTwoValidationSchema = yup.object({
  proposing_days: yup
    .number()
    .min(1, 'Deadline must be greater than or equal to 1')
    .required(),

  usd_rewarded: yup.string().required(),

  bond: yup.string().required(),

  number_proposals_rewarded: yup
    .number()
    .min(
      1,
      'The amount of proposals that will be rewarded must be greater than or equal to 1'
    )
    .required(),

  voting_days: yup
    .number()
    .min(1, 'Voting period must be greater than or equal to 1')
    .required(),
});
