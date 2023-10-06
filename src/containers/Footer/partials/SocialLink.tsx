type Props = {
  label: string;
  iconName: string;
};

export const SocialLink = ({ label, iconName }: Props) => {
  return (
    <div className="icon_link parbase section">
      <a target="_self" aria-label={label} className="fxg-link">
        <img
          src="/images/resources/sprite-placeholder.png"
          alt=""
          width=""
          height=""
          className={`fxg-icon fxg-icon--${iconName}`}
        />
      </a>
    </div>
  );
};
