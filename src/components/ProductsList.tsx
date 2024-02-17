"use client"

import { useSession } from "next-auth/react";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

interface Product {
    name: string,
    imageSrc: string,
    price: number,
    description: string,
    _id: string;
}

export default function ProductsList() {
    const baseURL = process.env.NODE_ENV === 'production' ? 'https://digital-market-nine.vercel.app/' : 'http://localhost:3000';
    const [products, setProducts] = useState<Product[]>([]);
    const { data: session } = useSession();
    const isAuthorized = session?.user?.email === "davidespinossanz@gmail.com";

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch(`${baseURL}/api/products`);
            const data = await res.json();
            setProducts(data); 
        };

        fetchProducts();
    }, [baseURL]);

    const deleteProductById = async (productId: string) => {
        if (!confirm('¿Estás seguro de que quieres eliminar este producto?')) {
          return;
        }
       
        try {
          const response = await fetch(`${baseURL}/api/products/${productId}`, {
            method: 'DELETE',
          });
          
          if (response.ok) {
            alert('Producto eliminado correctamente.');
            setProducts(products.filter(product => product._id !== productId));
          } else {
            
            alert('No se pudo eliminar el producto.');
          }
        } catch (error) {
          console.error('Error al eliminar el producto:', error);
          alert('Ocurrió un error al intentar eliminar el producto.');
        }
    };

    return (
        
        <div className="flex flex-wrap -m-4 justify-center pt-4 pb-4"> 
            {products.length > 0 ? (
                products.map((product, index) => (
                    <div key={index} className="p-4 w-1/3 flex justify-center"> 
                        <div className="border rounded-lg p-4 shadow-lg flex flex-col items-center">
                            <h3 className='font-bold'>{product.name}</h3>
                            <Link href={`/productos/listar/${product._id}`} passHref>
                                <Image src={product.imageSrc} alt={product.name} width={200} height={200} layout="responsive" />
                            </Link>
                            <p className='text-orange-500'>${product.price}</p>
                            <br></br>
                            <p className='italic'>{product.description}</p>
                            {session && (
                                <Link href="/" className={buttonVariants()}>Comprar</Link>
                            )}
                            
                            {isAuthorized && (
                            <>
                                <div className="flex align-middle p-3">
                                    <div className="pr-2">
                                        <button className=" bg-red-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded" onClick={() => deleteProductById(product._id)}>Borrar
                                        </button>
                                    </div>
                                    <div className="pl-2 pt-2">
                                        <Link href={`/productos/editar/${product._id}`} className=" bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded">Editar 
                                        </Link>
                                    </div>
                                </div>   
                            </>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <p>Cargando productos...</p>
            )}
        </div>
    )
}