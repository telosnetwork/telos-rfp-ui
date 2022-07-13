import { telosWorks } from '@configs/telosConfig';
import { restoreSession } from '@services/anchorLinkService';

export async function createReportService({
  projectId,
  milestoneId,
  title,
  description,
  document,
}) {
  const { session } = await restoreSession();

  const response = await session.transact({
    actions: [
      {
        authorization: [session.auth],
        account: telosWorks.contractName,
        name: 'sendreport',
        data: {
          project_id: projectId,
          milestone_id: milestoneId,
          title,
          description,
          documents: document,
        },
      },
    ],
  });

  return response;
}
