import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface DataContextProps {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  images: { file: File; id: string }[];
  setImages: Dispatch<SetStateAction<{ file: File; id: string }[]>>;
  len: number;
  setLen: Dispatch<SetStateAction<number>>;
}

export const DataContext = createContext<DataContextProps>({
  name: "",
  setName: () => {},
  images: [],
  setImages: () => {},
  len: 2,
  setLen: () => {},
});

const DataContextProvider = ({ children }: { children: ReactNode }) => {
  const [name, setName] = useState("");
  const [images, setImages] = useState([] as { file: File; id: string }[]);

  const [len, setLen] = useState(2);

  return (
    <DataContext.Provider
      value={{
        name,
        setName,
        images,
        setImages,
        len,
        setLen,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
