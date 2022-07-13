import { telosWorks } from '@configs/telosConfig';
import { randomEosioName } from '@utils/handleEosioName';
import { restoreSession } from '@services/anchorLinkService';

export async function beginVotingProjectService({
  projectId,
  cancel,
  acceptedProposals,
}) {
  const { session } = await restoreSession();

  const ballotName = randomEosioName();

  const bondActions = acceptedProposals.map((proposal) => ({
    authorization: [session.auth],
    account: telosWorks.contractName,
    name: 'returnbond',
    data: {
      proposal_id: proposal.proposalId,
      return_bond: proposal.accepted,
    },
  }));

  let startProjectAction = [];
  if (acceptedProposals.length === 1) {
    startProjectAction = [
      {
        authorization: [session.auth],
        account: telosWorks.contractName,
        name: 'startproject',
        data: {
          project_id: projectId,
        },
      },
    ];
  }

  const response = await session.transact({
    actions: [
      ...bondActions,
      {
        authorization: [session.auth],
        account: telosWorks.contractName,
        name: 'beginvoting',
        data: {
          project_id: projectId,
          ballot_name: ballotName,
          cancel,
        },
      },
      ...startProjectAction,
    ],
  });

  return response;
}
