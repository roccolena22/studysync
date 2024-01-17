import IconAndName from "../user/IconAndName";

export default function FooterNavigationMenu() {
  return (
    <div className="flex justify-around w-full">
      <IconAndName label="dashboard" iconName="dashboard" pathname="/" />
      <IconAndName label="events" iconName="calendar" pathname="/events" />
      <IconAndName label="network" iconName="network" pathname="/network" />
    </div>
  );
}
