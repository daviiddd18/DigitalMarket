"use client"

import { useState, useEffect } from 'react';
import React from 'react'
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { buttonVariants } from './ui/button';

interface Product {
    name: string,
    imageSrc: string,
    price: number,
    description: string,
    _id: string;
}

export default function ProductList () {
  
    const object= useParams();
    const id = object?.id
    const [product, setProduct] = useState<Product | null>(null);
    const { data: session } = useSession();
    
    useEffect(() => {
      
      if (id) {
        const fetchProduct = async () => {
          try {
            const response = await fetch(`/api/products/${id}`);
            if (!response.ok) {
              throw new Error('Failed to fetch the product');
            }
            const data = await response.json();
            setProduct(data);
          } catch (error) {
            console.error('Error fetching product:', error);
          }
        };
        fetchProduct();
      }
    }, [id]); 
  
    if (!product) return <p className="text-center">Cargando el producto...</p>;

  return (

    <div className="max-w-sm mx-auto bg-white shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex md:flex-col"> 
            <div className="md:flex-shrink-0 flex items-center justify-center h-full">
                <Image className="object-cover" src={product.imageSrc} alt={product.name} width={200} height={200} />
            </div>
            <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-orange-500 font-semibold">{product.name}</div>
            <p className="block mt-1 text-lg leading-tight font-medium text-black" style={{ minHeight: '4rem' }}>{product.description}</p>
            <p className="block text-orange-500  text-lg leading-tight font-medium" style={{ minHeight: '4rem' }}>{product.price}</p>
            {session && (<Link href="/productos" className={buttonVariants()}>Comprar</Link>)}
            </div>
        </div>
    </div>

  )
}
