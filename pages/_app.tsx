import "../styles/globals.css";
import type { AppProps } from "next/app";
import DataContextProvider from "../contexts/dataContext";
import ResultContextProvider from "../contexts/resultContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ResultContextProvider>
      <DataContextProvider>
        <Component {...pageProps} />
      </DataContextProvider>
    </ResultContextProvider>
  );
}

export default MyApp;
