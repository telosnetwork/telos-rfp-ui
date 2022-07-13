import { ProjectList } from '@components/projects/ProjectList';
import { ProjectsHighlighted } from '@components/projects/ProjectsHighlighted';

export function ProjectsMy({ projects, myHighlightedTabs }) {
  return (
    <>
      {Object.keys(myHighlightedTabs).length > 0 && (
        <ProjectsHighlighted tabs={myHighlightedTabs}>
          {({ startVoting, votingEnded, reviewReportMilestone }) => (
            <>
              {projects.startVoting.length > 0 && (
                <ProjectList
                  projects={projects.startVoting}
                  style={{ display: startVoting ? '' : 'none' }}
                />
              )}

              {projects.votingEnded.length > 0 && (
                <ProjectList
                  projects={projects.votingEnded}
                  style={{ display: votingEnded ? '' : 'none' }}
                />
              )}

              {projects.reviewReportMilestone.length > 0 && (
                <ProjectList
                  projects={projects.reviewReportMilestone}
                  style={{ display: reviewReportMilestone ? '' : 'none' }}
                />
              )}
            </>
          )}
        </ProjectsHighlighted>
      )}

      {projects.archived.length > 0 && (
        <ProjectList projects={projects.archived} />
      )}
    </>
  );
}
