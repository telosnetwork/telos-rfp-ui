import { TabItem } from '@components/TabItem';

export function Tab({ tabs }) {
  return (
    <div className="bg-blue-dark-2 p-1 rounded-full mb-8 flex md:inline-flex flex-row flex-nowrap overflow-auto">
      {tabs.map((tabItem, tabIndex) => (
        <TabItem
          key={tabItem + tabIndex}
          label={tabItem.label}
          onClick={tabItem.onClick}
          isActive={tabItem.isActive}
        />
      ))}
    </div>
  );
}
