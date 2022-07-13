import { compareAsc, format } from 'date-fns';
import { projectStatus } from '@utils/projectStatus';

let message = '';
let hasProposalsPeriodEnded = false;
let hasVotingPeriodEnded = false;

export function handleProposalsPeriodEnded({
  status,
  proposeEnd,
  voteEnd,
  projectStart,
}) {
  switch (projectStatus[status]) {
    case 'draft':
      handleDraft();
      break;
    case 'published':
      handlePublished({ proposeEnd });
      break;
    case 'voting':
    case 'voted':
    case 'selected':
      handleVoting({ voteEnd });
      break;
    case 'started':
      handleStarted({ projectStart });
      break;
    case 'completed':
      handleComplete();
      break;
    case 'cancelled':
      handleCancelled();
      break;
  }

  return {
    message,
    hasProposalsPeriodEnded,
    hasVotingPeriodEnded,
  };
}

function handleDraft() {
  message = '';
  hasProposalsPeriodEnded = false;
  hasVotingPeriodEnded = false;
}

function handlePublished({ proposeEnd }) {
  hasVotingPeriodEnded = false;
  const todayDate = new Date();
  const proposeEndDate = new Date(proposeEnd);
  const proposeEndDateFormatted = format(proposeEndDate, 'MM/dd/yyyy hh:mm aa');
  hasProposalsPeriodEnded = compareAsc(todayDate, proposeEndDate) === 1;
  message = hasProposalsPeriodEnded
    ? `Proposals acceptance ended at <span style="color:white;font-weight:500;">${proposeEndDateFormatted}</span>`
    : `Accepting proposals until <span style="color:white;font-weight:500;">${proposeEndDateFormatted}</span>`;
}

function handleVoting({ voteEnd }) {
  hasProposalsPeriodEnded = true;
  const todayDate = new Date();
  const voteEndDate = new Date(voteEnd);
  const voteEndDateFormatted = format(voteEndDate, 'MM/dd/yyyy hh:mm aa');
  hasVotingPeriodEnded = compareAsc(todayDate, voteEndDate) === 1;
  message = hasVotingPeriodEnded
    ? `Voting for proposals ended at <span style="color:white;font-weight:500;">${voteEndDateFormatted}</span>`
    : `Vote for proposals until <span style="color:white;font-weight:500;">${voteEndDateFormatted}</span>`;
}

function handleStarted({ projectStart }) {
  const startedDate = new Date(projectStart);
  const startedDateFormatted = format(startedDate, 'MM/dd/yyyy hh:mm aa');
  message = `Started <span style="color:white;font-weight:500;">${startedDateFormatted}</span>`;
  hasProposalsPeriodEnded = true;
  hasVotingPeriodEnded = true;
}

function handleCancelled() {
  message = 'Project cancelled';
  hasProposalsPeriodEnded = true;
  hasVotingPeriodEnded = true;
}

function handleComplete() {
  message = 'Project complete';
  hasProposalsPeriodEnded = true;
  hasVotingPeriodEnded = true;
}
