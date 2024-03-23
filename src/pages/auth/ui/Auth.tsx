import { FC, PropsWithChildren } from "react";

import { Container } from "@/widgets/container";
import { SimpleHeader } from "@/widgets/header";

export const Auth: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Container>
      <SimpleHeader />
      <section className="h-[calc(100vh-128px)] md:h-auto flex flex-col items-center max-w-[615px] mx-auto mt-12">
        {children}
      </section>
    </Container>
  );
};
