import { useContext } from 'react';
import { ProposalFormContext } from '@contexts/ProposalFormContext';

export function useProposalForm() {
  const context = useContext(ProposalFormContext);

  if (!context) {
    throw new Error(
      'useProposalForm must be used with an ProposalFormProvider'
    );
  }

  return context;
}
