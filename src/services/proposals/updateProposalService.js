import { telosWorks } from '@configs/telosConfig';
import { restoreSession } from '@services/anchorLinkService';

export async function updateProposalService({
  proposal_id,
  title,
  timeline,
  number_milestones,
  tech_qualifications_pdf,
  approach_pdf,
  cost_and_schedule_pdf,
  references_pdf,
  usd_amount,
  mockups_link,
  kanban_board_link,
}) {
  const { session } = await restoreSession();

  const response = await session.transact({
    actions: [
      {
        authorization: [session.auth],
        account: telosWorks.contractName,
        name: 'editproposal',
        data: {
          proposal_id,
          title,
          timeline,
          number_milestones,
          tech_qualifications_pdf,
          approach_pdf,
          cost_and_schedule_pdf,
          references_pdf,
          usd_amount,
          mockups_link,
          kanban_board_link,
        },
      },
    ],
  });

  return response;
}
