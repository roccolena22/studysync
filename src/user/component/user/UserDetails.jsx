import Badge from "../Badge";

export default function UserDetails({ firstName, lastName, role, email }) {
    const fullName = `${firstName} ${lastName}`;

    return (
        <div className="flex flex-col items-start">
            <div className="flex space-x-1 items-center">
                {role && <Badge text={role.slice(0, 1)} />}
                <p>{fullName}</p>
            </div>
            <p className="text-xs pb-1">{email}</p>
        </div>
    )
}