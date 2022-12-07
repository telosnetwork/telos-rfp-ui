import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { beginVotingProjectService } from '@services/projects/beginVotingProjectService';
import { useProject } from '@hooks/useProject';
import { Dropdown } from '@components/Dropdown';
import { DropdownItem } from '@components/DropdownItem';
import { delay } from '@utils/delay';

export function ProjectHeader() {
  const router = useRouter();

  const {
    project,
    hasSendProposalButton,
    hasStartVotingButton,
    acceptedProposals,
    onCancelProject,
    onReplayReceivingProposals,
  } = useProject();

  const selectedProposals = useMemo(() => {
    return acceptedProposals
      ? acceptedProposals.filter((proposer) => proposer.accepted)
      : [];
  }, [acceptedProposals]);

  const onStartVoting = useCallback(async () => {
    let proposals = acceptedProposals;

    if (proposals.length === 1) {
      proposals[0].accepted = true;
    }

    try {
      await beginVotingProjectService({
        projectId: project.project_id,
        acceptedProposals: proposals,
        cancel: false,
      });

      delay(() => {
        router.reload();
      });
    } catch (error) {
      console.log(error);
    }
  }, [project, acceptedProposals, router]);

  return (
    <>
      {hasSendProposalButton && (
        <Link
          href={`/projects/proposal/${project.project_id}/new`}
          className="btn btn--primary"
        >
          Send Proposal
        </Link>
      )}
      {hasStartVotingButton && (
        <>
          <Dropdown>
            <DropdownItem onClick={onCancelProject}>
              Cancel project
            </DropdownItem>
            <DropdownItem onClick={onReplayReceivingProposals}>
              Replay receiving proposals
            </DropdownItem>
          </Dropdown>
          {selectedProposals.length > 1 ? (
            <button
              type="button"
              className="btn btn--primary ml-2"
              onClick={onStartVoting}
              disabled={selectedProposals.length === 0}
            >
              Start Voting
            </button>
          ) : (
            <button
              type="button"
              className="btn btn--primary ml-2"
              onClick={onStartVoting}
              disabled={selectedProposals.length === 0}
            >
              Start project
            </button>
          )}
        </>
      )}
    </>
  );
}
