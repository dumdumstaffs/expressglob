const ParcelNotFound = () => (
    <div className="mx-auto w-full sm:w-8/12">
        <div className="text-center mt-24">
            <DangerIcon />
            <p className="font-thin text-xl">
                No record of this tracking number can be found at this time, please check the number and try again later.
                For further assistance, please contact <a className="text-gray-800 font-thin underline">Customer Service</a>.
            </p>
            <p className="font-thin text-lg sm:text-2xl text-gray-800 mt-24">Watch List</p>
            <p className="font-medium mt-8 text-sm"> You do not currently have any Watch list shipments.</p>
        </div>
    </div>
)

const DangerIcon = () => (
    <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 512 512"
        xmlSpace="preserve"
        className="text-red-500 fill-current mb-6"
        width="30px"
        height="30px"
    >
        <g>
            <g>
                <path d="M256,34.297L0,477.703h512L256,34.297z M256,94.301l204.036,353.4H51.965L256,94.301z" />
            </g>
        </g>
        <g>
            <g>
                <circle cx={256} cy="397.7" r="15.001" />
            </g>
        </g>
        <g>
            <g>
                <rect x="240.998" y="192.685" width="30.002" height="160.012" />
            </g>
        </g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
    </svg>
)

export default ParcelNotFound