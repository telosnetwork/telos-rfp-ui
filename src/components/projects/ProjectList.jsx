import { useRouter } from 'next/router';
import { CardProject } from '@components/CardProject';
import { useAuth } from '@hooks/useAuth';
import { projectStatus, isDraft } from '@utils/projectStatus';
import { publishProjectService } from '@services/projects/publishProjectService';

export function ProjectList({ projects, overline, ...rest }) {
  const router = useRouter();
  const { isProgramManager } = useAuth();

  function handleLink({ status, programManager, projectId }) {
    if (!isDraft(status)) {
      router.push(`/projects/${projectId}`);
      return;
    }

    if (!isProgramManager && user !== programManager) {
      return;
    }

    router.push(`/projects/form/${projectId}`);
  }

  async function onPublish(event, project_id) {
    event.stopPropagation();

    try {
      await publishProjectService({
        projectId: project_id,
      });
      router.reload();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      className={`mb-8 ${!!overline && 'pt-6 pb-12 bg-blue-dark-3'}`}
      {...rest}
    >
      {overline && <div className="container">{overline}</div>}
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
        {projects.map((item) => (
          <div key={item.project_id} className="col-span-1">
            <CardProject
              title={item.title}
              subtitle={projectStatus[item.status]}
              message={item.message}
              onClick={() =>
                handleLink({
                  status: item.status,
                  programManager: item.program_manager,
                  projectId: item.project_id,
                })
              }
            >
              {isDraft(item.status) && (
                <div className="flex flex-row">
                  <button
                    type="button"
                    className="btn btn--secondary mr-2"
                    onClick={(event) => onPublish(event, item.project_id)}
                  >
                    Publish
                  </button>
                </div>
              )}
            </CardProject>
          </div>
        ))}
      </div>
    </div>
  );
}
