import { FC, PropsWithChildren } from "react";

import { ProfileHeader } from "@/widgets/header";
import { Sidebar } from "@/widgets/sidebar";
import { Container } from "@/widgets/container";

export const Profile: FC<PropsWithChildren<{ title: string }>> = ({
  children,
  title,
}) => {
  return (
    <>
      <ProfileHeader />
      <Container>
        <section className='flex flex-col md:flex-row gap-6 md:gap-16 mt-4 md:mt-9'>
          <Sidebar />
          <div className="flex flex-col gap-6">
            <h3 className="heading-3 md:heading-title">{title}</h3>
            <div>{children}</div>
          </div>
        </section>
      </Container>
    </>
  );
};
