import { FC } from "react";

import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";
import { Container } from "@/widgets/container";
import { AppLink } from "@/shared/ui/app-link";

export const NotFound: FC = () => {
  return (
    <>
      <Header />
      <Container>
        <div className="mt-20 py-14 mx-auto md:mt-0 py-24 max-w-[616px] text-center">
          <h1 className="text-[140px] md:text-[200px] text-common-brand font-bold">
            404
          </h1>
          <h2 className="mb-3 heading-3 md:heading-title">
            Страница не найдена
          </h2>
          <p className="text-small md:text-medium">
            К сожалению, такой страницы нет.
          </p>
          <p className="text-small md:text-medium">
            Попробуйте вернуться назад или изменить адрес страницы.
          </p>
          <AppLink
            to="/"
            className="mt-9 inline-block heading-5 py-3 px-5 bg-common-brand rounded-lg text-common-white hover:bg-brand-secondary"
          >
            Перейти на главную
          </AppLink>
        </div>
      </Container>
      <Footer />
    </>
  );
};
