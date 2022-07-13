import { ProposalEmpty } from '@components/Proposals/ProposalEmpty';
import { ProposalItem } from '@components/Proposals/ProposalItem';
import { Overline } from '@components/Overline';
import { useProject } from '@hooks/useProject';
import { chooseProposalService } from '@services/proposals/chooseProposalService';
import { FiInfo } from 'react-icons/fi';

export function Proposals({ ...rest }) {
  const {
    project,
    hasStartVotingButton,
    hasProposalsPeriodEnded,
    isLoadingProposal,
    isEmptyProposal,
    myProposals,
    otherProposals,
    winningProposals,

    acceptedProposals,
    setAcceptedProposals,
  } = useProject();

  function handleChangeCheckbox(selectedProposal) {
    setAcceptedProposals(
      acceptedProposals.map((proposal) =>
        Number(proposal.proposalId) === Number(selectedProposal.proposalId)
          ? selectedProposal
          : proposal
      )
    );
  }

  async function handleChooseProposal(proposalId) {
    try {
      await chooseProposalService({
        projectId: project.project_id,
        proposalId,
      });
    } catch (error) {
      console.log(error);
    }
  }

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

  if (isEmptyProposal) {
    return (
      <div className="container" {...rest}>
        <ProposalEmpty />
      </div>
    );
  }

  return (
    <div className="container" {...rest}>
      {hasStartVotingButton && (
        <div className="bg-blue-dark-2 p-6 md:p-12 rounded-2xl flex flex-row justify-between items-start mb-4">
          <div className="flex-none w-6 h-6 mr-8">
            <FiInfo size={24} />
          </div>
          <p className="heading-3">
            The selected proposals will be their bonds returned. The ones that
            were not selected will be marked as spam and the bonds will not be
            returned.
          </p>
        </div>
      )}

      {!hasProposalsPeriodEnded && (
        <div className="bg-blue-dark-2 p-6 md:p-12 rounded-2xl flex flex-row justify-between items-start mb-8">
          <div className="flex-none w-6 h-6 mr-8">
            <FiInfo size={24} />
          </div>
          <p className="heading-3">
            Bonds will be required for any proposal submitted. Once the period
            of receiving proposals ends. Proposals marked as spam won't have
            their bond returned. Bonds will be returned before the voting period
            to legitimate proposals.
          </p>
        </div>
      )}

      {winningProposals.length > 0 && (
        <Overline title="Winning proposals" icon="heart" />
      )}
      {winningProposals.map((proposal) => (
        <ProposalItem
          key={proposal.proposal_id}
          status={proposal.status}
          proposalId={proposal.proposal_id}
          title={proposal.title}
          usdAmount={proposal.usd_amount}
          proposer={proposal.proposer}
          mockup={proposal.mockups_link}
          kanbanBoard={proposal.kanban_board_link}
          techQualificationsPdf={proposal.tech_qualifications_pdf}
          approachPdf={proposal.approach_pdf}
          costAndSchedulePdf={proposal.cost_and_schedule_pdf}
          referencesPdf={proposal.references_pdf}
          milestones={proposal.timeline}
          numberOfVotes={proposal.votes}
          onChangeCheckbox={handleChangeCheckbox}
          onChooseProposal={handleChooseProposal}
        />
      ))}

      {myProposals.length > 0 && <Overline title="My proposals" icon="smile" />}
      {myProposals.map((proposal) => (
        <ProposalItem
          key={proposal.proposal_id}
          status={proposal.status}
          proposalId={proposal.proposal_id}
          title={proposal.title}
          usdAmount={proposal.usd_amount}
          proposer="me"
          mockup={proposal.mockups_link}
          kanbanBoard={proposal.kanban_board_link}
          techQualificationsPdf={proposal.tech_qualifications_pdf}
          approachPdf={proposal.approach_pdf}
          costAndSchedulePdf={proposal.cost_and_schedule_pdf}
          referencesPdf={proposal.references_pdf}
          milestones={proposal.timeline}
          numberOfVotes={proposal.votes}
          onChangeCheckbox={handleChangeCheckbox}
          onChooseProposal={handleChooseProposal}
        />
      ))}

      {(myProposals.length > 0 || winningProposals.length > 0) &&
        otherProposals.length > 0 && (
          <Overline title="Other proposals" icon="menu" />
        )}

      {otherProposals.map((proposal) => (
        <ProposalItem
          key={proposal.proposal_id}
          status={proposal.status}
          proposalId={proposal.proposal_id}
          title={proposal.title}
          usdAmount={proposal.usd_amount}
          proposer={proposal.proposer}
          mockup={proposal.mockups_link}
          kanbanBoard={proposal.kanban_board_link}
          techQualificationsPdf={proposal.tech_qualifications_pdf}
          approachPdf={proposal.approach_pdf}
          costAndSchedulePdf={proposal.cost_and_schedule_pdf}
          referencesPdf={proposal.references_pdf}
          milestones={proposal.timeline}
          numberOfVotes={proposal.votes}
          onChangeCheckbox={handleChangeCheckbox}
          onChooseProposal={handleChooseProposal}
        />
      ))}
    </div>
  );
}
