import { useEffect, useState } from 'react';
import { parseISO, compareAsc } from 'date-fns';
import { useAuth } from '@hooks/useAuth';
import { projectStatus, isStarted } from '@utils/projectStatus';
import { handleProposalsPeriodEnded } from '@utils/handleProposalsPeriodEnded';
import { listProjectsService } from '@services/projects/listProjectsService';
import { listMilestonesService } from '@services/milestones/listMilestonesService';

export function useProjects() {
  const { user, isProgramManager } = useAuth();
  const [projects, setProjects] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [myHighlightedTabs, setMyHighlightedTabs] = useState({});
  const [otherHighlightedTabs, setOtherHighlightedTabs] = useState({});

  useEffect(() => {
    async function loadProjects() {
      try {
        setIsLoading(true);

        const projectsData = await listProjectsService();

        const my = {
          startVoting: [],
          votingEnded: [],
          reviewReportMilestone: [],
          archived: [],
        };
        const other = {
          voting: [],
          acceptingProposals: [],
          reportMilestone: [],
          archived: [],
        };

        const todayDate = new Date();

        const promises = projectsData.map(async (item) => {
          const { message, hasProposalsPeriodEnded, hasVotingPeriodEnded } =
            handleProposalsPeriodEnded({
              status: item.status,
              proposeEnd: item.propose_end_ts,
              voteEnd: item.vote_end_ts,
              projectStart: item.start_ts,
            });

          item.message = message;

          let milestones = [];
          if (
            isStarted(item.status) &&
            (user === item.program_manager || user === item.project_manager)
          ) {
            milestones = await listMilestonesService({
              projectId: item.project_id,
            });
          }

          if (user && item.program_manager === user) {
            switch (projectStatus[item.status]) {
              case 'draft':
              case 'voted':
              case 'selected':
              case 'completed':
              case 'cancelled':
                my.archived.push(item);
                break;
              case 'published':
                if (hasProposalsPeriodEnded) {
                  my.startVoting.push(item);
                } else {
                  my.archived.push(item);
                }
                break;
              case 'voting':
                if (hasVotingPeriodEnded) {
                  my.votingEnded.push(item);
                } else {
                  my.archived.push(item);
                }
                break;
              case 'started':
                if (user !== item.program_manager) {
                  my.archived.push(item);
                  return;
                }

                const hasReviewReport = milestones.some((milestoneItem) => {
                  const milestoneEndDate = parseISO(milestoneItem.end_ts);
                  const sendReportDate = parseISO(milestoneItem.send_ts);
                  const reviewReportDate = parseISO(milestoneItem.review_ts);
                  const result =
                    isProgramManager &&
                    user === item.program_manager &&
                    compareAsc(todayDate, milestoneEndDate) === 1 &&
                    compareAsc(sendReportDate, reviewReportDate) === 1 &&
                    item.title != '';
                  return result;
                });
                if (hasReviewReport) {
                  my.reviewReportMilestone.push(item);
                } else {
                  my.archived.push(item);
                }
                break;
            }
          } else {
            switch (projectStatus[item.status]) {
              case 'published':
                if (hasProposalsPeriodEnded) {
                  other.archived.push(item);
                } else {
                  other.acceptingProposals.push(item);
                }
                break;
              case 'voting':
                if (hasVotingPeriodEnded) {
                  other.archived.push(item);
                } else {
                  other.voting.push(item);
                }
                break;
              case 'voted':
              case 'selected':
              case 'completed':
              case 'cancelled':
                other.archived.push(item);
                break;
              case 'started':
                if (user === '' || user !== item.project_manager) {
                  other.archived.push(item);
                  return;
                }

                const hasReportButton = milestones.some((milestoneItem) => {
                  const milestoneStartDate = parseISO(milestoneItem.start_ts);
                  const milestoneEndDate = parseISO(milestoneItem.end_ts);
                  const result =
                    user === item.project_manager &&
                    milestoneItem.title === '' &&
                    compareAsc(todayDate, milestoneStartDate) === 1 &&
                    compareAsc(todayDate, milestoneEndDate) === -1;
                  return result;
                });
                if (hasReportButton) {
                  other.reportMilestone.push(item);
                } else {
                  other.archived.push(item);
                }
                break;
            }
          }
        });

        await Promise.all(promises);

        other.acceptingProposals = other.acceptingProposals.sort((a, b) =>
          compareAsc(new Date(a.propose_end_ts), new Date(b.propose_end_ts))
        );

        other.archived = other.archived.sort((a, b) => {
          const firstStatus = Number(a.status);
          const secondStatus = Number(b.status);
          if (firstStatus < secondStatus) {
            return -1;
          }
          if (firstStatus > secondStatus) {
            return 1;
          }
          return 0;
        });

        setProjects({
          my,
          other,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    if (
      typeof user !== 'undefined' &&
      typeof isProgramManager !== 'undefined'
    ) {
      loadProjects();
    }
  }, [user, isProgramManager]);

  useEffect(() => {
    if (Object.keys(projects).length === 0) {
      return;
    }

    setMyHighlightedTabs({});
    setOtherHighlightedTabs({});

    if (projects?.my?.startVoting.length > 0) {
      setMyHighlightedTabs((state) => ({
        ...state,
        startVoting: 'Start vote',
      }));
    }
    if (projects?.my?.votingEnded.length > 0) {
      setMyHighlightedTabs((state) => ({
        ...state,
        votingEnded: 'Voting ended',
      }));
    }
    if (projects?.my?.reviewReportMilestone.length > 0) {
      setMyHighlightedTabs((state) => ({
        ...state,
        reviewReportMilestone: 'Review report milestone',
      }));
    }
    if (projects?.other?.voting.length > 0) {
      setOtherHighlightedTabs((state) => ({
        ...state,
        voting: 'Voting',
      }));
    }
    if (projects?.other?.acceptingProposals.length > 0) {
      setOtherHighlightedTabs((state) => ({
        ...state,
        acceptingProposals: 'Accepting proposals',
      }));
    }
    if (projects?.other?.reportMilestone.length > 0) {
      setOtherHighlightedTabs((state) => ({
        ...state,
        reportMilestone: 'Report milestone',
      }));
    }
  }, [projects]);

  return {
    projects,
    isLoading,
    myHighlightedTabs,
    otherHighlightedTabs,
  };
}
