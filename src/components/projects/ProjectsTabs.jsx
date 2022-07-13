import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Tab } from '@components/Tab';
import { useAuth } from '@hooks/useAuth';

export function ProjectsTabs({ children }) {
  const router = useRouter();
  const { isProgramManager } = useAuth();

  const tab = router.query.tab;
  const activeTabs = {
    my: tab === 'my',
    other: tab === 'other',
  };
  const tabs = [
    {
      label: 'My Projects',
      onClick: () => {
        router.push(`/?tab=my`, undefined, {
          shallow: true,
        });
      },
      isActive: activeTabs.my,
    },
    {
      label: 'Other Projects',
      onClick: () => {
        router.push(`/?tab=other`, undefined, {
          shallow: true,
        });
      },
      isActive: activeTabs.other,
    },
  ];

  useEffect(() => {
    if (isProgramManager) {
      const tabs = ['my', 'other'];
      const isTabExists = tabs.some((item) => item === tab);
      if (!isTabExists) {
        router.push(`/?tab=my`, undefined, {
          shallow: true,
        });
      }
    }
  }, [tab, isProgramManager, router]);

  return (
    <>
      <div className="container">
        <Tab tabs={tabs} />
      </div>
      {children && children(activeTabs)}
    </>
  );
}
