import { ProjectList } from '@components/projects/ProjectList';
import { ProjectsHighlighted } from '@components/projects/ProjectsHighlighted';

export function ProjectsOther({ projects, otherHighlightedTabs }) {
  return (
    <>
      {Object.keys(otherHighlightedTabs).length > 0 && (
        <ProjectsHighlighted tabs={otherHighlightedTabs}>
          {({ voting, acceptingProposals, reportMilestone }) => (
            <>
              {projects.voting.length > 0 && (
                <ProjectList
                  projects={projects.voting}
                  style={{ display: voting ? '' : 'none' }}
                />
              )}

              {projects.acceptingProposals.length > 0 && (
                <ProjectList
                  projects={projects.acceptingProposals}
                  style={{ display: acceptingProposals ? '' : 'none' }}
                />
              )}

              {projects.reportMilestone.length > 0 && (
                <ProjectList
                  projects={projects.reportMilestone}
                  style={{ display: reportMilestone ? '' : 'none' }}
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
