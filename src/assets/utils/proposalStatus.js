export const proposalStatus = {
  1: 'draft', // Pending bond resolution
  2: 'submitted',
  3: 'accepted', // Bond is returned and proposal will be voted on
  4: 'spam', // Bond is not returned and the proposal is dismissed, can not be edited neither voted on
  5: 'rewarded', // After voting, the proposal has been rewarded
  6: 'selected', // After voting, proposal has been rewarded and selected to be executed
};

export const isDraft = (status) => status === 1;

export const isSpam = (status) => status === 4;
