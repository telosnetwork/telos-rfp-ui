import { rpcService } from '@services/rpcService';
import { telosWorks } from '@configs/telosConfig';

export async function showProposalService({ proposalId }) {
  const rpc = rpcService();

  const { rows: proposals } = await rpc.get_table_rows({
    code: telosWorks.contractName,
    scope: telosWorks.scope,
    table: 'proposals',
    lower_bound: String(proposalId),
    limit: 1,
    json: true,
    reverse: false,
    show_payer: false,
  });

  if (proposals.length === 0) {
    return null;
  }

  return proposals[0];
}
