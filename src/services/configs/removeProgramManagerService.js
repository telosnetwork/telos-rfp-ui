import { telosWorks } from '@configs/telosConfig';
import { restoreSession } from '@services/anchorLinkService';

export async function removeProgramManagerService({ user }) {
  const { session } = await restoreSession();

  const response = await session.transact({
    actions: [
      {
        authorization: [session.auth],
        account: telosWorks.contractName,
        name: 'rmvmanager',
        data: {
          manager: user,
        },
      },
    ],
  });

  return response;
}
