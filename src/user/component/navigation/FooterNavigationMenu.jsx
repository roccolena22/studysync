import IconAndName from "../user/IconAndName";

export default function FooterNavigationMenu() {

  return (
    <div className="flex justify-around w-full">
      <IconAndName
          label="dashboard"
          iconName="dashboard"
          pathname="/"
          isLink="true"
        />
      <IconAndName
          label="network"
          iconName="network"
          pathname="/network"
          isLink="true"
        />
        <IconAndName
          label="calendar"
          iconName="calendar"
          pathname="/calendar"
          isLink="true"
        />
    </div>
  );
}
