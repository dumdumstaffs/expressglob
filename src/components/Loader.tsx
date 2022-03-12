import tabStyles from "@/styles/modules/tab.module.scss"

type LoaderProps = {
    size?: "small" | "large"
}

export const Loader = ({ size = "large" }: LoaderProps) => (
    <div className={tabStyles.container} style={{ height: size === "small" ? 120 : 240 }}>
        <div className={tabStyles.loader} style={{
            height: size === "small" ? "12em" : "24em",
            width: size === "small" ? "12em" : "24em"
        }} />
    </div>
)

type LoaderErrorProps = LoaderProps & {
    message?: string
}

export const LoaderError = ({ size = "large", message = "Something went wrong" }: LoaderErrorProps) => (
    <div className="w-full bg-white flex justify-center items-center" style={{ height: size === "small" ? 120 : 240 }}>
        <div className="bg-fedex-bg text-gray-800 text-sm pl-14 pr-4 py-4 text-left relative w-full mx-4 max-w-lg">
            <p className="absolute top-4 left-6 border-solid border rounded-full w-5 h-5 text-sm font-bold text-center">i</p>
            {message}
        </div>
    </div>
)