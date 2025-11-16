import Header from "./_components/header";
import SearchInput from "./_components/search-input";
import Image from "next/image";
import banner from "../public/banner.png";
import BookingItem from "./_components/booking-item";
import { prisma } from "@/lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import Footer from "./_components/footer";
import { PageContainer } from "./_components/ui/page";
import { PageSection } from "./_components/ui/page";
import { PageSectionTitle } from "./_components/ui/page";

const Home = async () => {
  const recommendedBarbershops = await prisma.barbershop.findMany({
    orderBy: {
      name: "asc",
    },
  });
  const popularBarbershops = await prisma.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  });
  return (
    <div>
      <Header />
      <PageContainer>
        <SearchInput />
        <Image
          src={banner}
          alt="Agende agora"
          sizes="100vw"
          className="h-auto w-full"
        />

        <PageSection>
          <PageSectionTitle>AGENDAMENTOS</PageSectionTitle>
          <BookingItem
            serviceName="Corte de cabelo"
            barbershopName="Barbearia do João"
            barbershopImageUrl="https://utfs.io/f/f64f1bd4-59ce-4ee3-972d-2399937eeafc-16x.png"
            date={new Date()}
          />
        </PageSection>

        <PageSection>
          <PageSectionTitle>RECOMENDADOS</PageSectionTitle>
          <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
            {recommendedBarbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        </PageSection>

        <PageSection>
          <PageSectionTitle>POPULARES</PageSectionTitle>
          <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
            {popularBarbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        </PageSection>
      </PageContainer>
      <Footer />
    </div>
  );
};

export default Home;
