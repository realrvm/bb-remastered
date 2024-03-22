import { Outlet } from "react-router-dom";

import { Container } from "@/widgets/container";
import { SimpleHeader } from "@/widgets/header";

const Auth = () => {
  return (
    <Container>
      <SimpleHeader />
      <section className="h-[calc(100vh-128px)] md:h-auto flex flex-col items-center max-w-[615px] mx-auto mt-12">
        <Outlet />
      </section>
    </Container>
  );
};

export default Auth;
