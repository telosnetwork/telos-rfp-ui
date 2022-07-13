import { rpcService } from '@services/rpcService';
import { telosWorks, maxLimit } from '@configs/telosConfig';

export async function getPermissionService({ user }) {
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

  const allProgramManagers = configs.reduce((acc, cur) => {
    return acc.concat(cur.program_managers);
  }, []);

  const isAdministrator = configs.some((item) => item.administrator === user);
  const isProgramManager = allProgramManagers.some((item) => item === user);

  return {
    isAdministrator,
    isProgramManager,
  };
}
