import IconAndName from "../user/IconAndName";

export default function FooterNavigationMenu() {

  return (
    <div className="flex justify-around w-full">
      <IconAndName
          label="dashboard"
          iconName="dashboard"
          pathname="/"
        />
      <IconAndName
          label="network"
          iconName="network"
          pathname="/network"
        />
        <IconAndName
          label="calendar"
          iconName="calendar"
          pathname="/calendar"
        />
    </div>
  );
}
