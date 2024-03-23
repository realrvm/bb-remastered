import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { useActionCreators } from "@/app/providers/rtk";
import { targetPageActions } from "@/entities/target-page";
import { TargetPages } from "@/shared/lib/enums";
import { useGetProfile } from "@/pages/profile/model/api/profileApi";

export function useNavigateTo(page: TargetPages) {
  const navigate = useNavigate();
  const targetPageAction = useActionCreators(targetPageActions);

  const [getProfile, { isFetching: isNavigateFetching }] = useGetProfile();

  const handleNavigateTo = useCallback(async () => {
    try {
      targetPageAction.setTargetPage(page);

      await getProfile().unwrap();

      navigate(page);
    } catch (e) {
      if (
        page === TargetPages.APPLICATION_VEHICLE ||
        page === TargetPages.APPLICATION_CALCULATOR
      ) {
        navigate(`${TargetPages.AUTH}/application`);
      }
      if (page === TargetPages.PROFILE) {
        navigate(`${TargetPages.AUTH}/profile`);
      }
    }
  }, [navigate, page, targetPageAction, getProfile]);

  return { handleNavigateTo, isNavigateFetching };
}
