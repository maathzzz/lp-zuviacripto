'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import { criptos } from "@/data/cripto";
import { useParams } from "next/navigation";
import { Coin, Wallet, Repeat, Cube, ChartLine, HandCoins, LockKey } from "@phosphor-icons/react";
import metamask  from "../../../../public/icons/metamask-seeklogo.com.svg"
import trustwallet from "../../../../public/icons/trust-wallet-seeklogo.com.svg"
import trezor from "../../../../public/icons/trezor-seeklogo.com.svg"
import ledger from "../../../../public/icons/ledger-wallet-seeklogo.com.svg"

const features = [
  {
      icon: <ChartLine size={28} color="#009FE3" weight="bold" />,
      title: "Crescimento",
      desc: "As criptomoedas têm mostrado histórico de valorização significativa, oferecendo a possibilidade de retornos consideráveis sobre investimento."
  },
  {
      icon: <HandCoins size={28} color="#009FE3" weight="bold" />,
      title: "Autonomia financeira",
      desc: "As criptomoedas funcionam em uma rede descentralizada, permitindo que os usuários tenham controle direto sobre seus ativos e transações."
  },
  {
      icon: <LockKey size={28} color="#009FE3" weight="bold" />,
      title: "Segurança e privacidade",
      desc: "As transações com criptomoedas são protegidas por criptografia avançada, garantindo segurança e privacidade financeira."
  },
]

