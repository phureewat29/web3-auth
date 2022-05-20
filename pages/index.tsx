import type { NextPage } from 'next'
import { useWeb3 } from "@3rdweb/hooks"

const Home: NextPage = () => {
  const { connectWallet, address } = useWeb3();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-slate-100">
      {address ? (
        <Dashboard address={address} />
      ) : (
        <button className="px-4 py-2 rounded-md cursor-pointer hover:bg-purple-500 text-xl font-semibold duration-100 text-white"
          onClick={()=>connectWallet("injected")}>
          Connect Wallet
        </button>
      )}
    </div>
  )
}

export default Home
