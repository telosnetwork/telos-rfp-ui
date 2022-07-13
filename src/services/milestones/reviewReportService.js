import { telosWorks } from '@configs/telosConfig';
import { restoreSession } from '@services/anchorLinkService';

export async function reviewReportService({
  projectId,
  milestoneId,
  payReward,
}) {
  const { session } = await restoreSession();

  const response = await session.transact({
    actions: [
      {
        authorization: [session.auth],
        account: telosWorks.contractName,
        name: 'reviewreport',
        data: {
          project_id: projectId,
          milestone_id: milestoneId,
          pay_reward: payReward,
        },
      },
    ],
  });

  return response;
}
