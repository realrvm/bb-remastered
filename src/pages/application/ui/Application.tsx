import { FC, PropsWithChildren, memo } from "react";

import { Container } from "@/widgets/container";
import { SimpleHeader } from "@/widgets/header";
import { useLocationIndex } from "../lib/hooks";
import { cn } from "@/shared/lib/cn";

export const Application: FC<PropsWithChildren> = ({ children }) => {
  const { locationIndex } = useLocationIndex();

  return (
    <Container>
      <SimpleHeader />
      <section className="flex flex-col h-[calc(100vh-80px)] mx-auto md:h-auto md:mt-12 md:border md:border-border-gray md:rounded-lg md:max-w-[616px]">
        <div className="flex items-center justify-between pb-6 md:p-9">
          <h2 className="heading-title md:heading-2">Заявка</h2>
          <div className="flex gap-1 items-center">
            {Array.from({ length: 3 }).map((_, i) => (
              <ApplicationStep
                key={i}
                locationIndex={locationIndex}
                serialIndex={i + 1}
              />
            ))}
          </div>
        </div>
        <div className="h-px bg-border-gray"></div>
        {children}
      </section>
    </Container>
  );
};

const ApplicationStep: FC<{ locationIndex: number; serialIndex: number }> =
  memo(({ locationIndex, serialIndex }) => {
    return (
      <>
        {serialIndex !== 1 && (
          <span className="w-5 h-0.5 bg-brand-light"></span>
        )}
        <span
          className={cn(
            "h-9 w-9 rounded-full heading-5 grid place-items-center bg-brand-light text-common-brand",
            {
              "text-common-white bg-common-brand":
                locationIndex === serialIndex,
            },
          )}
        >
          {serialIndex}
        </span>
      </>
    );
  });

export const ApplicationTitle: FC<PropsWithChildren> = memo(({ children }) => {
  return (
    <div className="py-6 md:pt-9 md:pb-0 md:px-9">
      <h4 className="heading-4">{children}</h4>
    </div>
  );
});
