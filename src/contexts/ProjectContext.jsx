import { createContext, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useProposals } from '@hooks/useProposals';
import { useAuth } from '@hooks/useAuth';
import { isPublished } from '@utils/projectStatus';
import { beginVotingProjectService } from '@services/projects/beginVotingProjectService';
import { delay } from '@utils/delay';

export const ProjectContext = createContext({});

export function ProjectProvider({
  project,
  hasProposalsPeriodEnded,
  hasVotingPeriodEnded,
  milestones,
  children,
}) {
  const { user } = useAuth();
  const router = useRouter();

  const {
    isLoadingProposal,
    isEmptyProposal,
    myProposals,
    otherProposals,
    winningProposals,
    selectedProposal,
    acceptedProposals,
    setAcceptedProposals,
  } = useProposals({
    projectId: project.project_id,
    projectBallotName: project.ballot_name,
    projectNumberProposalsRewarded: project.number_proposals_rewarded,
    projectProgramManager: project.program_manager,
    selectedProposalId: project.proposal_selected,
    rewardedProposalId: project.proposals_rewarded,
    hasVotingPeriodEnded,
  });

  const onCancelProject = useCallback(async () => {
    try {
      await beginVotingProjectService({
        projectId: project.project_id,
        acceptedProposals: [],
        cancel: true,
      });

      delay(() => {
        router.reload();
      });
    } catch (error) {
      console.log(error);
    }
  }, [project, router]);

  const onReplayReceivingProposals = useCallback(async () => {
    try {
      await beginVotingProjectService({
        projectId: project.project_id,
        acceptedProposals: [],
        cancel: false,
      });

      delay(() => {
        router.reload();
      });
    } catch (error) {
      console.log(error);
    }
  }, [project, router]);

  const hasSendProposalButton =
    user && project.program_manager !== user && !hasProposalsPeriodEnded;

  const hasStartVotingButton =
    user &&
    user === project.program_manager &&
    isPublished(project.status) &&
    (myProposals?.length > 0 || otherProposals?.length > 0) &&
    hasProposalsPeriodEnded;

  return (
    <ProjectContext.Provider
      value={{
        project,
        hasProposalsPeriodEnded,
        hasVotingPeriodEnded,
        hasSendProposalButton,
        hasStartVotingButton,
        milestones,
        isLoadingProposal,
        isEmptyProposal,
        myProposals,
        otherProposals,
        winningProposals,
        selectedProposal,
        acceptedProposals,
        setAcceptedProposals,
        onCancelProject,
        onReplayReceivingProposals,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}
