import { rpcService } from '@services/rpcService';
import { telosWorks } from '@configs/telosConfig';

export async function showProjectService({ projectId }) {
  const rpc = rpcService();

  const { rows: projects } = await rpc.get_table_rows({
    code: telosWorks.contractName,
    scope: telosWorks.scope,
    table: 'projects',
    lower_bound: String(projectId),
    limit: 1,
    json: true,
    reverse: false,
    show_payer: false,
  });

  if (projects.length === 0) {
    return null;
  }

  return projects[0];
}
