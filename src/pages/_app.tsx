import '@/styles/globals.css'
import { UnifiedWalletProvider } from '@jup-ag/wallet-adapter'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UnifiedWalletProvider
      wallets={[]}
      config={{
        autoConnect: false,
        env: 'mainnet-beta',
        metadata: {
          name: 'UnifiedWallet',
          description: 'UnifiedWallet',
          url: 'https://jup.ag',
          iconUrls: ['https://jup.ag/favicon.ico'],
        },
        // notificationCallback: WalletNotification,
        // walletlistExplanation: {
        //   href: "https://station.jup.ag/docs/additional-topics/wallet-list",
        // },
      }}
    >
      <Component {...pageProps} />
    </UnifiedWalletProvider>
  )
}
