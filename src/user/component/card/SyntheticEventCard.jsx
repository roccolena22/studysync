import UserDetails from "../user/UserDetails"

export default function SyntheticEventCard({ event }) {
    return (
        <div>
            <div className="border-b border-zinc-400">
                <UserDetails user={event} />
            </div>
            <div className="pt-4">
                <div className="space-x-1"><span className="font-semibold">Title:</span><span>{event.title}</span></div>
                <div className="space-x-1"><span className="font-semibold">Mode:</span><span>{event.mode}</span></div>
            </div>
        </div>
    )
}