import * as yup from 'yup';
import csvToJson from 'csvtojson';
import { isArraysEqual } from '@utils/isArraysEqual';

export const proposalStepOneValidationSchema = yup.object({
  title: yup.string().required(),

  mockups_link: yup
    .string()
    .required('Mockup link is required')
    .url('Mockup link must be a valid URL'),

  kanban_board_link: yup
    .string()
    .required('Kanban board link is required')
    .url('Kanban board link must be a valid URL'),

  timeline: yup
    .mixed()
    .test('timelineRequired', 'Timeline file is required', (value) => {
      return value.length > 0;
    })
    .test('timelineFormat', 'Timeline must be a CSV file', (value) => {
      if (typeof value === 'string' || value.length === 0) {
        return true;
      }
      return value && value[0] && ['text/csv'].includes(value[0].type);
    })
    .test(
      'timelineCSV',
      'CSV Timeline must be "days", "amount", "title", "description"',
      async (value) => {
        if (typeof value === 'string' || value.length === 0) {
          return true;
        }
        const csvString = await value[0].text();
        const csvJson = await csvToJson().fromString(csvString);
        if (csvJson.length === 0) {
          return false;
        }
        const csvHeader = ['days', 'amount', 'title', 'description'];
        const csvKeys = Object.keys(csvJson[0]);
        return (
          csvHeader.length === csvKeys.length &&
          isArraysEqual(csvHeader, csvKeys)
        );
      }
    ),
});

export const proposalStepTwoValidationSchema = yup.object({
  tech_qualifications_pdf: yup
    .mixed()
    .test(
      'techQualificationsPdfRequired',
      'Tech qualifications is required',
      (value) => {
        return value.length > 0;
      }
    )
    .test(
      'techQualificationsPdfFormat',
      'Tech qualifications must be a PDF file',
      (value) => {
        if (typeof value === 'string' || value.length === 0) {
          return true;
        }
        return value && value[0] && ['application/pdf'].includes(value[0].type);
      }
    ),

  approach_pdf: yup
    .mixed()
    .test('approachPdfRequired', 'Approach is required', (value) => {
      return value.length > 0;
    })
    .test('approachPdfFormat', 'Approach must be a PDF file', (value) => {
      if (typeof value === 'string' || value.length === 0) {
        return true;
      }
      return value && value[0] && ['application/pdf'].includes(value[0].type);
    }),

  cost_and_schedule_pdf: yup
    .mixed()
    .test(
      'costAndSchedulePdfRequired',
      'Cost and schedule is required',
      (value) => {
        return value.length > 0;
      }
    )
    .test(
      'costAndSchedulePdfFormat',
      'Cost and schedule must be a PDF file',
      (value) => {
        if (typeof value === 'string' || value.length === 0) {
          return true;
        }
        return value && value[0] && ['application/pdf'].includes(value[0].type);
      }
    ),

  references_pdf: yup
    .mixed()
    .test('referencesPdfRequired', 'References is required', (value) => {
      return value.length > 0;
    })
    .test('referencesPdfFormat', 'References must be a PDF file', (value) => {
      if (typeof value === 'string' || value.length === 0) {
        return true;
      }
      return value && value[0] && ['application/pdf'].includes(value[0].type);
    }),
});
