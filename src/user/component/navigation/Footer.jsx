import IconAndName from "../user/IconAndName";

export default function Footer() {
  return (
    <div className="flex items-center w-full bg-cyan-700 h-20 border-t border-cyan-800">
      <div className="flex justify-around w-full">
        <IconAndName label="dashboard" iconName="dashboard" pathname="/" />
        <IconAndName label="events" iconName="calendar" pathname="/events" />
        <IconAndName label="network" iconName="network" pathname="/network" />
      </div>
    </div>
  );
}
