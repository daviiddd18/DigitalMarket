import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/db/ConnectToDatabase"; 
import { Product } from "@/app/db/models/ProductModel";

export async function DELETE(req: NextRequest) {
  await connectToDatabase();
  const searchParams = new URL(req.url).searchParams;
  const id = searchParams.get('id');

  try {
    if (!id) {
      throw new Error("ID no proporcionado");
    }
    const deletedProduct = await Product.deleteOne({ _id: id });
    if (deletedProduct.deletedCount === 0) {
      
      return new Response(JSON.stringify({ message: 'Producto no encontrado' }), { status: 404 });
    }
    return new Response(null, { status: 204 }); 
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error al borrar el producto' }), { status: 500 });
  }
}

{/*export async function GETBYID(req: NextApiRequest, res: NextApiResponse){
  const { id } = req.query;

  await connectToDatabase()
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el producto' });
  }
};

export async function UPDATE(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query; 

  await connectToDatabase();

  try {
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el producto' });
  }
}; */}


