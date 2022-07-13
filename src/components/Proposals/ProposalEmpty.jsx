import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '@hooks/useAuth';
import { useProject } from '@hooks/useProject';
import { isPublished } from '@utils/projectStatus';

export function ProposalEmpty() {
  const router = useRouter();
  const { user, isProgramManager } = useAuth();
  const {
    project,
    hasProposalsPeriodEnded,
    onCancelProject,
    onReplayReceivingProposals,
  } = useProject();

  if (
    hasProposalsPeriodEnded &&
    isPublished(project.status) &&
    isProgramManager &&
    user === project.program_manager
  ) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-32 text-center bg-blue-dark-2 rounded-2xl">
        <h1 className="mb-2 heading-2">What would you like to do?</h1>
        <p className="max-w-md body-1">
          No proposal has been received, you can replay the receiving proposals
          period or cancel the project.
        </p>
        <div className="flex flex-row items-center justify-center mt-6">
          <button
            type="button"
            className="mr-2 btn btn--secondary"
            onClick={onCancelProject}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn--secondary"
            onClick={onReplayReceivingProposals}
          >
            Replay
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center px-6 py-32 text-center bg-blue-dark-2 rounded-2xl">
      {hasProposalsPeriodEnded ? (
        <h1 className="heading-2">No proposals</h1>
      ) : (
        <>
          {!user || project.program_manager === user ? (
            <h1 className="heading-2">Waiting for proposals</h1>
          ) : (
            <>
              <h1 className="mb-2 heading-2">
                Be the first to submit a proposal for this project
              </h1>
              <p className="max-w-2xl body-1">
                Bonds will be required for any proposal submitted. Once the
                period of receiving proposals ends. Proposals marked as spam
                won't have their bond returned. Bonds will be returned before
                the voting period to legitimate proposals.
              </p>
              <Link href={`/projects/proposal/${router.query.id}/new`}>
                <a className="mt-6 btn btn--primary">Send Proposal</a>
              </Link>
            </>
          )}
        </>
      )}
    </div>
  );
}
