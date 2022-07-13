import Head from 'next/head';
import { parseCookies } from 'nookies';
import { showProposalService } from '@services/proposals/showProposalService';
import { showProjectService } from '@services/projects/showProjectService';
import { BaseLayout } from '@layouts/BaseLayout';
import { ProposalFormProvider } from '@contexts/ProposalFormContext';
import { ProposalFormStepOne } from '@components/Proposals/ProposalFormStepOne';
import { ProposalFormStepTwo } from '@components/Proposals/ProposalFormStepTwo';

export default function SendProposal({
  projectId,
  proposalId,
  bond,
  initialData,
}) {
  return (
    <>
      <Head>
        <title>Telos Build - Create Proposal</title>
      </Head>

      <ProposalFormProvider
        bond={bond}
        projectId={projectId}
        proposalId={proposalId}
        initialData={initialData}
      >
        {(selectedStep) => (
          <>
            {selectedStep === 1 && <ProposalFormStepOne />}
            {selectedStep === 2 && <ProposalFormStepTwo />}
          </>
        )}
      </ProposalFormProvider>
    </>
  );
}

SendProposal.getLayout = function getLayout(page) {
  return <BaseLayout>{page}</BaseLayout>;
};

export async function getServerSideProps(context) {
  const { ['telosworks.user']: user } = parseCookies(context);

  const {
    slug: [projectId, proposalId],
  } = context.query;
  let initialData = {};

  let project = {};
  try {
    project = await showProjectService({ projectId });
  } catch (error) {
    return {
      redirect: {
        destination: `/projects/${projectId}?tab=proposals`,
        permanent: false,
      },
    };
  }

  if (!user) {
    return {
      redirect: {
        destination: `/projects/${projectId}?tab=information`,
        permanent: false,
      },
    };
  }

  if (proposalId === 'new') {
    return {
      props: {
        projectId: Number(projectId),
        bond: project.bond,
        proposalId: null,
        initialData,
      },
    };
  }

  try {
    const proposal = await showProposalService({
      proposalId,
    });

    if (!proposal || proposal.proposer !== user) {
      return {
        redirect: {
          destination: `/projects/${projectId}?tab=proposals`,
          permanent: false,
        },
      };
    }

    return {
      props: {
        projectId: Number(projectId),
        proposalId: Number(proposalId),
        bond: project.bond,
        initialData: proposal,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: `/projects/${projectId}?tab=proposals`,
        permanent: false,
      },
    };
  }
}
