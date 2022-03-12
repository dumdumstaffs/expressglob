import { useEffect, useState } from "react";


const getWindowDimensions = () => {
    if (typeof window === 'undefined') return { width: 0, height: 0 }

    return {
        width: window.innerWidth,
        height: window.innerHeight
    };
}

export default function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 })

    useEffect(() => {
        const handleResize = () => setWindowDimensions(getWindowDimensions())

        handleResize()

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return windowDimensions
}