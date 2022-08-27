import type {
  MetaFunction,
  LinksFunction,
  LoaderFunction,
} from '@remix-run/node'

import { useContext, useEffect } from 'react'
import { withEmotionCache } from '@emotion/react'
import {
  ChakraProvider,
  cookieStorageManagerSSR,
  extendTheme,
  localStorageManager,
} from '@chakra-ui/react'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'

import { ServerStyleContext, ClientStyleContext } from './context'

import Footer from './components/footer'
import Navbar from './components/navbar'

import styles from './styles/app.css'

const colours = {
  blue: {
    900: '#0D47A1',
    800: '#1565C0',
    700: '#1976D2',
    600: '#1E88E5',
    500: '#2196F3',
    400: '#42A5F5',
    300: '#64B5F6',
    200: '#90CAF9',
    100: '#BBDEFB',
    50: '#E3F2FD',
  },
}

const theme = extendTheme({ colours })

export const loader: LoaderFunction = async ({ request }) => {
  return request.headers.get('cookie') ?? ''
}

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Remix Blog',
  viewport: 'width=device-width,initial-scale=1',
})

export let links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }]

interface DocumentProps {
  children: React.ReactNode
}

const Document = withEmotionCache(
  ({ children }: DocumentProps, emotionCache) => {
    const serverStyleData = useContext(ServerStyleContext)
    const clientStyleData = useContext(ClientStyleContext)

    // Only executed on client
    useEffect(() => {
      // re-link sheet container
      emotionCache.sheet.container = document.head
      // re-inject tags
      const tags = emotionCache.sheet.tags
      emotionCache.sheet.flush()
      tags.forEach((tag) => {
        ;(emotionCache.sheet as any)._insertTag(tag)
      })
      // reset cache to reapply global styles
      clientStyleData?.reset()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
      <html lang="en">
        <head>
          <Meta />
          <Links />
          {serverStyleData?.map(({ key, ids, css }) => (
            <style
              key={key}
              data-emotion={`${key} ${ids.join(' ')}`}
              dangerouslySetInnerHTML={{ __html: css }}
            />
          ))}
        </head>
        <body>
          {children}
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    )
  }
)

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col justify-between h-full select-none">
      <Navbar />
      <main className="flex-1 w-full max-w-screen-lg my-8 mx-auto overflow-y-auto">
        <div className="p-8 w-full max-h-full h-full">{children}</div>
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  const cookies = useLoaderData()

  return (
    <Document>
      <ChakraProvider
        theme={theme}
        colorModeManager={
          typeof cookies === 'string'
            ? cookieStorageManagerSSR(cookies)
            : localStorageManager
        }
      >
        <Layout>
          <Outlet />
        </Layout>
      </ChakraProvider>
    </Document>
  )
}
