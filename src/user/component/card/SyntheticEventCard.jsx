import UserDetails from "../user/UserDetails"
import EventDetails from "./EventDetailts"

export default function SyntheticEventCard({ event }) {
    return (
        <div>
            <div className="border-b border-slate-400">
                <UserDetails user={event} />
            </div>
               <EventDetails event={event}/>
        </div>
    )
}