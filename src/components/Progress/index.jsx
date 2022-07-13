import { ProgressEmpty } from '@components/Progress/ProgressEmpty';
import { ProposalItem } from '@components/Proposals/ProposalItem';
import { Overline } from '@components/Overline';
import { useProject } from '@hooks/useProject';
import { Milestone } from '@components/Milestone';

export function Progress({ ...rest }) {
  const { selectedProposal, isLoadingProposal, milestones } = useProject();

  if (isLoadingProposal) {
    return (
      <div
        className="flex justify-center items-center h-[calc(100vh-(4.5rem+8.25rem+5.125rem))]"
        {...rest}
      >
        <div className="loader"></div>
      </div>
    );
  }

  if (
    typeof selectedProposal === 'undefined' ||
    Object.keys(selectedProposal).length === 0
  ) {
    return (
      <div className="container" {...rest}>
        <ProgressEmpty />
      </div>
    );
  }

  return (
    <div className="container" {...rest}>
      <Overline title="Roadmap" icon="list" />

      <ProposalItem
        status={selectedProposal.status}
        proposalId={selectedProposal.proposal_id}
        title={selectedProposal.title}
        usdAmount={selectedProposal.usd_amount}
        proposer={selectedProposal.proposer}
        mockup={selectedProposal.mockups_link}
        kanbanBoard={selectedProposal.kanban_board_link}
        techQualificationsPdf={selectedProposal.tech_qualifications_pdf}
        approachPdf={selectedProposal.approach_pdf}
        costAndSchedulePdf={selectedProposal.cost_and_schedule_pdf}
        referencesPdf={selectedProposal.references_pdf}
        milestones={selectedProposal.timeline}
        numberOfVotes={selectedProposal.votes}
        progress={true}
      />

      <Overline title="Biweekly milestones" icon="calendar" />
      {milestones.map((milestone) => (
        <Milestone
          key={milestone.milestone_id}
          milestoneId={milestone.milestone_id}
          status={milestone.status}
          telosRewarded={milestone.tlos_rewarded}
          title={milestone.title}
          description={milestone.description}
          documents={milestone.documents}
          startDate={milestone.start_ts}
          endDate={milestone.end_ts}
          sendDate={milestone.send_ts}
          reviewDate={milestone.review_ts}
        />
      ))}
    </div>
  );
}
