'use client'

import { ShoppingCart } from 'lucide-react'
import {Sheet,SheetContent,SheetFooter,SheetHeader,SheetTitle,SheetTrigger,} from './ui/sheet'
import { Separator } from './ui/separator'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import { buttonVariants } from './ui/button'
import Image from 'next/image'

const Cart = () => {

    const itemCount = 1
    const fee = 1

    return (
        <Sheet>
            <SheetTrigger className='group -m-2 flex items-center p-2'>
                <ShoppingCart
                    aria-hidden='true'
                    className='h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500'
                />
                <span className='ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800'>
                    0
                </span>
            </SheetTrigger>
            <SheetContent className='flex w-full flex-col pr-0 sm:max-w-lg'>
                <SheetHeader className='space-y-2.5 pr-6'>
                    <SheetTitle>Carrito ({itemCount})</SheetTitle>
                </SheetHeader>
                {itemCount > 0 ? (
                    <>
                        <div className='flex w-full flex-col pr-6'>
                            { }
                            Productos del carrito
                        </div>
                        <div className='space-y-4 pr-6'>
                            <Separator />
                            <div className='space-y-1.5 text-sm'>
                                <div className='flex'>
                                    <span className='flex-1'>Envio</span>
                                    <span>Gratis</span>
                                </div>
                                <div className='flex'>
                                    <span className='flex-1'>
                                        Comisión de la transacción
                                    </span>
                                    <span>{formatPrice(fee)}</span>
                                </div>
                                <div className='flex'>
                                    <span className='flex-1'>Total</span>
                                    <span>
                                        {formatPrice(fee)}
                                    </span>
                                </div>
                            </div>

                            <SheetFooter>
                                <SheetTrigger asChild>
                                    <Link
                                        href='/compra-realizada'
                                        className=" bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full text-center">
                                        Pagar
                                    </Link>
                                </SheetTrigger>
                            </SheetFooter>
                        </div>
                    </>
                ) : (
                    <div className='flex h-full flex-col items-center justify-center space-y-1'>
                        <div
                            aria-hidden='true'
                            className='relative mb-4 -ml-20 h-60 w-60 text-muted-foreground'>
                            <Image
                                src='/empty-cart.png'
                                fill
                                alt='carrito vacio'
                            />
                        </div>
                        <div className='text-xl font-semibold'>
                            Tu carrito está vacio
                        </div>
                        <SheetTrigger asChild>
                            <Link
                                href='/productos'
                                className={buttonVariants({
                                    variant: 'link',
                                    size: 'sm',
                                    className:
                                        'text-sm text-muted-foreground',
                                })}>
                                Agrega Productos
                            </Link>
                        </SheetTrigger>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    )
}

export default Cart
