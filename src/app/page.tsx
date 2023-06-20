'use client'
import Link from "next/link"
import { useRouter } from "next/navigation"
export default function Home() {
  
  return (
    // Header a ser inserido 
    <div className="w-screen h-screen flex justify-center items-center">
      <div>
        <h1> Clique na moeda que deseja visualizar</h1>
        <div className="flex flex-col justify-center items-center mt-4">
            <Link href="/cripto/ethereum">ethereum</Link>
            <Link href="/cripto/matic-network">matic</Link>
            <Link href="/cripto/binancecoin">bnb</Link>
            <Link href="/cripto/tether">tether</Link>
        </div>
      </div>

    </div>
  )
}
