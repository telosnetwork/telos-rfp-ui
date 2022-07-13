import { useState, useEffect, useRef } from 'react';
import { Overline } from '@components/Overline';
import Modal from '@components/Modal';

export function ProposalMilestone({ milestones }) {
  const modalRef = useRef(null);
  const [timeline, setTimeline] = useState([]);
  const [index, setIndex] = useState(0);

  const milestone = milestones[index] || {};
  let milestoneMarginLeft = 25;
  const milestoneWeekWidth = 160;
  const milestoneDayWidth = milestoneWeekWidth / 7;

  useEffect(() => {
    const totalDays = milestones.reduce((acc, cur) => {
      return acc + Number(cur.days);
    }, 0);
    const totalWeeks = Math.ceil(totalDays / 7) + 1; // Ensures there is always one week at the end

    const mappedTimeline = [];
    for (let week = 0; week < totalWeeks; week++) {
      if (week === 0) {
        mappedTimeline.push('Project Start');
      } else {
        mappedTimeline.push('');
        mappedTimeline.push(`${week} week`);
      }
    }
    setTimeline(mappedTimeline);
  }, [milestones]);

  function handleMarginLeft(index) {
    const lastMilestone = milestones[index - 1];
    if (lastMilestone) {
      const lastMilestoneWidth = Number(lastMilestone.days) * milestoneDayWidth;
      milestoneMarginLeft = milestoneMarginLeft + lastMilestoneWidth;
    }
    return milestoneMarginLeft + 'px';
  }

  function onPrevMilestone() {
    const prevIndex = index - 1;
    if (typeof milestones[prevIndex] === 'undefined') {
      setIndex(milestones.length - 1);
    } else {
      setIndex(prevIndex);
    }
  }

  function onNextMilestone() {
    const nextIndex = index + 1;
    if (typeof milestones[nextIndex] === 'undefined') {
      setIndex(0);
    } else {
      setIndex(nextIndex);
    }
  }

  return (
    <>
      <Overline title="Proposed timeline" icon="calendar" />
      <div className="w-full relative overflow-auto">
        <div className="flex flex-col flex-nowrap relative z-10 pt-2 pb-16">
          {milestones.map((item, index) => (
            <div
              key={index}
              className="flex-none bg-blue-dark-1 p-2 cursor-pointer duration-300 md:hover:scale-110 md:hover:shadow-xl"
              style={{
                marginLeft: handleMarginLeft(index),
                width: Number(item.days) * milestoneDayWidth + 'px',
              }}
              onClick={() => {
                setIndex(index);
                modalRef.current.openModal();
              }}
            >
              <h3 className="body-1 !text-white truncate">{item.title}</h3>
              <p className="body-2">{item.amount}</p>
            </div>
          ))}
        </div>
        <div className="absolute top-0 left-0 w-full h-full flex flex-row flex-nowrap">
          {timeline.map((item, index) => (
            <div
              key={index}
              className="flex-none flex flex-row justify-center items-end relative w-12
                  text-center mx-4 first-of-type:ml-0 last-of-type:mr-0
                  before:content-[''] before:w-[1px] before:h-full before:bg-blue-light
                  before:absolute before:top-0 before:left-1/2"
            >
              {item && (
                <span className="body-2 !font-medium bg-blue-dark-2 relative z-10 pt-2">
                  {item}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <Modal
        ref={modalRef}
        title={milestone?.title || ''}
        support={`${milestone?.amount || ''} • ${milestone?.days || ''} days`}
      >
        <>
          <div className="p-6">
            <p className="body-1">{milestone.description}</p>
          </div>
          <div className="border-t border-blue-dark-2 flex flex-row text-center">
            <button
              type="button"
              className="flex-1 p-6 heading-3 cursor-pointer duration-150 md:hover:bg-blue-dark-2"
              onClick={onPrevMilestone}
            >
              Prev
            </button>
            <button
              type="button"
              className="flex-1 p-6 heading-3 cursor-pointer duration-150 md:hover:bg-blue-dark-2"
              onClick={onNextMilestone}
            >
              Next
            </button>
          </div>
        </>
      </Modal>
    </>
  );
}
