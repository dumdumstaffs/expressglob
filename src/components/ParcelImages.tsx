import useWindowDimensions from "@/hooks/useWindowDimensions"
import { useState } from "react"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { Image } from "@/types/shipment"

const ParcelImages = ({ images }: { images: Image[] }) => {
    const isSmall = useMediaQuery("(max-width: 640px)")
    const { width: windowWidth } = useWindowDimensions()

    const width = isSmall ? windowWidth : windowWidth * (8 / 12)

    const [active, setActive] = useState(0)

    return (
        <div className="pods_container">
            <div className="fxg-pods fxg-pods--fixed">
                <div className="fxg-wrapper container">
                    <div className="row fxg-swipe fxg-swipe--active" style={{ height: "auto", visibility: "visible" }}>
                        <div className="fxg-swipe__wrapper mb-12" style={{ width: width * images.length, left: "0px" }}>
                            {
                                images?.map((image, i) => (
                                    <CarouselItem
                                        key={image.id}
                                        {...image}
                                        index={i}
                                        active={active === i}
                                        next={(active + 1) % images.length === i}
                                        width={width}
                                    />
                                ))
                            }
                        </div>
                        <ul className="fxg-slider__indecators">
                            {
                                images?.map((_, i) => (
                                    <li key={i} className={`fxg-slider__indecator w-4 h-4 !rounded-full ${active === i ? "active" : ""}`} onClick={() => setActive(i)} />
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

type CarouselItemProps = Image & {
    width: number,
    index: number,
    active: boolean,
    next: boolean
}

const CarouselItem = ({ url, width, index, active, next }: CarouselItemProps) => (
    <div
        className="fxg-col fxg-swipe__item col-sm-4 overflow-hidden w-full"
        style={{
            width: width,
            height: 320,
            left: -index * width,
            transitionDuration: "300ms",
            transform: `translate(${active ? 0 : next ? width : -width}px, 0px) translateZ(0px)`,
            zIndex: (active || next) ? 1 : -100,
        }}
    >
        <div className="img-wrapper w-full h-full">
            <img
                className="fxg-img h-full object-cover"
                style={{ width: Math.min(width - 30, 480) }}
                src={url}
                alt=""
                aria-hidden="true"
            />
        </div>
        <p className="absoulte bg-red-400 p-12 font-lg">Hello world</p>
        {/* <a
            href={url}
            download
            target="_self"
            className="fxg-link js-fxgc-init fxg-link--rounded_button fxg-button--round carouselsetting my-5"
            style={{ maxHeight: 72, overflow: "hidden" }}
        >
            Save
        </a> */}
    </div>
)

export default ParcelImages