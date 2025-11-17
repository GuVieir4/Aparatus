import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { Separator } from "@/app/_components/ui/separator";
import { ServiceItem } from "@/app/_components/service-item";
import { PhoneItem } from "@/app/_components/phone-item";
import Footer from "@/app/_components/footer";
import { PageSectionTitle } from "../../_components/ui/page";

const BarbershopPage = async (props: PageProps<"/barbershops/[id]">) => {
  const { id } = await props.params;
  const barbershop = await prisma.barbershop.findUnique({
    where: {
      id,
    },
    include: {
      services: true,
    },
  });

  if (!barbershop) {
    notFound();
  }

  return (
    <div className="flex size-full flex-col items-start overflow-clip">
      <div className="relative h-[297px] w-full">
        <div className="absolute top-0 left-0 h-full w-full">
          <Image
            src={barbershop.imageUrl}
            alt={barbershop.name}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>

        <div className="absolute top-0 left-0 flex w-full items-baseline gap-[91px] px-5 pt-6 pb-0">
          <Button
            size="icon"
            variant="secondary"
            className="overflow-clip rounded-full"
            asChild
          >
            <Link href="/">
              <ChevronLeft className="size-5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Container Principal */}
      <div className="bg-background w-full flex-1 rounded-tl-3xl rounded-tr-3xl">
        {/* Informações da Barbearia */}
        <div className="flex w-full items-center gap-1.5 px-5 pt-6 pb-0">
          <div className="flex flex-col items-start gap-1">
            <div className="flex items-start gap-1.5">
              <div className="relative size-[30px] shrink-0 overflow-hidden rounded-full">
                <Image
                  src={barbershop.imageUrl}
                  alt={barbershop.name}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
              <p className="text-foreground text-xl font-bold">
                {barbershop.name}
              </p>
            </div>
            <div className="flex flex-col items-start gap-2">
              <div className="flex items-center gap-2">
                <p className="text-muted-foreground text-sm">
                  {barbershop.address}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-0 py-6">
          <Separator />
        </div>

        <div className="flex w-full flex-col items-start gap-3 px-5 py-0">
          <div className="flex items-center justify-center gap-2.5">
            <PageSectionTitle>Sobre Nós</PageSectionTitle>
          </div>
          <p className="text-foreground w-full text-sm">
            {barbershop.description}
          </p>
        </div>

        <div className="px-0 py-6">
          <Separator />
        </div>

        <div className="flex w-full flex-col items-start gap-3 px-5 py-0">
          <div className="flex items-center justify-center gap-2.5">
            <PageSectionTitle>SERVIÇOS</PageSectionTitle>
          </div>
          <div className="flex w-full flex-col gap-3">
            {barbershop.services.map((service) => (
              <ServiceItem key={service.id} service={service} />
            ))}
          </div>
        </div>

        <div className="px-0 py-6">
          <Separator />
        </div>

        <div className="flex w-full flex-col items-start gap-3 px-5 py-0">
          <div className="flex items-center justify-center gap-2.5">
            <PageSectionTitle>CONTATO</PageSectionTitle>
          </div>
          <div className="flex w-full flex-col gap-3">
            {barbershop.phones.map((phone, index) => (
              <PhoneItem key={index} phone={phone} />
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default BarbershopPage;
