import Badge from "../Badge";

export default function UserDetails({ user }) {
    const fullName = `${user.firstName} ${user.lastName}`;

    return (
        <div className="flex flex-col items-start">
            <div className="flex space-x-1 items-center">
                <div>
                    <Badge text={user.role.slice(0, 1)} />
                </div>
                    <p>{fullName}</p>
            </div>
            <p className="text-xs pb-1">{user.email}</p>
        </div>
    )
}