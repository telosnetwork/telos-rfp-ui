import { telosWorks } from '@configs/telosConfig';
import { restoreSession } from '@services/anchorLinkService';

export async function updateProjectService({
  project_id,
  bond,
  title,
  description,
  github_url,
  usd_rewarded,
  number_proposals_rewarded,
  proposing_days,
  voting_days,
  pdf,
}) {
  const { session } = await restoreSession();

  const response = await session.transact({
    actions: [
      {
        authorization: [session.auth],
        account: telosWorks.contractName,
        name: 'editproject',
        data: {
          project_id,
          bond,
          title,
          description,
          github_url,
          usd_rewarded,
          number_proposals_rewarded,
          proposing_days,
          voting_days,
          pdf,
        },
      },
    ],
  });

  return response;
}
