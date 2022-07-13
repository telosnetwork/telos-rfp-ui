import { useState, useMemo } from 'react';

export function ProjectsHighlighted({ tabs, children, ...rest }) {
  const tabsKeys = Object.keys(tabs);
  const firstLabel = Object.values(tabs)[0];
  const [allTabs, setAllTabs] = useState(() => handleTabs(firstLabel));

  const tabOptions = useMemo(() => {
    const result = {};
    allTabs.forEach((item) => {
      result[item.key] = item.isActive;
    });
    return result;
  }, [allTabs]);

  function handleTabs(label) {
    return tabsKeys.map((tab) => ({
      label: tabs[tab],
      onClick: () => setAllTabs(handleTabs(tabs[tab])),
      key: tab,
      isActive: tabs[tab] === label,
    }));
  }

  return (
    <div className="mb-8 pt-3 pb-12 bg-blue-dark-3" {...rest}>
      <div className="container flex flex-row mb-3">
        {allTabs.map((tab) => (
          <div key={tab.label} onClick={tab.onClick} className="p-1">
            <span
              className={`block cursor-pointer py-[0.438rem] px-4 h-9 text-sm font-medium relative rounded-full border ${
                tab.isActive
                  ? 'text-white border-blue-light'
                  : 'text-blue-light md:hover:text-white border-blue-dark-3'
              }`}
            >
              {tab.label}
            </span>
          </div>
        ))}
      </div>
      {children && children(tabOptions)}
    </div>
  );
}
