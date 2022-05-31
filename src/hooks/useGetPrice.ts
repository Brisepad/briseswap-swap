import { useEffect, useState } from "react"


const useGetPrice = () => {
  const [price, setPrice] = useState(0)

    useEffect(() => {

        const fetchData = async () => {
          try {
            // const response = await fetch(api)
            // const res: ApiResponse = await response.json();
    
            // const res = JSON.parse(JSON.stringify(dummyPriceData));
            setPrice(0.5)
          } catch (error) {
            console.error('Unable to fetch price data:', error)
          }
        }
    
        fetchData()
    }, [setPrice])
    return price
}

export default useGetPrice