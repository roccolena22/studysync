import commonTranslations from "../translations/commonTranslations";

export default function PasswordRequirement(): JSX.Element {
  const { label, items } = commonTranslations.passwordRequirements;

  return (
    <div className="text-slate-500 text-xs py-2">
      <p className="font-bold mb-1">{label}</p>
      <ul className="list-disc pl-6">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
