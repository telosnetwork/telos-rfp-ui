import { createContext, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { removeProposalService } from '@services/proposals/removeProposalService';
import { delay } from '@utils/delay';
import { deleteFileService } from '@services/files/deleteFileService';

export const ProposalFormContext = createContext({});

export function ProposalFormProvider({
  bond,
  projectId,
  proposalId,
  initialData,
  children,
}) {
  const router = useRouter();
  const isNew = Object.keys(initialData).length === 0;

  const [data, setData] = useState(initialData);
  const [selectedStep, setSelectedStep] = useState(1);
  const [disableForm, setDisableForm] = useState(false);

  const [csvJson, setCsvJson] = useState([]);

  const deleteFiles = useCallback(async () => {
    const files = [
      'timeline',
      'tech_qualifications_pdf',
      'approach_pdf',
      'cost_and_schedule_pdf',
      'references_pdf',
    ];
    await Promise.all(
      files.map((file) => data[file] && deleteFileService(data[file]))
    );
  }, [data]);

  const onDelete = useCallback(async () => {
    setDisableForm(true);
    try {
      await removeProposalService({
        proposalId,
      });

      await deleteFiles();

      delay(() => {
        router.push(`/projects/${projectId}?tab=proposals`);
      });
    } catch (error) {
      console.log(error);
    }
    setDisableForm(false);
  }, [projectId, proposalId, router, deleteFiles]);

  return (
    <ProposalFormContext.Provider
      value={{
        isNew,

        data,
        selectedStep,
        disableForm,
        setData,
        setSelectedStep,
        setDisableForm,

        csvJson,
        setCsvJson,

        deleteFiles,
        onDelete,

        bond,
        projectId,
        proposalId,
      }}
    >
      {children && children(selectedStep)}
    </ProposalFormContext.Provider>
  );
}
