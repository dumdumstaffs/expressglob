const TabLink = ({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) => (
    <a
        className={`
        border-solid border-0 border-b-[3px] cursor-pointer 
        px-6 sm:px-16 py-2 text-gray-600 
        text-xs sm:text-sm font-semibold
        ${active ? "border-fedex/90 text-fedex" : "border-transparent"}
    `}
        onClick={onClick}
    >
        {label}
    </a>
)

export default TabLink