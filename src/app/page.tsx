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
    <div className="w-full h-full bg-blue-100">
      <header className="bg-blue-100 w-full h-24"> </header>
      <section className="w-full h-[40rem] flex flex-col md:flex-row justify-around items-center p-10 mb-10 md:p-36">
        <div className="flex flex-col gap-6 md:w-[48rem] md:justify-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 leading-snug">
            Compre <strong className="text-blue-500 font-extrabold">{coin?.name}</strong> na Zuvia <span className="text-blue-500">Pay</span> via PIX.
          </h1>
          <p className="text-base md:text-lg font-semibold">
            Invista em <strong className="text-blue-500 font-semibold">{coin?.name} na Zuvia</strong> e comece a construir seu caminho para a liberdade financeira.
          </p>
          <div className="pt-8 items-center justify-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex lg:justify-center">
            <a href="https://app.zuviapay.com.br/" target="_blank" className="mb-10 px-7 py-3 w-full bg-blue-500 text-white text-center rounded-md shadow-md block sm:w-auto hover:bg-blue-600">
                Comprar {coin?.name}
            </a>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Image src={infoCoin?.image?.large} width={250} height={250} alt="Logo Bitcoin" />
        </div>
      </section>

      <div className="w-full h-auto flex flex-col md:flex-row justify-around items-center p-4 md:p-24">
        <div className="flex flex-col gap-4 w-full md:w-auto">
          <h2 className="text-2xl text-center md:text-left">
            Cotação <strong className="font-extrabold text-blue-500">{coin?.name}</strong> hoje
          </h2>

          <div className="h-auto md:h-72 w-full md:w-[40rem] flex flex-col shadow-lg p-5 rounded-3xl bg-white gap-4">
            <div className="flex items-center gap-4">
              <Image src={infoCoin?.image?.large} width={50} height={50} alt="Logo Bitcoin" />
              <h2 className="text-2xl font-bold"> {coin?.name} </h2>
            </div>

            <div className="flex flex-col gap-4 lg:gap-2">
              <span className="text-3xl text-gray-800 font-extrabold">{formattedPrice}</span>

              <div className="flex gap-2 items-baseline">
                {infoCoin.market_data?.price_change_percentage_24h <= 0 ? (
                  <span className="text-red-700 font-bold text-lg">
                    {infoCoin.market_data?.price_change_percentage_24h}%
                  </span>
                ) : (
                  <span className="text-green-600 font-bold text-lg">{"+"}{infoCoin.market_data?.price_change_percentage_24h}%</span>
                )}
                <p> de variação nas últimas 24 horas.</p>
              </div>
              <div className="flex gap-2">
                <span className="font-bold"> {formattedTotalVolume} </span>
                <p> de volume total.</p>
              </div>

              <div className="flex gap-2">
                <span className="font-bold"> {formattedMarketCap} </span>
                <p> em capitalização de mercado.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full md:w-96 h-auto gap-4 items-center mt-10 md:mt-0">
          <h2 className="text-2xl font-extrabold"> O que é {coin?.name}?</h2>
          <p className="text-justify text-lg">
            {coin?.description}
          </p>
        </div>
      </div>

       <div className="w-full h-96">

       </div>
    </div>
  )
}
