import { rpcService } from '@services/rpcService';
import { telosWorks, maxLimit } from '@configs/telosConfig';

export async function listMilestonesService({ projectId }) {
  const rpc = rpcService();

  const { rows: milestones } = await rpc.get_table_rows({
    code: telosWorks.contractName,
    scope: projectId,
    table: 'milestones',
    limit: maxLimit,
    json: true,
    reverse: false,
    show_payer: false,
  });

  return milestones;
}
