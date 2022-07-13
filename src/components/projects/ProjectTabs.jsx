import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Tab } from '@components/Tab';

export function ProjectTabs({ children }) {
  const router = useRouter();

  const projectId = router.query.id;
  const tab = router.query.tab;
  const activeTabs = {
    information: tab === 'information',
    proposals: tab === 'proposals',
    progress: tab === 'progress',
  };
  const tabs = [
    {
      label: 'Information',
      onClick: () => {
        router.push(`/projects/${projectId}?tab=information`, undefined, {
          shallow: true,
        });
      },
      isActive: activeTabs.information,
    },
    {
      label: 'Proposals',
      onClick: () => {
        router.push(`/projects/${projectId}?tab=proposals`, undefined, {
          shallow: true,
        });
      },
      isActive: activeTabs.proposals,
    },
    {
      label: 'Progress',
      onClick: () => {
        router.push(`/projects/${projectId}?tab=progress`, undefined, {
          shallow: true,
        });
      },
      isActive: activeTabs.progress,
    },
  ];

  useEffect(() => {
    const tabs = ['information', 'proposals', 'progress'];
    const isTabExists = tabs.some((item) => item === tab);
    if (!isTabExists) {
      router.replace(`/projects/${projectId}?tab=information`, undefined, {
        shallow: true,
      });
    }
  }, [router, projectId, tab]);

  return (
    <>
      <div className="container">
        <Tab tabs={tabs} />
      </div>
      {children && children(activeTabs)}
    </>
  );
}
