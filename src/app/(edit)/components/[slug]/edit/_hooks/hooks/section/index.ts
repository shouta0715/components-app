import { useSetAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { editStatusAtom } from "@/app/(edit)/components/[slug]/edit/_hooks/contexts";
import {
  CheckEditStatusData,
  EditStatus,
  EditingSteps,
} from "@/app/(edit)/components/[slug]/edit/_hooks/types";
import {
  getCurrentEditingSteps,
  getInitialEditStatus,
  getNextEditingStep,
  paramsToEditingStep,
} from "@/app/(edit)/components/[slug]/edit/_hooks/utils";
import { useHistory } from "@/lib/next/hooks";
import { EditComp } from "@/types/prisma";

export const useRedirectSectionHandler = (inputSection: EditingSteps) => {
  const { push } = useHistory();

  // 次のセクションに進む
  const onNextSection = useCallback(() => {
    push({
      section: getNextEditingStep(inputSection),
    });
  }, [inputSection, push]);

  // 指定のセクションにリダイレクト
  const onRedirect = useCallback(() => {
    push({
      section: inputSection,
    });
  }, [inputSection, push]);

  return {
    push,
    onNextSection,
    onRedirect,
  };
};

export function useRedirectSection(inputSection: EditingSteps) {
  const { push, onNextSection, onRedirect } =
    useRedirectSectionHandler(inputSection);

  const searchParams = useSearchParams();

  const currentSection = paramsToEditingStep(searchParams.get("section"));

  const active = currentSection === inputSection;

  return {
    currentSection,
    push,
    onNextSection,
    onRedirect,
    active,
  };
}

export const useInitializeSection = () => {
  const searchParams = useSearchParams();
  const setStatus = useSetAtom(editStatusAtom);
  const currentSection = paramsToEditingStep(searchParams.get("section"));

  // 進むボタンや戻るボタンでセクションを変更したときに、合わせるようにステータスを変更する
  const checkInitialStatus = useCallback(
    (prev: EditStatus) => {
      if (prev[currentSection].status === "EDITING") return prev;

      const prevSection = getCurrentEditingSteps(prev);

      const prevStatus = {
        ...prev[prevSection],
        status: prev[prevSection].dataStatus,
      };

      const currentStatus = { ...prev[currentSection], status: "EDITING" };

      return {
        ...prev,
        [prevSection]: prevStatus,
        [currentSection]: currentStatus,
      };
    },
    [currentSection]
  );

  useEffect(() => {
    setStatus((prev) => {
      return checkInitialStatus(prev);
    });
  }, [checkInitialStatus, setStatus]);
};

export const useHydrateSection = (data: EditComp) => {
  const { name, draft, files, document } = data;
  const checkStatusData: CheckEditStatusData = {
    name,
    document,
    draft,
    fileLength: files.length,
  };

  const searchParams = useSearchParams();

  const section = paramsToEditingStep(searchParams.get("section"));

  useHydrateAtoms(
    new Map([[editStatusAtom, getInitialEditStatus(checkStatusData, section)]])
  );

  return {
    section,
  };
};
