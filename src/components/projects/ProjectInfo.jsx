import { format } from 'date-fns';
import { gatewayURL } from '@configs/pinataConfig';
import { Overline } from '@components/Overline';
import { useProject } from '@hooks/useProject';

export function ProjectInfo({ ...rest }) {
  const { project } = useProject();

  const deadlineDate = new Date(project.end_ts);
  const deadlineFormatted = format(deadlineDate, 'MM/dd/yyyy hh:mm aa');

  return (
    <div className="container" {...rest}>
      <div className="bg-blue-dark-2 p-6 md:p-12 rounded-2xl grid grid-cols-2 gap-12">
        <div className="col-span-2">
          <Overline title="More Information" icon="info" />
          <p className="body-1">
            <strong className="font-medium">Owner:</strong>{' '}
            {project.program_manager}
          </p>
          <p className="body-1">
            <strong className="font-medium">Deadline:</strong>{' '}
            {deadlineFormatted}
          </p>
          <p className="body-1">
            <strong className="font-medium">Proposal bond:</strong>{' '}
            {project.bond}
          </p>
          <p className="body-1">
            <strong className="font-medium">
              Amount of USD to be rewarded:
            </strong>{' '}
            {project.usd_rewarded}
          </p>
          <p className="body-1">
            <strong className="font-medium">
              How many proposals will be rewarded:
            </strong>{' '}
            {project.number_proposals_rewarded}
          </p>
          <p className="body-1">
            <strong className="font-medium">Additional documentation:</strong>{' '}
            <a
              href={`${gatewayURL}/${project.pdf}/?preview=1`}
              target="_blank"
              rel="noreferrer"
              className="truncate link"
            >
              {project.pdf}
            </a>
          </p>
        </div>
        <div className="col-span-2">
          <Overline title="Description" icon="description" />
          <p className="body-1">{project.description}</p>
        </div>
      </div>
    </div>
  );
}
