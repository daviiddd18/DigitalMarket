"use client"

import { useState, useEffect } from 'react';
import React from 'react'
import { redirect, useParams } from 'next/navigation';
import router from 'next/router';

interface Product {
    name: string,
    imageSrc: string,
    price: number,
    description: string,
    _id: string;
}

export default function EditProduct () {
    const baseURL = process.env.NODE_ENV === 'production' ? 'https://digital-market-nine.vercel.app/' : 'http://localhost:3000';
    const object = useParams();
    const id = object?.id
    const [product, setProduct] = useState<Product>({ name: '', imageSrc: '', price: 0, description: '', _id: '' });
    
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
    
    const updateProductById = async (productId: string, productData: { name?: string; imageSrc?: string; price?: number; description?: string; }) => {
        if (!confirm('¿Estás seguro de que quieres actualizar este producto?')) {
          return;
        }

        try {
          const response = await fetch(`${baseURL}/api/products/${productId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
          });

          if (response.ok) {
            alert('Producto actualizado correctamente.');
            router.push('/productos'); 
          } else {
            const errorText = await response.text();
            alert(`No se pudo actualizar el producto. Error: ${errorText}`);
          }
        } catch (error) {
          console.error('Error al actualizar el producto:', error);

        }
    };

    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setProduct(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        await updateProductById(product._id, { ...product });
    };
      
    if (!product) return <p className="text-center">Cargando el producto...</p>;

  return (
    <>
    <div className="flex justify-center items-center mt-10 ">
            <div className="p-6 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="font-bold text-2xl mb-4 text-center">Editar {product.name}</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        name="name"
                        onChange={handleInputChange}
                        value={product.name}
                        className="input input-bordered input-primary w-full"
                        placeholder="Name"
                        type="text"
                    />

                    <input
                        name="imageSrc"
                        onChange={handleInputChange}
                        value={product.imageSrc}
                        className="input input-bordered input-primary w-full"
                        placeholder="Image URL"
                        type="text"
                    />
                    <input
                        name="price"
                        onChange={handleInputChange}
                        value={product.price.toString()}
                        className="input input-bordered input-primary w-full"
                        placeholder="Price"
                        type="number"
                    />
                    <input
                        name="description"
                        onChange={handleInputChange}
                        value={product.description}
                        className="input input-bordered input-primary w-full"
                        placeholder="Description"
                        type="text"
                    />
                    
                    <button type="submit" className=" bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded">
                        Editar 
                    </button>
                </form>
            </div>
        </div>
    </>
  )
  redirect('/productos')
}
