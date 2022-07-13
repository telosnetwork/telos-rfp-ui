import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { HeaderBack } from '@components/HeaderBack';
import { BaseLayout } from '@layouts/BaseLayout';
import Input from '@components/Input';
import Textarea from '@components/Textarea';
import { UploadFile } from '@components/UploadFile';
import { deleteFile } from '@services/pinataService';
import { createReportService } from '@services/milestones/createReportService';
import { reportValidationSchema } from '@schemas/reportValidationSchema';
import { delay } from '@utils/delay';

export default function CreateReport({ projectId, milestoneId }) {
  const router = useRouter();
  const [disableForm, setDisableForm] = useState(false);

  const {
    register,
    trigger,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(reportValidationSchema),
  });

  async function onSubmit({ title, description, document }) {
    setDisableForm(true);

    try {
      await createReportService({
        projectId,
        milestoneId,
        title,
        description,
        document,
      });

      delay(() => {
        router.push(`/projects/${projectId}?tab=progress`);
      });
    } catch (error) {
      console.log(error);
    }

    setDisableForm(false);
  }

  async function onBack() {
    if (typeof getValues('document') === 'string') {
      await deleteFile(getValues('document'));
    }
    router.back();
  }

  return (
    <>
      <Head>
        <title>Telos Build - Create Report</title>
      </Head>
      <form onSubmit={handleSubmit(onSubmit)}>
        <HeaderBack href={onBack}>
          <button
            type="submit"
            className="btn btn--primary"
            disabled={disableForm}
          >
            Submit
          </button>
        </HeaderBack>
        <div className="w-full max-w-xl mx-auto py-8 px-4">
          <div className="mb-8">
            <Input
              {...register('title')}
              label="Title"
              error={errors.title?.message}
            />
          </div>
          <div className="mb-8">
            <Textarea
              {...register('description')}
              label="Description"
              error={errors.description?.message}
            />
          </div>
          <div className="mb-8">
            <UploadFile
              name="document"
              register={register}
              trigger={trigger}
              setValue={setValue}
              label="Documents (PDF)"
              accept="application/pdf"
              error={errors.document?.message}
            />
          </div>
        </div>
      </form>
    </>
  );
}

CreateReport.getLayout = function getLayout(page) {
  return <BaseLayout>{page}</BaseLayout>;
};

export async function getServerSideProps(context) {
  const {
    id: [projectId, milestoneId],
  } = context.query;

  return {
    props: {
      projectId,
      milestoneId,
    },
  };
}
