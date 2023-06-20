'use client'
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { criptos } from "@/data/cripto";

export default function Home() {
  const [ infoCoin, setInfoCoin ] = useState<any>('')

  const coin = criptos.find((crypto) => crypto.coinId === 'matic-network');

  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/coins/${coin?.coinId}`)
      .then((response) => response.json())
      .then((data) => setInfoCoin(data));
  }, []);

  const formattedPrice = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(infoCoin?.market_data?.current_price?.brl)
  const formattedMarketCap = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(infoCoin.market_data?.market_cap?.brl)
  const formattedTotalVolume = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(infoCoin.market_data?.total_volume?.brl)
  
  
  return (
    // Header a ser inserido 
    <div className="w-full h-auto bg-blue-100">
      <h1> Digite /cripto/(a moeda desejada) </h1>
    </div>
  )
}
