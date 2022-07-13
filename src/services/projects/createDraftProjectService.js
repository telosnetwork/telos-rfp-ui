import { telosWorks } from '@configs/telosConfig';
import { restoreSession } from '@services/anchorLinkService';

export async function createDraftProjectService({
  title,
  bond,
  description,
  github_url,
  usd_rewarded,
  number_proposals_rewarded,
  proposing_days,
  voting_days,
  pdf,
}) {
  const { session, user } = await restoreSession();

  const response = await session.transact({
    actions: [
      {
        authorization: [session.auth],
        account: telosWorks.contractName,
        name: 'draftproject',
        data: {
          title,
          program_manager: user,
          bond,
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
