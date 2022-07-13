import Head from 'next/head';

import { HeaderPage } from '@components/HeaderPage';
import { MainLayout } from '@layouts/MainLayout';
import { Proposals } from '@components/Proposals';
import { ProjectHeader } from '@components/projects/ProjectHeader';
import { ProjectTabs } from '@components/projects/ProjectTabs';
import { ProjectInfo } from '@components/projects/ProjectInfo';
import { isDraft } from '@utils/projectStatus';
import { handleProposalsPeriodEnded } from '@utils/handleProposalsPeriodEnded';
import { showProjectService } from '@services/projects/showProjectService';
import { listMilestonesService } from '@services/milestones/listMilestonesService';
import { Progress } from '@components/Progress';
import { ProjectProvider } from '@contexts/ProjectContext';

export default function Project({
  project,
  subtitle,
  hasProposalsPeriodEnded,
  hasVotingPeriodEnded,
  milestones,
}) {
  return (
    <ProjectProvider
      project={project}
      hasProposalsPeriodEnded={hasProposalsPeriodEnded}
      hasVotingPeriodEnded={hasVotingPeriodEnded}
      milestones={milestones}
    >
      <Head>
        <title>Telos Build - {project.title}</title>
      </Head>

      <HeaderPage title={project.title} subtitle={subtitle}>
        <ProjectHeader />
      </HeaderPage>

      <ProjectTabs>
        {({ information, proposals, progress }) => (
          <>
            <ProjectInfo style={{ display: information ? '' : 'none' }} />
            <Proposals style={{ display: proposals ? '' : 'none' }} />
            <Progress style={{ display: progress ? '' : 'none' }} />
          </>
        )}
      </ProjectTabs>
    </ProjectProvider>
  );
}

Project.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export async function getServerSideProps(context) {
  try {
    const { id: projectId } = context.params;

    const project = await showProjectService({
      projectId,
    });

    if (!project || isDraft(project.status)) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    const { message, hasProposalsPeriodEnded, hasVotingPeriodEnded } =
      handleProposalsPeriodEnded({
        status: project.status,
        proposeEnd: project.propose_end_ts,
        voteEnd: project.vote_end_ts,
        projectStart: project.start_ts,
      });

    const milestones = await listMilestonesService({ projectId });

    return {
      props: {
        project,
        subtitle: message,
        hasProposalsPeriodEnded,
        hasVotingPeriodEnded,
        milestones,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
}
