import { APP_NAME } from "@/data/constants";

export default function Logo({ invert = false }) {
    return (
        <div className="fxg-header__logo_wrapper fxg-header__logo">
            <span className="text-lg">
                <span className={`font-logo font-extrabold tracking-tighter  ${invert ? "text-fedex" : "text-white"}`}>{APP_NAME.parts[0]}</span>
                <span className="font-logo font-extrabold tracking-tighter  text-orange-500">{APP_NAME.parts[1]}<sub>®</sub></span>
            </span>
        </div>
    )
}