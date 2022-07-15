import { useEffect, useState } from 'react';
import { useAuth } from '@hooks/useAuth';
import { listProposalsService } from '@services/proposals/listProposalsService';
import { getCSVInformation } from '@services/pinataService';

export function useProposals({
  projectId,
  projectBallotName,
  projectNumberProposalsRewarded,
  projectProgramManager,
  selectedProposalId,
  rewardedProposalId,
  hasVotingPeriodEnded,
}) {
  const { user } = useAuth();

  const [myProposals, setMyProposals] = useState(null);
  const [otherProposals, setOtherProposals] = useState(null);
  const [winningProposals, setWinningProposals] = useState(null);
  const [selectedProposal, setSelectedProposal] = useState({});
  const [acceptedProposals, setAcceptedProposals] = useState(null);

  const [isLoadingProposal, setIsLoadingProposal] = useState(true);
  const [isEmptyProposal, setIsEmptyProposal] = useState(true);

  useEffect(() => {
    async function loadProposals() {
      try {
        let proposals = await listProposalsService({
          ballotName: projectBallotName,
          projectId,
        });

        if (proposals.length === 0) {
          throw 'There are no proposals for this project';
        }

        proposals = await Promise.all(
          proposals.map(async (proposal) => {
            const timeline = await getCSVInformation(proposal.timeline);
            proposal.timeline = timeline;
            return proposal;
          })
        );

        proposals = proposals.sort((a, b) =>
          Number(a.votes) <= Number(b.votes)
            ? 1
            : Number(b.votes) <= Number(a.votes)
            ? -1
            : 0
        );

        if (selectedProposalId.length > 0) {
          const selectedProposal = proposals.find(
            (proposal) => proposal.proposal_id === selectedProposalId[0]
          );
          setSelectedProposal(selectedProposal);
        }

        let myProposals = [];
        let winningProposals = [];
        let otherProposals = [];

        if (rewardedProposalId.length > 0) {
          winningProposals = proposals.filter((proposal) =>
            rewardedProposalId.includes(proposal.proposal_id)
          );
        }

        if (hasVotingPeriodEnded) {
          otherProposals = proposals.filter(
            (proposal) => !rewardedProposalId.includes(proposal.proposal_id)
          );
        } else {
          myProposals = proposals.filter(
            (proposal) => proposal.proposer === user
          );
          otherProposals = proposals.filter(
            (proposal) => proposal.proposer !== user
          );
        }

        setMyProposals(myProposals);
        setWinningProposals(winningProposals);
        setOtherProposals(otherProposals);
        setAcceptedProposals(
          otherProposals.map((proposal) => ({
            proposalId: proposal.proposal_id,
            accepted: false,
          }))
        );
      } catch (error) {
        console.log(error);
        setMyProposals([]);
        setWinningProposals([]);
        setOtherProposals([]);
        setAcceptedProposals([]);
      }
    }

    if (typeof user !== 'undefined' && projectId) {
      loadProposals();
    }
  }, [
    user,
    projectId,
    projectBallotName,
    projectNumberProposalsRewarded,
    projectProgramManager,
    selectedProposalId,
    rewardedProposalId,
    hasVotingPeriodEnded,
  ]);

  useEffect(() => {
    const isLoadingProposal =
      winningProposals === null ||
      myProposals === null ||
      otherProposals === null;

    setIsLoadingProposal(isLoadingProposal);

    if (!isLoadingProposal) {
      const isEmptyProposal =
        winningProposals.length === 0 &&
        myProposals.length === 0 &&
        otherProposals.length === 0;
      setIsEmptyProposal(isEmptyProposal);
    }
  }, [myProposals, otherProposals, winningProposals]);

  return {
    myProposals,
    otherProposals,
    winningProposals,
    selectedProposal,
    acceptedProposals,
    setAcceptedProposals,
    isLoadingProposal,
    isEmptyProposal,
  };
}
