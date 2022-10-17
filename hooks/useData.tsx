import { useContext } from "react";
import { DataContext } from "../contexts/dataContext";

export const useData = () => useContext(DataContext);
