export const projectStatus = {
  1: 'draft',
  2: 'published',
  3: 'voting',
  4: 'voted',
  5: 'selected',
  6: 'started',
  7: 'completed',
  8: 'cancelled',
};

export const isDraft = (status) => status === 1;

export const isPublished = (status) => status === 2;

export const isVoting = (status) => status === 3;

export const isVoted = (status) => status === 4;

export const isSelected = (status) => status === 5;

export const isStarted = (status) => status === 6;

export const isCompleted = (status) => status === 7;

export const isCancelled = (status) => status === 8;
