import { FC } from "react";

import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";
import { Container } from "@/widgets/container";
import { MainIntro } from "./main-intro/MainIntro";
import { MainPreconditions } from "./main-preconditions/MainPreconditions";
import { MainStages } from "./main-stages/MainStages";
import { MainVehicles } from "./main-vehicles/MainVehicles";
import { MainAccount } from "./main-account/MainAccount";
import { MainFAQ } from "./main-faq/MainFAQ";

export const Main: FC = () => {
  return (
    <>
      <Header />
      <MainIntro />
      <MainPreconditions />
      <MainStages />
      <Container>
        <MainVehicles />
        <MainAccount />
        <MainFAQ />
      </Container>
      <Footer />
    </>
  );
};
