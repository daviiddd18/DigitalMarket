import { NextResponse } from 'next/server';
import { connectToDatabase } from "@/app/db/ConnectToDatabase";
import { Product } from "@/app/db/models/ProductModel";

export async function GET() {
  
  connectToDatabase();

  const products = await Product.find();

  return NextResponse.json(products)

}

export async function POST() {
  
  connectToDatabase();
  
  return NextResponse.json({})
} 



