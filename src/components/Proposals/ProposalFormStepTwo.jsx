import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { HeaderBack } from '@components/HeaderBack';
import { UploadFile } from '@components/UploadFile';
import { Timeline } from '@components/Timeline';
import { proposalStepTwoValidationSchema } from '@schemas/proposalValidationSchema';
import { useProposalForm } from '@hooks/useProposalForm';
import { createProposalService } from '@services/proposals/createProposalService';
import { updateProposalService } from '@services/proposals/updateProposalService';
import { usd } from '@utils/masks';
import { delay } from '@utils/delay';
import IMask from 'imask';

export function ProposalFormStepTwo() {
  const router = useRouter();
  const {
    isNew,
    data,
    setData,
    disableForm,
    setDisableForm,
    onDelete,
    setSelectedStep,
    csvJson,
    bond,
    projectId,
    proposalId,
  } = useProposalForm();

  const {
    register,
    trigger,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(proposalStepTwoValidationSchema),
    defaultValues: data,
  });

  useEffect(() => {
    reset(data);
  }, [reset, data]);

  const onSubmit = useCallback(
    async (formData) => {
      let allData = {};
      setData((value) => {
        allData = { ...value, ...formData };
        return allData;
      });

      const {
        title,
        kanban_board_link,
        mockups_link,
        timeline,
        tech_qualifications_pdf,
        approach_pdf,
        cost_and_schedule_pdf,
        references_pdf,
      } = allData;

      setDisableForm(true);

      try {
        let usdAmount = data.usd_amount;
        let numberMilestones = data.number_milestones;
        if (csvJson.length > 0) {
          const amountReduced = csvJson.reduce((acc, cur) => {
            const amount = parseFloat(
              cur.amount.replace(',', '').replace('USD', '')
            );
            return acc + amount;
          }, 0);
          const masked = IMask.createMask(usd);
          usdAmount = masked.resolve(String(amountReduced));
          numberMilestones = csvJson.length;
        }

        const proposalData = {
          title,
          kanban_board_link,
          mockups_link,
          timeline,
          usd_amount: usdAmount,
          number_milestones: numberMilestones,
          tech_qualifications_pdf,
          approach_pdf,
          cost_and_schedule_pdf,
          references_pdf,
        };

        if (isNew) {
          await createProposalService({
            project_id: projectId,
            bond,
            ...proposalData,
          });
        } else {
          await updateProposalService({
            proposal_id: proposalId,
            ...proposalData,
          });
        }

        delay(() => {
          router.push(`/projects/${projectId}?tab=proposals`);
        });
      } catch (error) {
        console.log(JSON.parse(JSON.stringify(error)));
      }

      setDisableForm(false);
    },
    [
      data,
      csvJson,
      isNew,
      bond,
      projectId,
      proposalId,
      router,
      setDisableForm,
      setData,
    ]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HeaderBack href={() => setSelectedStep(1)}>
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
        <button
          type="submit"
          className="btn btn--primary"
          disabled={disableForm}
        >
          Submit
        </button>
      </HeaderBack>
      <Timeline />
      <div className="w-full max-w-xl mx-auto py-8 px-4">
        <div className="mb-8">
          <UploadFile
            name="tech_qualifications_pdf"
            register={register}
            trigger={trigger}
            setValue={setValue}
            onFile={(_, ipfs) =>
              setData((value) => ({ ...value, tech_qualifications_pdf: ipfs }))
            }
            label="Technical qualifications (PDF)"
            support="Show examples of similar projects that you or your company has successfully delivered."
            accept="application/pdf"
            error={errors.tech_qualifications_pdf?.message}
          />
        </div>
        <div className="mb-8">
          <UploadFile
            name="approach_pdf"
            register={register}
            trigger={trigger}
            setValue={setValue}
            onFile={(_, ipfs) =>
              setData((value) => ({ ...value, approach_pdf: ipfs }))
            }
            label="Approach (PDF)"
            support="Describe your approach to post-implementation support."
            accept="application/pdf"
            error={errors.approach_pdf?.message}
          />
        </div>
        <div className="mb-8">
          <UploadFile
            name="cost_and_schedule_pdf"
            register={register}
            trigger={trigger}
            setValue={setValue}
            onFile={(_, ipfs) =>
              setData((value) => ({ ...value, cost_and_schedule_pdf: ipfs }))
            }
            label="Solution cost and schedule (PDF)"
            support="Detail the payment schedule and include any milestones that may trigger a payment. Provide a rough estimate of the project schedule."
            accept="application/pdf"
            error={errors.cost_and_schedule_pdf?.message}
          />
        </div>
        <div className="mb-8">
          <UploadFile
            name="references_pdf"
            register={register}
            trigger={trigger}
            setValue={setValue}
            onFile={(_, ipfs) =>
              setData((value) => ({ ...value, references_pdf: ipfs }))
            }
            label="References (PDF)"
            support="Supply three references of customers to whom you provided similar solutions."
            accept="application/pdf"
            error={errors.references_pdf?.message}
          />
        </div>
      </div>
    </form>
  );
}
