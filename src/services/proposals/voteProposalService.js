import { telosDecide, maxLimit } from '@configs/telosConfig';
import { rpcService } from '@services/rpcService';
import { restoreSession } from '@services/anchorLinkService';
import { uint64ToName } from '@utils/handleEosioName';

export async function voteProposalService({ proposalId, ballotName }) {
  const { session, user } = await restoreSession();

  const rpc = rpcService();

  const { rows: voter } = await rpc.get_table_rows({
    code: telosDecide.contractName,
    table: 'voters',
    limit: maxLimit,
    scope: user,
    json: true,
  });

  let registerVoterAction = [];
  if (voter.length === 0) {
    registerVoterAction = [
      {
        account: telosDecide.contractName,
        name: 'regvoter',
        authorization: [session.auth],
        data: {
          voter: user,
          treasury_symbol: telosDecide.treasurySymbol,
        },
      },
    ];
  }

  const response = await session.transact({
    actions: [
      ...registerVoterAction,
      {
        account: telosDecide.contractName,
        name: 'castvote',
        authorization: [session.auth],
        data: {
          voter: user,
          ballot_name: ballotName,
          options: [uint64ToName(proposalId)],
        },
      },
    ],
  });

  return response;
}
