import { FC } from "react";

import { main_faqs } from "@/shared/lib/variables/main/main-faq";
import { Accordion } from "@/widgets/accordion";

export const MainFAQ: FC = () => {
  return (
    <section className="my-14 md:my-[5.5rem]">
      <h3 className="heading-3 md:heading-title mb-6">
        Часто задаваемые вопросы
      </h3>
      <Accordion faqs={main_faqs} />
    </section>
  );
};
