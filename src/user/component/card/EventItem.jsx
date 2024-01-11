export default function EventItem ({label, value}){
    return (
        <div>
            <p className="text-gray-600 font-semibold text-md">{label}</p>
            <span className="text-xs md:text-md">{value}</span>
        </div>
    )
}

