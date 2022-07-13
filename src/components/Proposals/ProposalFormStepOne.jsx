import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { FiFile } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import csvToJson from 'csvtojson';
import { yupResolver } from '@hookform/resolvers/yup';
import { HeaderBack } from '@components/HeaderBack';
import Input from '@components/Input';
import { UploadFile } from '@components/UploadFile';
import { Timeline } from '@components/Timeline';
import { proposalStepOneValidationSchema } from '@schemas/proposalValidationSchema';
import { useProposalForm } from '@hooks/useProposalForm';

export function ProposalFormStepOne() {
  const router = useRouter();
  const {
    isNew,
    data,
    setData,
    disableForm,
    onDelete,
    deleteFiles,
    setSelectedStep,
    setDisableForm,
    setCsvJson,
  } = useProposalForm();

  const {
    register,
    trigger,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(proposalStepOneValidationSchema),
    defaultValues: data,
  });

  useEffect(() => {
    reset(data);
  }, [reset, data]);

  const handleCSV = useCallback(
    async (file, ipfs) => {
      setDisableForm(true);
      setData((value) => ({ ...value, timeline: ipfs }));
      if (!file) {
        setCsvJson([]);
        return;
      }
      const csvString = await file.text();
      const result = await csvToJson().fromString(csvString);
      setCsvJson(result);
      setDisableForm(false);
    },
    [setCsvJson, setDisableForm, setData]
  );

  const onSubmit = useCallback(
    (formData) => {
      setSelectedStep(2);

      let allData = {};
      setData((value) => {
        allData = { ...value, ...formData };
        return allData;
      });
    },
    [setData, setSelectedStep]
  );

  async function onBack() {
    if (isNew) {
      await deleteFiles();
    }
    router.back();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HeaderBack href={onBack}>
        {!isNew && (
          <button
            type="button"
            className="btn btn--tertiary mr-2"
            onClick={onDelete}
            disabled={disableForm}
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
            label="Title"
            error={errors.title?.message}
          />
        </div>
        <div className="mb-8">
          <Input
            {...register('mockups_link')}
            label="Mockups link"
            error={errors.mockups_link?.message}
          />
        </div>
        <div className="mb-8">
          <Input
            {...register('kanban_board_link')}
            label="Kanban board link"
            error={errors.kanban_board_link?.message}
          />
        </div>
        <div className="mb-8">
          <UploadFile
            name="timeline"
            register={register}
            trigger={trigger}
            setValue={setValue}
            label="Timeline (CSV)"
            accept="text/csv"
            onFile={handleCSV}
            error={errors.timeline?.message}
          />
          <a
            href="/examples/timeline.csv"
            target="_blank"
            className="cursor-pointer inline-flex py-3 md:hover:underline mt-4"
          >
            <FiFile size={20} />
            <span className="ml-2 text-sm font-medium text-white">
              Download timeline example
            </span>
          </a>
        </div>
      </div>
    </form>
  );
}
