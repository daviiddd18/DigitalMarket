import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from "@/app/db/ConnectToDatabase"; 
import { Product } from "@/app/db/models/ProductModel"; 

export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.query)
  await connectToDatabase();
  
  const { id } = req.query; 
  
  try {
    const deletedProduct = await Product.deleteOne({ _id: id });
    if (deletedProduct.deletedCount === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(204).end(); 
  } catch (error) {
    res.status(500).json({ message: 'Error al borrar el producto' });
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


