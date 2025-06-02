import { ContestContext } from "@/context/ContestContext";
import { useContext } from "react";

export const useContest = () => {
  const context = useContext(ContestContext);

  if(!context) {
    throw new Error("useCountest must be used within a CountestProvider");
  }

  return context;
}