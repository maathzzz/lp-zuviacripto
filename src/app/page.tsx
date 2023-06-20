'use client'

export default function Home() {
  
  return (
    // Header a ser inserido 
    <div className="w-screen h-screen flex justify-center items-center">
      <div>
        <h1> Digite /cripto/(a moeda desejada) na URL</h1>
        <div className="flex justify-center mt-4">
          <ul>
            <li>ethereum</li>
            <li>matic-network</li>
            <li>binancecoin</li>
            <li>tether</li>
          </ul>
        </div>
      </div>

    </div>
  )
}
