import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Modal from '@components/Modal';
import { isVoting } from '@utils/projectStatus';
import { useAuth } from '@hooks/useAuth';
import { voteProposalService } from '@services/proposals/voteProposalService';
import { showVotersProposalService } from '@services/proposals/showVotersProposalService';
import { delay } from '@utils/delay';
import { useProject } from '@hooks/useProject';

export function ProposalVote({ proposalId, title }) {
  const router = useRouter();
  const modalRef = useRef(null);
  const { isAuthenticated } = useAuth();
  const { project, hasVotingPeriodEnded } = useProject();

  const [voters, setVoters] = useState([]);

  const hasVoteButton =
    isAuthenticated && isVoting(project.status) && !hasVotingPeriodEnded;

  const hasSeeVote = project.ballot_name !== '';

  async function onVote() {
    try {
      await voteProposalService({
        proposalId,
        ballotName: project.ballot_name,
      });
      delay(() => {
        router.reload();
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function onSeeVoters() {
    try {
      const voters = await showVotersProposalService({
        proposalId,
        ballotName: project.ballot_name,
      });
      setVoters(voters);
      modalRef.current.openModal();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {hasSeeVote && (
        <button
          type="button"
          className="btn btn--tertiary mr-2"
          onClick={onSeeVoters}
        >
          See voters
        </button>
      )}
      {hasVoteButton && (
        <button type="button" className="btn btn--secondary" onClick={onVote}>
          Vote
        </button>
      )}

      <Modal ref={modalRef} title="Voters" support={title}>
        {voters.length > 0 ? (
          <>
            {voters.map((voter) => (
              <div
                key={voter.voter}
                className="p-6 border-b border-blue-dark-2 last-of-type:border-b-0"
              >
                <span className="heading-3">{voter.voter}</span>
              </div>
            ))}
          </>
        ) : (
          <div className="px-6 py-12 text-center">
            <h4 className="heading-3">This proposal doesn't have any votes</h4>
          </div>
        )}
      </Modal>
    </>
  );
}
