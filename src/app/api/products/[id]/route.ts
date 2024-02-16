import { NextRequest} from 'next/server';
import { connectToDatabase } from '@/app/db/ConnectToDatabase';
import { Product } from '@/app/db/models/ProductModel'

export async function GET(req: NextRequest) {
  await connectToDatabase(); 

  const url = new URL(req.url);
  const pathSegments = url.pathname.split('/').filter(Boolean);
  const id = pathSegments[pathSegments.length - 1];

  try {
    if (!id) {
      return new Response(JSON.stringify({ message: "ID no proporcionado" }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const product = await Product.findById(id);

    if (!product) {
      return new Response(JSON.stringify({ message: 'Producto no encontrado' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify(product), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    return new Response(JSON.stringify({ message: 'Error al obtener el producto' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

export async function DELETE(req: NextRequest) {
  await connectToDatabase();

  const url = new URL(req.url);
  const pathSegments = url.pathname.split('/').filter(Boolean); 
  const id = pathSegments[pathSegments.length - 1];

  try {
    
    if (!id) {
      return new Response(JSON.stringify({ message: "ID no proporcionado" }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }
    const result = await Product.findByIdAndDelete(id);
    if (!result) {
      return new Response(JSON.stringify({ message: 'Producto no encontrado' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    return new Response(JSON.stringify({ message: 'Error al eliminar el producto' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

export async function PUT(req: NextRequest) {
  await connectToDatabase(); 

  const url = new URL(req.url);
  const pathSegments = url.pathname.split('/').filter(Boolean);
  const id = pathSegments[pathSegments.length - 1];

  const updateData = await req.json();

  try {
    if (!id) {
      return new Response(JSON.stringify({ message: "ID no proporcionado" }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const product = await Product.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

    if (!product) {
      return new Response(JSON.stringify({ message: 'Producto no encontrado' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify(product), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    return new Response(JSON.stringify({ message: 'Error al actualizar el producto' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}