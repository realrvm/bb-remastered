import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { AppLink } from "@/shared/ui/app-link";
import { Button } from "@/shared/ui/button";
import { Logo } from "@/shared/ui/icons";
import { Container } from "@/widgets/container";
import {
  BIBIMONEY_ADRESS,
  BIBIMONEY_COMPANY,
  BIBIMONEY_INN,
  BIBIMONEY_KPP,
  BIBIMONEY_OGRN,
} from "@/shared/lib/variables/footer/footer";
import { AppImage } from "@/shared/ui/app-image";

export const Footer: FC = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-brand-light py-[1.75rem] md:py-12">
      <Container>
        <div className="flex justify-between items-center gap-5 mb-8 flex-col min-[400px]:flex-row min-[400px]:gap-0">
          <AppLink to="/">
            <Logo />
          </AppLink>
          <Button onClick={() => navigate("auth/loan")}>Получить займ</Button>
        </div>
        <div className="flex flex-col gap-2.5 pb-6 md:gap-[112px] md:flex-row">
          <div className="flex-1">
            <p className="text-small">{BIBIMONEY_COMPANY}</p>
            <AppLink
              className="!text-small mt-4 inline-block hover:underline text-common-brand"
              to="*"
            >
              Центр раскрытия корпоративной информации
            </AppLink>
          </div>
          <div className="flex-1">
            <dl className="grid grid-cols-[68px_auto] text-small">
              <dt>КПП</dt>
              <dd>{BIBIMONEY_KPP}</dd>
            </dl>
            <dl className="grid grid-cols-[68px_auto] text-small mt-3">
              <dt>ИНН</dt>
              <dd>{BIBIMONEY_INN}</dd>
            </dl>
            <dl className="grid grid-cols-[68px_auto] text-small mt-3">
              <dt>ОГРН</dt>
              <dd>{BIBIMONEY_OGRN}</dd>
            </dl>
            <dl className="grid grid-cols-[68px_auto] text-small mt-3">
              <dt>Адрес</dt>
              <dd>{BIBIMONEY_ADRESS}</dd>
            </dl>
          </div>
        </div>
        <div className="border-t border-t-border-gray flex flex-col md:flex-row md:py-6 md:gap-[112px]">
          <div className="flex-1 flex flex-col py-5 border-b border-b-border-gray md:py-0 md:border-b-0">
            <AppImage
              src="/bor.png"
              width={112}
              className="mb-1 md:mb-5 self-start"
            />
            <AppLink
              className="!text-small mt-3 text-common-brand self-start hover:underline"
              to="*"
            >
              Официальный сайт Банка России
            </AppLink>
            <AppLink
              to="*"
              className="!text-small mt-3 text-common-brand self-start hover:underline"
            >
              Интернет-приемная
            </AppLink>
            <AppLink
              to="*"
              className="!text-small mt-3 text-common-brand self-start hover:underline"
            >
              Реестры субъектов рынка микрофинансирования
            </AppLink>
          </div>
          <div className="flex-1 flex flex-col py-5 border-b border-b-border-gray md:py-0 md:border-b-0">
            <AppImage
              src="/mir.png"
              width={118}
              className="mb-1 md:mb-5 self-start"
            />
            <AppLink
              to="*"
              className="!text-small mt-3 text-common-brand self-start hover:underline"
            >
              Официальный сайт СРО «МИР»
            </AppLink>
            <AppLink
              to="*"
              className="!text-small mt-3 text-common-brand self-start hover:underline"
            >
              Интернет-приёмная
            </AppLink>
            <p className="text-small mt-4">
              107078, г. Москва, Орликов переулок, д.5, стр.1, этаж 2, пом.11
            </p>
          </div>
        </div>
        <div className="py-5 md:py-6 md:border-t md:border-t-border-gray">
          <div className="text-uppercase mb-3">
            ИНФОРМАЦИЯ О ПРАВЕ ПОТРЕБИТЕЛЕЙ ФИНАНСОВЫХ УСЛУГ НА НАПРАВЛЕНИЕ
            ОБРАЩЕНИЯ ФИНАНСОВОМУ УПОЛНОМОЧЕННОМУ
          </div>
          <div className="flex flex-col md:flex-row gap-5 md:gap-[112px]">
            <div className="flex-1 text-small">
              В целях соблюдения досудебного порядка урегулирования споров
              потребителей с микрофинансовой организацией (в случае отказа
              микрофинансовой организации удовлетворить требования потребителя),
              потребитель вправе направить обращение финансовому уполномоченному
              (Федеральный закон от 04.06.2018 № 123-ФЗ «Об уполномоченном по
              правам потребителей финансовых услуг»).
            </div>
            <div className="flex-1">
              <p className="mb-1">
                Контакты Финансового уполномоченного для обращений потребителя:
              </p>
              <p className="text-small mt-3">
                Официальный сайт{" "}
                <AppLink className="hover:underline text-common-brand" to="*">
                  www.finombudsman.ru
                </AppLink>
              </p>
              <p className="text-small mt-3">
                Номер телефона: 8 (800) 200-00-10
              </p>
              <p className="text-small mt-3">
                Адрес: 119017, г. Москва, Старомонетный переулок, дом 3,
                получатель АНО
              </p>
            </div>
          </div>
        </div>
        <div className="pt-5 border-t border-t-border-gray">
          <AppLink
            className="!text-small hover:underline mb-5 inline-block text-common-brand"
            to="*"
          >
            Информация о праве направить обращение на нарушение прав и законных
            интересов физических лиц при осуществлении деятельности по возврату
            просроченной задолженности в Федеральную службу судебных приставов
          </AppLink>
          <p className="text-small">
            ООО МФК «Бибимани» 2024. Все права защищены
          </p>
        </div>
      </Container>
    </footer>
  );
};
