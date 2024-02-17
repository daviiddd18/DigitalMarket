"use client"

import MaxWidthWrapper from "./MaxWidthWrapper"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PurchaseMade(){

    const router = useRouter();

  useEffect(() => {
    
    setTimeout(() => {
      
      router.push('/');
    }, 2000);
  }, [router]);

    return <>
    <MaxWidthWrapper>
      <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"><span className="text-green-500">GRACIAS</span> por confiar en <span className="text-gray-500">DigitalMarket</span></h2>
      </div>
    </MaxWidthWrapper>
  </>
}