import { rpcService } from '@services/rpcService';
import { telosWorks, maxLimit } from '@configs/telosConfig';

export async function listProgramManagersService({ user }) {
  const rpc = rpcService();

  const { rows: configs } = await rpc.get_table_rows({
    code: telosWorks.contractName,
    scope: telosWorks.scope,
    table: 'config',
    limit: maxLimit,
    json: true,
    reverse: false,
    show_payer: false,
  });

  const administrator = configs.find((item) => item.administrator === user);

  if (typeof administrator === 'undefined') {
    return [];
  }

  return administrator.program_managers;
}
