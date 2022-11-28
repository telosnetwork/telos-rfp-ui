import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { Overline } from '@components/Overline';
import { fileURL } from '@configs/telosConfig';
import {
  isPublished,
  isVoting,
  isVoted,
  isSelected,
  isStarted,
  isCompleted,
} from '@utils/projectStatus';
import { isDraft as isDraftProposal } from '@utils/proposalStatus';
import { useAuth } from '@hooks/useAuth';
import { useProject } from '@hooks/useProject';
import { ProposalMilestone } from '@components/Proposals/ProposalMilestone';
import { ProposalVote } from '@components/Proposals/ProposalVote';

export function ProposalItem({
  status,
  proposalId,
  title,
  proposer,
  usdAmount,
  mockup,
  kanbanBoard,
  techQualificationsPdf,
  approachPdf,
  costAndSchedulePdf,
  referencesPdf,
  milestones = [],
  numberOfVotes,
  progress,
  onChangeCheckbox,
  onChooseProposal,
}) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const {
    project,
    hasProposalsPeriodEnded,
    hasVotingPeriodEnded,
    hasStartVotingButton,
  } = useProject();
  const [expand, setExpand] = useState(false);

  const totalDays = milestones.reduce((acc, cur) => {
    return acc + Number(cur.days);
  }, 0);

  const hasVotes =
    project.ballot_name != '' &&
    (isVoting(project.status) ||
      isVoted(project.status) ||
      isSelected(project.status) ||
      isStarted(project.status) ||
      isCompleted(project.status)) &&
    typeof progress === 'undefined';

  const hasVoteButton =
    !isPublished(project.status) && typeof progress === 'undefined';

  const hasChooseProposalButton =
    isAuthenticated &&
    typeof project.program_manager !== 'undefined' &&
    project.program_manager === user &&
    hasVotingPeriodEnded &&
    isVoting(project.status);

  const hasEditButton =
    isAuthenticated && proposer === 'me' && !hasProposalsPeriodEnded;

  return (
    <div className="mb-4 md:mb-8 group">
      <div className="bg-blue-dark-2 p-6 md:p-12 rounded-2xl flex flex-row justify-between items-start">
        <div className="flex flex-row">
          {hasStartVotingButton && isDraftProposal(status) && (
            <div className="mr-8 flex flex-row justify-center items-center">
              <input
                type="checkbox"
                name="proposalId"
                className="appearance-none relative cursor-pointer
                before:transition-all after:transition-all
                before:content-[''] before:block before:w-6 before:h-6 before:rounded-sm
                before:border-2 before:border-white md:hover:before:border-blue
                checked:before:bg-blue checked:before:border-blue
                after:content-[''] after:block after:w-3 after:h-2
                after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-3/4
                after:border-b-2 after:border-l-2 after:-rotate-[50deg] after:border-transparent
                checked:after:border-blue-dark-3"
                value={proposalId}
                onChange={({ target }) =>
                  onChangeCheckbox({
                    proposalId,
                    accepted: target.checked,
                  })
                }
              />
            </div>
          )}
          {hasVotes && (
            <div className="text-center mr-2 md:mr-8 w-[4.25rem]">
              <p className="heading-1 py-1 md:py-[0.125rem]">{numberOfVotes}</p>
              <p className="body-1">Votes</p>
            </div>
          )}
          <div>
            <h2 className="heading-1 py-1 md:py-[0.125rem] truncate">
              {title}
            </h2>
            <p className="body-1">
              By {proposer} • {usdAmount} • {totalDays} days
            </p>
          </div>
        </div>
        <div className="flex flex-row">
          <div
            className={`mr-2 ${
              expand ? '' : 'md:group-hover:flex flex-row md:hidden'
            }`}
          >
            {hasVoteButton && (
              <ProposalVote
                proposalId={proposalId}
                title={title}
                hasVotingPeriodEnded={hasVotingPeriodEnded}
              />
            )}
            {hasEditButton && (
              <Link
                href={`/projects/proposal/${router.query.id}/${proposalId}`}
                className="btn btn--secondary"
              >
                Edit
              </Link>
            )}
            {hasChooseProposalButton && (
              <button
                type="button"
                className="btn btn--secondary"
                onClick={() => onChooseProposal(proposalId)}
              >
                Choose proposal
              </button>
            )}
          </div>
          <button
            type="button"
            className="btn btn--tertiary btn--square"
            onClick={() => setExpand(!expand)}
          >
            {expand ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
          </button>
        </div>
      </div>
      <div
        className={`bg-blue-dark-2 p-6 md:p-12 rounded-2xl mt-[1px] grid grid-cols-2 gap-12 ${
          expand ? '' : 'hidden'
        }`}
      >
        <div className="col-span-2 md:col-span-1">
          <Overline title="Files" icon="file" />
          {mockup && (
            <a
              href={mockup}
              target="_blank"
              rel="noreferrer"
              className="body-1 link mb-2"
            >
              See mockup
            </a>
          )}
          {kanbanBoard && (
            <a
              href={kanbanBoard}
              target="_blank"
              rel="noreferrer"
              className="body-1 link mb-2"
            >
              See kanban board
            </a>
          )}
          {techQualificationsPdf && (
            <a
              href={`${fileURL}/${techQualificationsPdf}/?preview=1`}
              target="_blank"
              rel="noreferrer"
              className="body-1 link mb-2"
            >
              See tech qualifications
            </a>
          )}
          {approachPdf && (
            <a
              href={`${fileURL}/${approachPdf}/?preview=1`}
              target="_blank"
              rel="noreferrer"
              className="body-1 link mb-2"
            >
              See approach
            </a>
          )}
          {costAndSchedulePdf && (
            <a
              href={`${fileURL}/${costAndSchedulePdf}/?preview=1`}
              target="_blank"
              rel="noreferrer"
              className="body-1 link mb-2"
            >
              See cost and schedule
            </a>
          )}
          {referencesPdf && (
            <a
              href={`${fileURL}/${referencesPdf}/?preview=1`}
              target="_blank"
              rel="noreferrer"
              className="body-1 link mb-2"
            >
              See references
            </a>
          )}
        </div>
        <div className="col-span-2">
          <ProposalMilestone milestones={milestones} />
        </div>
      </div>
    </div>
  );
}