export default function Cripto() {
  const [ infoCoin, setInfoCoin ] = useState<any>('')
  const [value, setValue] = useState('');
  const [isRealToCripto, setIsRealToCripto] = useState(true);

  const params = useParams()
  
  const coin = criptos.find((crypto) => crypto.coinId === `${params.id}`);

  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/coins/${coin?.coinId}`)
      .then((response) => response.json())
      .then((data) => setInfoCoin(data));
  }, []);

  const coinPrice = infoCoin?.market_data?.current_price?.brl
  const formattedPrice = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(coinPrice)
  const formattedMarketCap = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(infoCoin.market_data?.market_cap?.brl)
  const formattedTotalVolume = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(infoCoin.market_data?.total_volume?.brl)

  const handleInputChange = (event : any) => {
    setValue(event.target.value);
  };

  const handleConversion = () => {
    setIsRealToCripto(!isRealToCripto);
  };

  const convertToBitcoin = () => {
    if (value) {
      const convertedValue = parseFloat(value) / coinPrice;
      return convertedValue.toFixed(8);
    }
    return '';
  };

  const convertToReal = () => {
    if (value) {
      const convertedValue = parseFloat(value) * coinPrice;
      return convertedValue.toFixed(2);
    }
    return '';
  };

  const renderResult = () => {
    if (isRealToCripto) {
      const bitcoinValue = convertToBitcoin();
      return bitcoinValue ? `${value} Reais (BRL) são ${bitcoinValue} ${coin?.name}` : '';
    } else {
      const realValue = convertToReal();
      return realValue ? `${value} ${coin?.name} são ${realValue} reais` : '';
    }
  };

  return (
    // Header a ser inserido 
    <div className="w-full h-auto bg-blue-100">
      <header className="bg-blue-100 w-full h-24 border-b-2"> </header>
      <section className="w-full h-auto flex flex-col md:flex-row justify-around items-center p-10 md:p-36">
          <div className="flex flex-col gap-6 md:w-[48rem] md:justify-center items-center lg:items-start">
            <span className="w-60 h-8 bg-blue-200 rounded-full text-blue-500 font-extrabold flex items-center justify-center"> FÁCIL, RÁPIDO E SEGURO </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-700 leading-snug">
              Compre <strong className="text-blue-500 font-extrabold">{coin?.name}</strong> na Zuvia <span className="text-blue-500">Pay</span> com PIX.
            </h1>
            <p className="text-base md:text-lg font-normal">
              Invista em <strong className="text-blue-500 font-semibold">{coin?.name} na Zuvia</strong> e comece a construir seu caminho para a liberdade financeira. 
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, at iste recusandae rerum laborum optio placeat unde omnis.
            </p>
            <div className="pt-8 items-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex">
              <a href="https://app.zuviapay.com.br/" target="_blank" className="mb-10 px-7 py-3 w-full bg-blue-500 text-white text-center rounded-md shadow-md block sm:w-auto hover:bg-blue-600">
                  Comprar {coin?.name}
              </a>
            </div>
          </div>
          <div className="">
            <Image src={infoCoin?.image?.large} width={300} height={300} alt="Logo Bitcoin" />
          </div>
      </section>

      <section className="py-1">
          <div className="max-w-screen-xl mx-auto px-4 md:px-8">
            <div className="md:mt-[-4rem]">
              <ul className="flex gap-y-10 flex-wrap items-center justify-center [&>*]:px-12">
                  <li className="flex-none">
                    <Image src={metamask} alt="Metamask Logotipo" width={200} height={200} />
                  </li>
                  <li className="flex-none">
                    <Image src={trustwallet} alt="Metamask Logotipo" width={130} height={130} />
                  </li>
                  <li className="flex-none mb-7">
                    <Image src={trezor} alt="Metamask Logotipo" width={200} height={200} />
                  </li>
                  <li className="flex-none">
                    <Image src={ledger} alt="Metamask Logotipo" width={200} height={200} />
                  </li>
              </ul>
            </div>
          </div>
      </section>

      <div className="mt-5 lg:mt-0">
        <div className="w-full h-auto flex flex-col mt-10 md:flex-row justify-around items-center p-4 pt-20 md:p-24">
          <div className="flex flex-col gap-10 w-full md:w-auto">
            <div className="flex flex-col gap-4 w-full md:w-auto">
              <div className="flex items-center justify-center lg:justify-start md:pl-4 gap-3">
                <Wallet size={30} color="#1A1D56" weight="bold" />
                <h2 className="text-2xl text-center font-bold md:text-left">
                  Cotação <strong className="font-extrabold text-blue-500">{coin?.name}</strong>
                </h2>
              </div>

              <div className="h-auto md:h-72 w-full md:w-[45rem] flex flex-col shadow-lg p-5 rounded-2xl bg-white gap-4">
                <div className="flex items-center gap-4">
                  <Image src={infoCoin?.image?.large} width={50} height={50} alt="Logo Bitcoin" />
                  <h2 className="text-2xl font-bold"> {coin?.name} </h2>
                </div>

                <div className="flex flex-col gap-4 lg:gap-4 items-center lg:items-start">
                  <span className="text-3xl text-gray-800 font-extrabold">{formattedPrice}</span>
                  <div className="flex gap-1 lg:gap-2 flex-col lg:flex-row items-center lg:items-baseline">
                    {infoCoin.market_data?.price_change_percentage_24h <= 0 ? (
                      <span className="text-red-700 font-bold text-lg">
                        {infoCoin.market_data?.price_change_percentage_24h}%
                      </span>
                    ) : (
                      <span className="text-green-600 font-bold text-lg">{"+"}{infoCoin.market_data?.price_change_percentage_24h}%</span>
                    )}
                    <p> de variação nas últimas 24 horas.</p>
                  </div>
                  <div className="flex flex-col items-center gap-2 lg:flex-row">
                    <span className="font-bold"> {formattedTotalVolume} </span>
                    <p> de volume total.</p>
                  </div>

                  <div className="flex gap-2 flex-col items-center lg:flex-row">
                    <span className="font-bold"> {formattedMarketCap} </span>
                    <p> em capitalização de mercado.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 w-full md:w-auto">
              <div className="flex items-center justify-center lg:justify-start md:pl-4 gap-3">
                <Repeat size={26} color="#1A1D56" weight="bold" />
                <h2 className="text-2xl font-bold"> Conversor de cripto </h2>
              </div>
              <div className="h-auto md:h-72 w-full md:w-[45rem] flex flex-col shadow-lg p-5 rounded-2xl bg-white gap-4">
                <div className="mb-4">
                  <label className="block mb-2 text-lg" htmlFor="value">
                    Valor
                  </label>
                  <input
                    type="number"
                    id="value"
                    name="value"
                    className="border rounded px-3 py-2 w-full"
                    placeholder="Digite o valor"
                    value={value}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="text-center mb-4">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleConversion}
                  >
                    Trocar Conversão
                  </button>
                </div>
                <p className="text-center">{renderResult()}</p>
              </div>
            </div>
          </div>

          <div className="w-auto h-auto flex flex-col">
            <div className="flex flex-col w-full md:w-96 h-auto gap-4 items-center lg:items-start my-10 px-10 md:px-0 md:mt-0">
              <div className="flex flex-row items-center gap-3">
                <Coin size={30} color="#1A1D56" weight="bold" />
                <h2 className="text-2xl font-extrabold"> O que é {coin?.name}?</h2>
              </div>
              <p className="text-left text-lg">
                {coin?.description}
              </p>
            </div>

            <div className="flex flex-col w-full md:w-96 h-auto gap-4 items-center lg:items-start my-10 px-10 lg:my-0 lg:px-0 md:px-0 md:mt-0">
              <div className="flex flex-row items-center gap-3">
                <Cube size={30} color="#1A1D56" weight="bold" />
                <h2 className="text-2xl font-extrabold"> O que é Blockchain?</h2>
              </div>
              <p className="text-left text-lg">
                Blockchain é um registro digital descentralizado, seguro e transparente que armazena informações em blocos conectados. 
                Cada bloco contém dados de transações anteriores e é protegido por criptografia, garantindo integridade e confiança, evitando manipulação ou falsificação. 
              </p>
            </div>
          </div>
        </div>

        <div className="w-full h-auto mt-8 bg-gradient-to-r from-sky-500 to-blue-700 flex flex-col justify-center items-center py-20 px-5">
            <div className="relative max-w-2xl mx-auto sm:text-center">
                <div className="relative z-10">
                    <h3 className="text-white text-3xl font-bold sm:text-4xl">
                        Comprando {coin?.name}
                    </h3>
                    <p className="mt-3 text-white font-semibold">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius, enim ex faucibus purus.
                    </p>
                </div>
            </div>
            <div className="relative mt-12 flex items-center justify-center">
                <ul className="flex-row items-center grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {
                      features.map((item, idx) => (
                          <li key={idx} className="bg-white space-y-3 p-4 border w-76 lg:w-96 rounded-lg shadow-lg">
                              <div className="text-indigo-600 pb-3">
                                  {item.icon}
                              </div>
                              <h4 className="text-lg text-gray-800 font-semibold">
                                  {item.title}
                              </h4>
                              <p>
                                  {item.desc}
                              </p>
                          </li>
                      ))
                    }
                </ul>
            </div>
            <a className="mt-12 mb-3 px-7 py-3 w-full cursor-pointer bg-gray-700 text-white text-center rounded-md shadow-md block sm:w-auto"> 
              Veja Mais 
            </a>
        </div>
      </div>
      <div className="w-full h-96 bg-white">

      </div>
    </div>
  )
}