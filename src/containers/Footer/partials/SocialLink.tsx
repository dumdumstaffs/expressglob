import Link from "next/link"
import { useEffect, useState } from "react"

type Props = {
    href: string,
    label: string,
    iconName: string
}

export const SocialLink = ({ href, label, iconName }: Props) => {
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if (loaded) return
        setLoaded(true)
    }, [])

    if (!loaded) return null

    return (
        <div className="icon_link parbase section">
            <Link href={href}>
                <a
                    target="_self"
                    aria-label={label}
                    className="fxg-link"
                >
                    <img
                        src="/images/resources/sprite-placeholder.png"
                        alt=""
                        width=""
                        height=""
                        className={`fxg-icon fxg-icon--${iconName}`}
                    />
                </a>
            </Link>
        </div>
    )
}