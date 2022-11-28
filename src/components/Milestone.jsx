import { useState } from 'react';
import Link from 'next/link';
import { differenceInCalendarDays, compareAsc, format } from 'date-fns';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { Overline } from '@components/Overline';
import { useProject } from '@hooks/useProject';
import { useAuth } from '@hooks/useAuth';
import { isStarted } from '@utils/projectStatus';
import { reviewReportService } from '@services/milestones/reviewReportService';

export function Milestone({
  milestoneId,
  status,
  telosRewarded,
  title,
  description,
  documents,
  startDate,
  endDate,
  sendDate,
  reviewDate,
}) {
  const { project } = useProject();
  const { user, isAuthenticated, isProgramManager } = useAuth();

  const [expand, setExpand] = useState(false);

  const todayDate = new Date();
  const projectStartDate = new Date(project.start_ts);
  const milestoneStartDate = new Date(startDate);
  const milestoneEndDate = new Date(endDate);
  const sendReportDate = new Date(sendDate);
  const reviewReportDate = new Date(reviewDate);

  const sendReportDateFormatted = format(sendReportDate, 'MM/dd/yyyy hh:mm aa');
  const milestoneStartDateFormatted = format(
    milestoneStartDate,
    'MM/dd/yyyy hh:mm aa'
  );
  const milestoneEndDateFormatted = format(
    milestoneEndDate,
    'MM/dd/yyyy hh:mm aa'
  );

  const days = differenceInCalendarDays(milestoneEndDate, projectStartDate);

  const isUnlocked =
    compareAsc(todayDate, milestoneStartDate) === 1 &&
    compareAsc(todayDate, milestoneEndDate) === -1;

  const isSentOnTime =
    compareAsc(sendReportDate, milestoneStartDate) === 1 &&
    compareAsc(sendReportDate, milestoneEndDate) === -1;

  const hasReportButton =
    isAuthenticated &&
    user === project.project_manager &&
    isStarted(project.status) &&
    title === '' &&
    compareAsc(todayDate, milestoneStartDate) === 1 &&
    compareAsc(todayDate, milestoneEndDate) === -1;

  const isWaitingForProgramManager =
    user !== project.program_manager &&
    isStarted(project.status) &&
    title != '' &&
    compareAsc(projectStartDate, sendReportDate) === -1 &&
    compareAsc(sendReportDate, reviewReportDate) === 1;

  const hasReviewReport =
    isProgramManager &&
    user === project.program_manager &&
    isStarted(project.status) &&
    compareAsc(todayDate, milestoneEndDate) === 1 &&
    compareAsc(sendReportDate, reviewReportDate) === 1 &&
    title != '';

  async function onReviewReport(sendReward) {
    try {
      const payReward = isSentOnTime ? sendReward : false;
      await reviewReportService({
        projectId: project.project_id,
        milestoneId,
        payReward,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="mb-4 md:mb-8 group">
      <div className="bg-blue-dark-2 p-6 md:p-12 rounded-2xl flex flex-row justify-between items-start">
        <div className="flex flex-row">
          <div className="text-center mr-2 md:mr-8 w-[4.25rem]">
            <p className="heading-1 py-1 md:py-[0.125rem]">{days}</p>
            <p className="body-1">Days</p>
          </div>
          <div>
            <h2 className="heading-1 py-1 md:py-[0.125rem] truncate">
              {title ? title : <>{isUnlocked ? 'Unlocked' : 'Locked'}</>}
            </h2>
            <p className="body-1">
              {title
                ? `Sent ${sendReportDateFormatted}`
                : `Send the report between ${milestoneStartDateFormatted} and ${milestoneEndDateFormatted}`}
            </p>
          </div>
        </div>
        <div className="flex flex-row">
          <div
            className={`mr-2 ${
              expand ? '' : 'md:group-hover:flex flex-row md:hidden'
            }`}
          >
            {hasReportButton && (
              <Link
                href={`/projects/reports/${project.project_id}/${milestoneId}`}
                className="btn btn--primary"
              >
                Send Report
              </Link>
            )}
            {hasReviewReport && (
              <>
                <button
                  type="button"
                  className="btn btn--tertiary mr-2"
                  onClick={() => onReviewReport(false)}
                >
                  Cancel reward
                </button>
                <button
                  type="button"
                  className="btn btn--secondary"
                  onClick={() => onReviewReport(true)}
                >
                  Send Reward
                </button>
              </>
            )}
            {isWaitingForProgramManager && (
              <div className="text-right">
                <span className="heading-3">Waiting</span>
                <span className="body-2">for Program Manager</span>
              </div>
            )}
          </div>
          {(documents || description) && (
            <button
              type="button"
              className="btn btn--tertiary btn--square"
              onClick={() => setExpand(!expand)}
            >
              {expand ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
            </button>
          )}
        </div>
      </div>
      <div
        className={`bg-blue-dark-2 p-6 md:p-12 rounded-2xl mt-[1px] grid grid-cols-2 gap-12 ${
          expand ? '' : 'hidden'
        }`}
      >
        <div className="col-span-2 md:col-span-1">
          {documents && (
            <>
              <Overline title="Document" icon="file" />
              <a
                href={documents}
                target="_blank"
                rel="noreferrer"
                className="body-1 link mb-2"
              >
                See document
              </a>
            </>
          )}
          <Overline title="Description" icon="description" />
          {description && <p className="body-1">{description}</p>}
        </div>
      </div>
    </div>
  );
}
