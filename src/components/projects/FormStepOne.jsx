import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import { HeaderBack } from '@components/HeaderBack';
import Input from '@components/Input';
import Textarea from '@components/Textarea';
import { Timeline } from '@components/Timeline';
import { UploadFile } from '@components/UploadFile';
import { projectStepOneValidationSchema } from '@schemas/projectValidationSchema';
import { deleteFileService } from '@services/files/deleteFileService';

export function FormStepOne({ isNew, setStep, data, setData, onDelete }) {
  const router = useRouter();

  const {
    register,
    trigger,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(projectStepOneValidationSchema),
    defaultValues: data,
  });

  useEffect(() => {
    reset(data);
  }, [reset, data]);

  function onSubmit(formData) {
    setStep(2);
    let allData = {};
    setData((value) => {
      allData = { ...value, ...formData };
      return allData;
    });
  }

  async function onBack() {
    if (isNew && typeof getValues('pdf') === 'string') {
      await deleteFileService(getValues('pdf'));
    }
    router.push('/');
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HeaderBack href={onBack}>
        {!isNew && (
          <button
            type="button"
            className="btn btn--tertiary mr-2"
            onClick={onDelete}
          >
            Delete
          </button>
        )}
        <button type="submit" className="btn btn--primary">
          Next
        </button>
      </HeaderBack>
      <Timeline afterWidth="after:w-1/2" />
      <div className="w-full max-w-xl mx-auto py-8 px-4">
        <div className="mb-8">
          <Input
            {...register('title')}
            label="Project name"
            error={errors.title?.message}
          />
        </div>
        <div className="mb-8">
          <Input
            {...register('github_url')}
            label="Github repository link"
            error={errors.github_url?.message}
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
            name="pdf"
            register={register}
            trigger={trigger}
            setValue={setValue}
            onFile={(_, ipfs) => setData((value) => ({ ...value, pdf: ipfs }))}
            label="Additional documentation (PDF)"
            support="E.g. business requirements, technical requirements, performance and extensibility requirements, deployment and maintenance requirements"
            accept="application/pdf"
            error={errors.pdf?.message}
          />
        </div>
      </div>
    </form>
  );
}
