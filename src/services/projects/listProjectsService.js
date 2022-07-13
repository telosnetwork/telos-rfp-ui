import { rpcService } from '@services/rpcService';
import { telosWorks, maxLimit } from '@configs/telosConfig';

export async function listProjectsService() {
  const rpc = rpcService();

  const { rows: projects } = await rpc.get_table_rows({
    code: telosWorks.contractName,
    scope: telosWorks.scope,
    table: 'projects',
    limit: maxLimit,
    json: true,
    reverse: false,
    show_payer: false,
  });

  return projects;
}
