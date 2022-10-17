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
}

export const DataContext = createContext<DataContextProps>({
  name: "",
  setName: () => {},
  images: [],
  setImages: () => {},
});

const DataContextProvider = ({ children }: { children: ReactNode }) => {
  const [name, setName] = useState("");
  const [images, setImages] = useState([] as { file: File; id: string }[]);

  return (
    <DataContext.Provider
      value={{
        name,
        setName,
        images,
        setImages,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
