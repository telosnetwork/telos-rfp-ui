import { telosWorks } from '@configs/telosConfig';
import { restoreSession } from '@services/anchorLinkService';

export async function chooseProposalService({ projectId, proposalId }) {
  const { session } = await restoreSession();

  const response = await session.transact({
    actions: [
      {
        authorization: [session.auth],
        account: telosWorks.contractName,
        name: 'endvoting',
        data: {
          project_id: projectId,
        },
      },
      {
        authorization: [session.auth],
        account: telosWorks.contractName,
        name: 'pickproposal',
        data: {
          project_id: projectId,
          proposal_id: proposalId,
        },
      },
      {
        authorization: [session.auth],
        account: telosWorks.contractName,
        name: 'startproject',
        data: {
          project_id: projectId,
        },
      },
    ],
  });

  return response;
}
