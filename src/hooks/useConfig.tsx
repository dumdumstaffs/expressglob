import { createContext, ReactNode, useContext, useMemo } from 'react'

const publicEnv = {
    app: {
        emailAlias: process.env.APP_EMAIL_ALIAS
    },
    cloudinary: {
        publicUrl: process.env.CLOUDINARY_PUBLIC_UPLOAD_URL,
        uploadPreset: process.env.CLOUDINARY_PUBLIC_UPLOAD_PRESET
    },
    chatWidget: process.env.CHAT_WIDGET
} as const

const ConfigContext = createContext<typeof publicEnv | null>(null)

export const ConfigProvider = ({ children }: { children: ReactNode }) => (
    <ConfigContext.Provider value={publicEnv}>{children} </ConfigContext.Provider>
)

export const useConfig = () => useContext(ConfigContext)