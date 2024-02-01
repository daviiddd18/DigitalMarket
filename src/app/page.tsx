import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <MaxWidthWrapper>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Tu tienda <span className="text-orange-500">TECNOLÓGICA</span> de gran calidad</h1>
          <p className="mt-4 text-2xl font-semibold text-gray-500">Bienvenido a DigitalMarket </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link href="/productos" className={buttonVariants()}>Productos</Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
}
