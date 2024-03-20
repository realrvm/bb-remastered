import { main_vehicles } from "@/shared/lib/variables/main/main-vehicles";
import { AppImage } from "@/shared/ui/app-image";

export const MainVehicles = () => {
  return (
    <section className="py-[1.75rem] md:py-11">
      <h2 className="mb-5 md:mb-9 heading-3 md:heading-title">
        Под что можно получить займ?
      </h2>
      <div className="grid gap-2 grid-cols-[repeat(auto-fill,minmax(540px,1fr))] max-[414px]:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] max-[650px]:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
        {main_vehicles.map(({ title, vehicle }) => (
          <div
            className="flex items-center justify-between rounded-lg border border-border-gray py-[5px] pl-5 overflow-hidden md:px-12"
            key={title}
          >
            <span className="heading-3 md:heading-4">{title}</span>
            <AppImage
              src={vehicle}
              alt={title}
              width={170}
              height={112}
              className="max-[500px]:translate-x-[20%]"
            />
          </div>
        ))}
      </div>
    </section>
  );
};
