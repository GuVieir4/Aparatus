import { Barbershop } from "../generated/prisma/client";
import Image from "next/image";

interface BarbershopItemProps {
  barbershop: Barbershop;
}

function BarbershopItem({ barbershop }: BarbershopItemProps) {
  return (
    <div className="relative min-h-[200px] min-w-[290px] overflow-hidden rounded-xl">
      <Image
        src={barbershop.imageUrl}
        alt={barbershop.name}
        fill
        className="z-0 object-cover"
      />

      <div className="absolute inset-0 z-10 bg-linear-to-t from-black/75 to-transparent" />

      <div className="absolute right-0 bottom-0 left-0 z-20 p-4">
        <h3 className="text-background mb-2 text-lg font-bold">
          {barbershop.name}
        </h3>
        <p className="text-background text-xs">{barbershop.address}</p>
      </div>
    </div>
  );
}

export default BarbershopItem;
