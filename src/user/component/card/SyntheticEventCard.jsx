import UserDetails from "../user/UserDetails"
import EventDetails from "./EventDetails"

export default function SyntheticEventCard({ event }) {
    return (
        <div>
            <div className="border-b border-gray-400">
                <UserDetails firstName={event.firstName} lastName={event.lastName} role={event.role} email={event.email} />
            </div>
            <EventDetails event={event} />
        </div>
    )
}