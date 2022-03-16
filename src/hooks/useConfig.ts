import { useMemo } from 'react'

export const useConfig = () => {
    const publicEnv = {
        cloudinary: {
            publicUrl: process.env.CLOUDINARY_PUBLIC_UPLOAD_URL,
            uploadPreset: process.env.CLOUDINARY_PUBLIC_UPLOAD_PRESET
        }
    } as const

    return useMemo(() => publicEnv, [])
}