import type { NextPage } from 'next'
import Head from 'next/head'
import { useWeb3, useSwitchNetwork } from '@3rdweb/hooks'
import {
  Box,
  Button,
  Container,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react'
import { HiChevronDown } from 'react-icons/hi'
import { IoMdWallet } from 'react-icons/io'

const NetworkMetadata = (props: {
  icon: React.ComponentType | string
  chainName: string
  symbol: string
  isTestnet: boolean
}) => {
  const { chainName } = props
  if (!props || !chainName) {
    return <></>
  }
  const { icon, symbol, isTestnet } = props

  const ChainIconElement = icon
  const iconSize = symbol === 'MATIC' ? 5 : 3

  return (
    <Flex gap={2}>
      <Box w={iconSize} h={iconSize}>
        <ChainIconElement />
      </Box>
      <Text>{chainName}</Text>
      {isTestnet && <Text color="grey">(testnet)</Text>}
    </Flex>
  )
}

const CustomConnect = () => {
  const web3 = useWeb3()

  const {
    address,
    chainId,
    connectWallet,
    disconnectWallet,
    getNetworkMetadata,
  } = web3
  const { switchNetwork } = useSwitchNetwork()

  let networkMetadata = null

  if (chainId) {
    networkMetadata = getNetworkMetadata(chainId)
  }

  // If a wallet is connected, show disconnect and switch network options
  return (
    <>
      {address ? (
        <Menu>
          <MenuButton minH={10} as={Button} rightIcon={<HiChevronDown />}>
            {networkMetadata && <NetworkMetadata {...networkMetadata} />}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => switchNetwork(3)}>
              Switch to Ropsten
            </MenuItem>
            <MenuItem onClick={() => switchNetwork(4)}>
              Switch to Rinkeby
            </MenuItem>
            <MenuItem onClick={() => switchNetwork(42)}>
              Switch to Kovan
            </MenuItem>
            <MenuItem onClick={disconnectWallet}>Switch Wallet</MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <>
          <Button
            onClick={() => connectWallet('injected')}
            leftIcon={<IoMdWallet />}
            colorScheme="purple"
          >
            Connect MetaMask
          </Button>
        </>
      )}
    </>
  )
}

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Web3 Auth - aquartier</title>
        <meta name="description" content="Web3 Auth" />
      </Head>
      <Container maxW="container.md">
        <Flex flexDirection="column" w="100%" h="100%">
          <Flex justifyContent="flex-end" m={5}>
            <CustomConnect />
          </Flex>
        </Flex>
      </Container>
    </>
  )
}

export default Home