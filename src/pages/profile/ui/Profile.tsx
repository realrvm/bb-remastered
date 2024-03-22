import { FC, useEffect } from "react";
import { useGetProfile } from "../model/api/profileApi";

export const Profile: FC = () => {
  const [getProfile] = useGetProfile();

  useEffect(() => {
    async function fn() {
      const data = await getProfile().unwrap();
      console.log(data);
    }

    fn();
  }, [getProfile]);

  return <div>Profile</div>;
};
