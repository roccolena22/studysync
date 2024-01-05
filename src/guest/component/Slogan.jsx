export default function Slogan({firstPart, highlightedPart, secondPart}) {
    return (
        <div class="text-2xl font-semibold italic text-center text-white pb-8">
{firstPart}
            <span class="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-cyan-800 relative inline-block text-white">
                <span class="relative text-white">{highlightedPart}</span>
            </span>
{secondPart}
        </div>
    )
}