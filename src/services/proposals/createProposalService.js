import { telosWorks } from '@configs/telosConfig';
import { restoreSession } from '@services/anchorLinkService';

export async function createProposalService({
  bond,
  project_id,
  title,
  number_milestones,
  timeline,
  tech_qualifications_pdf,
  approach_pdf,
  cost_and_schedule_pdf,
  references_pdf,
  usd_amount,
  mockups_link,
  kanban_board_link,
}) {
  const { session, user } = await restoreSession();

  let transferAction = [];
  if (Number(bond.replace('TLOS', ''))) {
    transferAction = [
      {
        account: 'eosio.token',
        name: 'transfer',
        authorization: [session.auth],
        data: {
          from: user,
          to: telosWorks.contractName,
          quantity: bond,
          memo: '',
        },
      },
    ];
  }

  const response = await session.transact({
    actions: [
      ...transferAction,
      {
        authorization: [session.auth],
        account: telosWorks.contractName,
        name: 'newproposal',
        data: {
          project_id,
          proposer: user,
          title,
          number_milestones,
          timeline,
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
