import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThirdwebProvider } from '@3rdweb/react'
import { ChakraProvider } from '@chakra-ui/react'

function MyApp({ Component, pageProps }: AppProps) {
  // Put the ethereum chain ids of the chains you want to support
  const supportedChainIds = [1, 3, 4, 42]

  // Ethereun Mainnet - 1 (ETH)
  // Ropsten Test Network - 3 (ETH)
  // Rinkeby Test Network - 4 (ETH)
  // Kovan Test Network -  42 (ETH)
  // Polygon Mumbai Test Network - 80001 (MATIC)

  /**
   * Include the connectors you want to support
   * injected - MetaMask
   * magic - Magic Link
   * walletconnect - Wallet Connect
   * walletlink - Coinbase Wallet
   */
  const connectors = {
    injected: {},
    // magic: {
    //   apiKey: 'pk_...', // Your magic api key
    //   chainId: 1, // The chain ID you want to allow on magic
    // },
    // walletconnect: {},
    // walletlink: {
    //   appName: 'web3-auth',
    //   url: 'http://localhost:3000',
    //   darkMode: false,
    // },
  }

  /**
   * Make sure that your app is wrapped with these contexts.
   * If you're using Next JS, you'll have to replace children with the Component setup
   */
  return (
    <ThirdwebProvider
      connectors={connectors}
      supportedChainIds={supportedChainIds}
    >
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </ThirdwebProvider>
  )
}

export default MyApp
