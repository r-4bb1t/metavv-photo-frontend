import { useContext } from "react";
import { ResultContext } from "../contexts/resultContext";

export const useResult = () => useContext(ResultContext);
