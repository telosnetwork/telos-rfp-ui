import { telosWorks } from '@configs/telosConfig';
import { restoreSession } from '@services/anchorLinkService';

export async function removeProposalService({ proposalId }) {
  const { session } = await restoreSession();

  const response = await session.transact({
    actions: [
      {
        authorization: [session.auth],
        account: telosWorks.contractName,
        name: 'rmvproposal',
        data: {
          proposal_id: proposalId,
        },
      },
    ],
  });

  return response;
}
