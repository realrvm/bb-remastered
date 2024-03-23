import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { Container } from "@/widgets/container";
import { SimpleHeader } from "@/widgets/header";
import { Button } from "@/shared/ui/button";
import { Clock } from "@/shared/ui/icons";

const ApplicationReview: FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <SimpleHeader />
      <div className="py-10 md:py-12 max-w-full md:max-w-[452px] mx-auto flex flex-col items-center">
        <div className="mb-6 md:mb-9 w-12 h-12 rounded-full bg-brand-light grid place-items-center shrink-0">
          <Clock />
        </div>
        <h2 className="heading-title md:heading-2 mb-3">
          Заявка на рассмотрении
        </h2>
        <p className="text-center mb-9">
          В течении 20 мин. с вами свяжется наш агент
        </p>
        <Button
          onClick={() => navigate("/profile/main")}
          className="w-full text-center mt-auto md:w-auto btn-medium"
        >
          Перейти в личный кабинет
        </Button>
      </div>
    </Container>
  );
};

export default ApplicationReview;
