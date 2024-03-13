import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import '../../tailwind.config'
import Link from 'next/link';
import { ethers } from 'ethers';


function WellcomePage() {

  const [logedIn, setLogedIn] = useState(false)


  // Connect Wallet functionality-------------------------------------------

  const Connect = async () => {
    try {
      if (typeof window !== 'undefined' && window.ethereum) {
        const chainId = '0x89'; // Polygon chain ID
        const chainData = {
          chainId: chainId,
          chainName: 'Polygon', // Chain name
          nativeCurrency: {
            name: 'Matic',
            symbol: 'MATIC',
            decimals: 18,
          },
          rpcUrls: ['https://polygon-rpc.com'], // RPC endpoint for Polygon network
          blockExplorerUrls: ['https://polygonscan.com'], // Block explorer URL for Polygon
        };
  
        // Add Polygon network to MetaMask
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [chainData],
        });
  
        // Switch to the Polygon network
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: chainId }],
        });
  
        // Request accounts
        await window.ethereum.request({ method: 'eth_requestAccounts' });
  
        // Update state to indicate logged in
        setLogedIn(true);
      }
    } catch (error) {
      console.error(error);
    }
  }
  


  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (account: any) => {
        window.location.replace(location.pathname)
      })
    }
  }, [])
  


  const styles = {
    screen: `w-screen h-screen flex justify-center items-center`,
    second: `bg-[url('/images/cart.png')] h-screen w-screen flex flex-col justify-center items-center bg-no-repeat`,
    wallet: `bg-slate-300/[.2] shadow-2xl border-white-900/75 w-60 h-40 rounded-3xl flex flex-col justify-center items-center mb-10`,
    pages: `bg-slate-300/[.2] shadow-2xl border-white-900/75 w-6/12 h-60 rounded-3xl flex gap-20 justify-center items-center`,

  }

  return (
    <div className={styles.screen}>
      <div className={styles.second}>
        <div className={styles.wallet}>
          <span className='font-bold text-slate-50 text-lg'>Connect to the Metamask</span>
            <Button variant="contained" onClick={Connect} className='bg-gradient-to-r from-sky-500 to-indigo-500'>
              <img src="/images/Metamask.png" className='w-10' />
              {logedIn ? <span>Connected</span> : <span>Connect</span>}
            </Button>
          </div>
          <div className={styles.pages}>
            <Link href="/components/Business/Home">
              <Button variant="contained" className='bg-gradient-to-r from-sky-500 to-indigo-500' disabled={!logedIn}>
                <span>Go For Business</span>
                <img src="/images/car_loading.PNG" className='w-20' />
              </Button>
            </Link>
            <Link href="/components/Marketplace/HomePage">
              <Button variant="contained" className='bg-gradient-to-r from-sky-500 to-indigo-500' disabled={!logedIn}>
                <span>Let Shopping</span>
                <img src="/images/shopping.PNG" className='w-20' />
              </Button>
            </Link>
          </div>
      </div>
    </div>
  )
}

export default WellcomePage
