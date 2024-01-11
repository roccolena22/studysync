export default function EventItem ({label, value}){
    return (
        <div>
            <p className="text-gray-600 font-semibold sm:text-lg">{label}</p>
            <span className="text-xs md:text-md">{value}</span>
        </div>
    )
}

