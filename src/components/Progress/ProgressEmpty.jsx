import { useProject } from '@hooks/useProject';
import { isCancelled } from '@utils/projectStatus';

export function ProgressEmpty() {
  const { project } = useProject();

  const message = isCancelled(project.status)
    ? 'No proposal to execute this project was selected'
    : 'No proposal has been chosen to execute this project yet';

  return (
    <div className="flex flex-col items-center justify-center px-6 py-32 text-center bg-blue-dark-2 rounded-2xl">
      <h1 className="heading-2">{message}</h1>
    </div>
  );
}
