import Link from "next/link"

type Props = {
    href: string,
    title: string
}

export const FooterLink = ({ href, title }: Props) => {
    return (
        <div className="button_v1 section">
            <div className="link    ">
                {/* Link in not using New FDL and Using Target  */}
                {/* Link in not using New FDL and Not Using Target  */}
                <Link href={href}>
                    <a
                        aria-label={title}
                        title={title}
                        target="_self"
                        className="fxg-link js-fxgc-init default"
                        style={{ color: "inherit" }}
                    >
                        {title}
                    </a>
                </Link>
                <input
                    type="hidden"
                    defaultValue='<div class="alert alert-danger">Image is not internal. Cannot convert SVG to code.</div>'
                    id="fxg-externalIconPath"
                />
            </div>
        </div>
    )
}