import {
  FiPaperclip,
  FiInfo,
  FiFileText,
  FiCalendar,
  FiSmile,
  FiList,
  FiMenu,
  FiHeart,
} from 'react-icons/fi';

export function Overline({ title, icon }) {
  const iconComponent = {
    file: <FiPaperclip size={20} />,
    info: <FiInfo size={20} />,
    description: <FiFileText size={20} />,
    calendar: <FiCalendar size={20} />,
    smile: <FiSmile size={20} />,
    list: <FiList size={20} />,
    menu: <FiMenu size={20} />,
    heart: <FiHeart size={20} />,
  };

  return (
    <div className="flex flex-row items-center text-white mb-4">
      {icon && iconComponent[icon]}
      <h4 className="text-sm font-medium text-white uppercase ml-2">{title}</h4>
    </div>
  );
}
