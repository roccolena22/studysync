import ExternalLink from "../../../shared/component/ExternalLink";

export default function ItemCard({ label, text, link }) {
  return (
    <div>
      <p className="text-gray-700 font-semibold sm:text-md md:text-lg">
        {label}
      </p>
      {text && <span className="text-xs md:text-md">{text}</span>}
      {link && <ExternalLink link={link} />}
    </div>
  );
}
