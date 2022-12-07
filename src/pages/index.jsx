import Head from 'next/head';
import Link from 'next/link';
import { MainLayout } from '@layouts/MainLayout';
import { HeaderPage } from '@components/HeaderPage';
import { ProjectEmpty } from '@components/projects/ProjectEmpty';
import { ProjectsTabs } from '@components/projects/ProjectsTabs';
import { useAuth } from '@hooks/useAuth';
import { useProjects } from '@hooks/useProjects';
import { ProjectsOther } from '@components/projects/ProjectsOther';
import { ProjectsMy } from '@components/projects/ProjectsMy';

export default function Projects() {
  const { isProgramManager } = useAuth();
  const { projects, isLoading, myHighlightedTabs, otherHighlightedTabs } =
    useProjects();

  const title = 'Telos Build - Projects';

  if (isLoading) {
    return (
      <>
        <Head>
          <title>{title}</title>
        </Head>
        <div className="flex justify-center items-center h-[calc(100vh-4.5rem)]">
          <div className="loader"></div>
        </div>
      </>
    );
  }

  if (Object.keys(projects).length === 0) {
    return (
      <>
        <Head>
          <title>{title}</title>
        </Head>
        <ProjectEmpty />
      </>
    );
  }

  if (!isProgramManager) {
    return (
      <>
        <Head>
          <title>{title}</title>
        </Head>
        <HeaderPage title="Projects" />
        <ProjectsOther
          projects={projects.other}
          otherHighlightedTabs={otherHighlightedTabs}
        />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <HeaderPage title="Projects">
        {isProgramManager && (
          <Link href="/projects/form/new" className="btn btn--primary">
            Create Project
          </Link>
        )}
      </HeaderPage>
      <ProjectsTabs>
        {({ my, other }) => (
          <>
            <div style={{ display: my ? '' : 'none' }}>
              <ProjectsMy
                projects={projects.my}
                myHighlightedTabs={myHighlightedTabs}
              />
            </div>

            <div style={{ display: other ? '' : 'none' }}>
              <ProjectsOther
                projects={projects.other}
                otherHighlightedTabs={otherHighlightedTabs}
              />
            </div>
          </>
        )}
      </ProjectsTabs>
    </>
  );
}

Projects.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
