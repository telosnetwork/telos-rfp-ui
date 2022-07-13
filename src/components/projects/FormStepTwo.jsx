import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { HeaderBack } from '@components/HeaderBack';
import { Timeline } from '@components/Timeline';
import Input from '@components/Input';
import { createDraftProjectService } from '@services/projects/createDraftProjectService';
import { updateProjectService } from '@services/projects/updateProjectService';
import { delay } from '@utils/delay';
import { projectStepTwoValidationSchema } from '@schemas/projectValidationSchema';

export function FormStepTwo({ isNew, setStep, data, setData, onDelete }) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(projectStepTwoValidationSchema),
    defaultValues: data,
  });

  useEffect(() => {
    reset(data);
  }, [reset, data]);

  async function onSubmit(formData) {
    let allData = {};
    setData((value) => {
      allData = { ...value, ...formData };
      return allData;
    });

    try {
      if (isNew) {
        await createDraftProjectService(allData);
      } else {
        await updateProjectService(allData);
      }

      delay(() => {
        router.push('/');
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HeaderBack href={() => setStep(1)}>
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
          Save As Draft
        </button>
      </HeaderBack>
      <Timeline />
      <div className="w-full max-w-xl mx-auto py-8 px-4">
        <div className="mb-8">
          <Input
            {...register('bond')}
            mask="tlos"
            inputMode="numeric"
            label="Proposal bond"
            support="Bonds will be required for any proposal submitted. Once the period of receiving proposals ends, you'll evaluate if there are any spam proposals. Proposals marked as spam won't have their bond returned. Bonds will be returned before the voting period to legitimate proposals."
            error={errors.bond?.message}
          />
        </div>
        <div className="mb-8">
          <Input
            {...register('proposing_days')}
            mask="positiveInteger"
            inputMode="numeric"
            label="Deadline"
            support="Defines the amount of days that the project will be accepting proposals from Project Managers from the time it's published."
            error={errors.proposing_days?.message}
          />
        </div>
        <div className="mb-8">
          <Input
            {...register('usd_rewarded')}
            label="Amount of USD to be rewarded"
            mask="usd"
            error={errors.usd_rewarded?.message}
          />
        </div>
        <div className="mb-8">
          <Input
            {...register('number_proposals_rewarded')}
            mask="positiveInteger"
            inputMode="numeric"
            label="How many proposals will be rewarded"
            error={errors.number_proposals_rewarded?.message}
          />
        </div>
        <div className="mb-8">
          <Input
            {...register('voting_days')}
            mask="positiveInteger"
            inputMode="numeric"
            label="Voting period (in days)"
            error={errors.voting_days?.message}
          />
        </div>
      </div>
    </form>
  );
}
