import ExternalLink from "../../../shared/component/ExternalLink";
import Icon from "../../../shared/component/Icon";

export default function EventItem({ label, text, link, iconName }) {
  return (
    <div>
      <div className="flex items-center space-x-1">
        <p className="text-gray-700 font-semibold sm:text-md md:text-lg">
          {label}
        </p>
        <Icon name={iconName} />
      </div>
      {text && <span className="text-xs md:text-md">{text}</span>}
      {link && <ExternalLink link={link} paste />}
    </div>
  );
}
