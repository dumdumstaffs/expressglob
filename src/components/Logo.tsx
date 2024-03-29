export default function Logo({ invert = false }) {
  return (
    <div className="fxg-header__logo_wrapper fxg-header__logo">
      <span className="text-lg">
        <span
          className={`font-logo font-extrabold tracking-tighter  ${
            invert ? "text-fedex" : "text-white"
          }`}
        >
          Express
        </span>
        <span className="font-logo font-extrabold tracking-tighter  text-orange-500">
          Glob<sub>®</sub>
        </span>
      </span>
    </div>
  );
}
