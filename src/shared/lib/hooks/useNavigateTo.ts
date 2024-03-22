import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { useActionCreators } from "@/app/providers/rtk";
import { targetPageActions } from "@/entities/target-page";
import { TargetPages } from "@/shared/lib/enums";

export function useNavigateTo(page: TargetPages) {
  const navigate = useNavigate();
  const targetPageAction = useActionCreators(targetPageActions);

  // TODO
  const isNavigateFetching = false;

  const handleNavigateTo = useCallback(async () => {
    try {
      targetPageAction.setTargetPage(page);
      // TODO
      //await getFunction().unwrap();
      throw new Error();

      navigate(page);
    } catch (e) {
      if (page === TargetPages.APPLICATION) {
        navigate(`${TargetPages.AUTH}/application`);
      }
      if (page === TargetPages.PROFILE) {
        navigate(`${TargetPages.AUTH}/profile`);
      }
    }
  }, [navigate, page, targetPageAction]);

  return { handleNavigateTo, isNavigateFetching };
}
