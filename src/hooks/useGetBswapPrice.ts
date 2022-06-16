import { useEffect, useState } from "react"
import BigNumber from 'bignumber.js'
import { getRouterContract } from "utils"
// import BriseswapRouterABI from "../../abis/BriseswapRouter.json"
import brisePriceFromAPI from "utils/brisePriceFromAPI"
import { useActiveWeb3React } from './index'
// import useInterval from "./useInterval"

// const BRISESWAPROUTER_ADDRESS = "0xE396407e21F7d7526ff0b0a8912751C64957fBF7"
const bswap_address = "0xF26006408112be347c23FDBa03F7bC3566519655"
const wbrise_address = "0x0eb9036cbE0f052386f36170c6b07eF0a0E3f710"
const amountIn_bswap = "1000000000000000000"
const path = [bswap_address, wbrise_address]


const useGetBswapPrice = () => {
  const [price, setPrice] = useState(0)

  const { chainId, library } = useActiveWeb3React()
  
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        // const response = await fetch(api)
        const brisePriceBN = await brisePriceFromAPI()
        if(!chainId || !library){
          throw new Error('missing dependencies')
        }
        const router = getRouterContract(chainId, library)
        // const res: ApiResponse = await response.json();
        // const res = JSON.parse(JSON.stringify(dummyPriceData));
        const [, priceRaw] = await router.getAmountsOut(amountIn_bswap, path)
        setPrice((priceRaw / 10**18) * brisePriceBN.toNumber())
      } catch (error) {
        console.error('Unable to fetch price data:', error)
      }
    }
    fetchData()
        
    }, [setPrice, chainId, library])
  

  return price

}

export default useGetBswapPrice