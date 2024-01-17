export default function EventItem ({label, text, link}){
    const maxLengthLink = 12;

    return (
        <div>
            <p className="text-gray-700 font-semibold sm:text-md md:text-lg w-full">{label}</p>
            {text && (
                <span className="text-xs md:text-md">
                    {text}
                </span>
            )}
            {link && (
                <a href={link} className="text-xs md:text-md text-cyan-700 cursor-pointer underline">
                    {link.length > maxLengthLink ? link.slice(0, maxLengthLink) + "..." : link}
                </a>
            )}
        </div>
    );
}
