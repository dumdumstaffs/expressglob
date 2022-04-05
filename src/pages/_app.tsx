import '@/styles/globals.scss'
import '@/styles/print.scss'
import '@/styles/poc-banner.scss'
import "reflect-metadata"
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ConfigProvider } from '@/hooks/useConfig'

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <ConfigProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        {/* <ReactQueryDevtools /> */}
      </QueryClientProvider>
    </ConfigProvider>
  )
}

export default MyApp
