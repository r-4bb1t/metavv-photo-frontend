import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

export interface Photo {
  id: number;
  img: string;
  score: number;
}

interface ResultContextProps {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  images: Photo[];
  setImages: Dispatch<SetStateAction<Photo[]>>;
}

export const ResultContext = createContext<ResultContextProps>({
  name: "",
  setName: () => {},
  images: [],
  setImages: () => {},
});

const ResultContextProvider = ({ children }: { children: ReactNode }) => {
  const [name, setName] = useState("");
  const [images, setImages] = useState([] as Photo[]);

  return (
    <ResultContext.Provider
      value={{
        name,
        setName,
        images,
        setImages,
      }}
    >
      {children}
    </ResultContext.Provider>
  );
};

export default ResultContextProvider;
