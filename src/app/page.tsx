import MaxWidthWrapper from "../components/MaxWidthWrapper";
import { Button, buttonVariants } from "../components/ui/button";
import { ArrowDownToLine, CheckCircle, LeafyGreen } from "lucide-react";
import Link from "next/link";

const perks = [
  {
    name:"Entregas rápidas",
    Icon: ArrowDownToLine,
    description: "Realizamos las entregas en 24/48 horas"
  },
  {
    name:"Calidad asegurada",
    Icon: CheckCircle,
    description: "Todos los productos tienen el sello de calidad"
  },
  {
    name:"Productos con cero emisiones",
    Icon: LeafyGreen,
    description: "De todos los productos vendidos revertimos el 100% de las emisiones"
  }
]

export default function Home() {
  return (
    <> 
      <MaxWidthWrapper>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Tu tienda <span className="text-orange-500">TECNOLÓGICA</span> de gran calidad</h1>
          <p className="mt-4 text-2xl font-semibold text-gray-500">Bienvenido a DigitalMarket </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link href="/products" className={buttonVariants()}>Productos</Link>
            <Button variant='ghost'>Prueba</Button>
          </div>
        </div>
      </MaxWidthWrapper>
      
      <section className="border-t border-gray-200 bg-gray-100">
        <MaxWidthWrapper className="py-20">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            {perks.map((perk) => (
              <div key={perk.name} className="text-center md:flex md:items-start md:text-left lg:block lg:text-center">
                <div className="'md:flex-shrink-0 flex justify-center">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-orange-100 text-orange-600">
                    <perk.Icon className="w-1/3 h-1/3"/>
                  </div>
                </div>
                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-base font-medium text-gray-900">
                    {perk.name}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {perk.description}</p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
