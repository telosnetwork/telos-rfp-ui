import { telosWorks } from '@configs/telosConfig';
import { restoreSession } from '@services/anchorLinkService';

export async function publishProjectService({ projectId }) {
  const { session } = await restoreSession();

  const response = await session.transact({
    actions: [
      {
        authorization: [session.auth],
        account: telosWorks.contractName,
        name: 'publishprjct',
        data: {
          project_id: projectId,
        },
      },
    ],
  });

  return response;
}
