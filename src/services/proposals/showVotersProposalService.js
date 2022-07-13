import { telosDecide, maxLimit } from '@configs/telosConfig';
import { rpcService } from '@services/rpcService';
import { uint64ToName } from '@utils/handleEosioName';

export async function showVotersProposalService({ proposalId, ballotName }) {
  const rpc = rpcService();

  const { rows: voters } = await rpc.get_table_rows({
    code: telosDecide.contractName,
    table: 'votes',
    limit: maxLimit,
    scope: ballotName,
    json: true,
  });

  const votersFiltered = voters.filter((voter) =>
    voter.weighted_votes.some((vote) => vote.key === uint64ToName(proposalId))
  );

  return votersFiltered;
}
