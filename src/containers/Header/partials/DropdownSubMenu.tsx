import Link from "next/link"

export type SubMenuProps = {
    title: string,
    href: string,
}

export const DropdownSubMenuItem = ({ href, title, isFirst }: SubMenuProps & { isFirst?: boolean }) => (
    isFirst ? (
        <>
            <div className="button_v1 aem-GridColumn aem-GridColumn--default--12">
                <div className="link fxg-tablet--hide fxg-mobile--hide">
                    <Link href={href}>
                        <a
                            aria-label={title}
                            title={title}
                            target="_self"
                            className="fxg-link js-fxgc-init default fxg-tablet--hide fxg-mobile--hide"
                            style={{ color: "inherit" }}
                        >
                            {title}
                        </a>
                    </Link>
                </div>
            </div>
            <div className="button_v1 aem-GridColumn aem-GridColumn--default--12">
                <div className="link fxg-desktop--hide">
                    <Link href={href}>
                        <a
                            aria-label={title}
                            title={title}
                            target="_self"
                            className="fxg-link js-fxgc-init default fxg-desktop--hide"
                            style={{ color: "inherit" }}
                        >
                            {title}
                        </a>
                    </Link>
                </div>
            </div>
        </>
    ) : (
        <div className="button_v1 aem-GridColumn aem-GridColumn--default--12">
            <div className="link">
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
            </div>
        </div>
    )
)

export const DropdownSubMenuFooter = ({ href, title }: SubMenuProps) => (
    <div className="button_v1 aem-GridColumn aem-GridColumn--default--12">
        <div className="link">
            <Link href={href}>
                <a
                    aria-label={title}
                    title={title}
                    target="_self"
                    className="fxg-link js-fxgc-init fxg-link--blue"
                    style={{ color: "inherit" }}
                >
                    {title}
                </a>
            </Link>
        </div>
    </div>
)

export const DropdownSubMenuRichText = ({ href, title, desc }: SubMenuProps & { desc: string }) => (
    <div className="button_v1 aem-GridColumn aem-GridColumn--default--12">
        <div className="richtext parbase aem-GridColumn aem-GridColumn--default--12">
            <div
                className="fxg-rte"
                style={{ color: "" }}
            >
                <p>
                    <span className="fxg-font-size-14">
                        <Link href={href}>
                            <a
                                aria-label={title}
                                title={title}
                            >
                                {title}
                            </a>
                        </Link>{" "}
                        {desc}
                    </span>
                </p>
            </div>
        </div>
    </div>
)