import { useEffect, useState } from 'react'

const getMatches = (query: string) => {
    if (typeof window === 'undefined') return false

    return window.matchMedia(query).matches
}

export const useMediaQuery = (query: string): boolean => {
    const [matches, setMatches] = useState(false)


    useEffect(() => {
        const handleChange = () => setMatches(getMatches(query))

        // Triggered at the first client-side load and if query changes
        handleChange()

        const matchMedia = window.matchMedia(query)

        // Listen matchMedia
        matchMedia.addEventListener('change', handleChange)

        return () => {
            matchMedia.removeEventListener('change', handleChange)
        }
    }, [query])

    return matches
}