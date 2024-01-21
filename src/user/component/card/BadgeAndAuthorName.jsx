import Badge from "../shared/Badge";

export default function BadgeAndAuthorName ({fullName, role}){
    return(
        <div className="flex space-x-1 items-center">
        {role && <Badge text={role.slice(0, 1)} />}
        <p>{fullName}</p>
      </div>
    )
}