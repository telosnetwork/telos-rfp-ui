import { telosWorks } from '@configs/telosConfig';
import { restoreSession } from '@services/anchorLinkService';

export async function removeProjectService({ projectId }) {
  const { session } = await restoreSession();

  const response = await session.transact({
    actions: [
      {
        authorization: [session.auth],
        account: telosWorks.contractName,
        name: 'rmvproject',
        data: {
          project_id: projectId,
        },
      },
    ],
  });

  return response;
}
