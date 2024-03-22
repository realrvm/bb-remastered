import { Loader } from "@/shared/ui/loader";

export const Loading = () => {
  // TODO
  return (
    <div className="flex flex-col h-screen w-screen">
      <Loader className="flex-1 mx-auto" />
    </div>
  );
};
