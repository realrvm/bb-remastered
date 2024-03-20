import { FC } from "react";

import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";

export const NotFound: FC = () => {
  return (
    <div className='container'>
      <Header />
      <h2 className="text-2xl font-bold">Not Found Page</h2>
      <Footer />
    </div>
  );
};
