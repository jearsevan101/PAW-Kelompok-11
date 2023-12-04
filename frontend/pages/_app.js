import BackToTopButton from "@/components/BacktoTop";
import "@/styles/globals.css";
import { AuthContextProvider } from "@/utils/context/AuthContext";
import Head from "next/head";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>RentalIn</title>
      </Head>
      <AuthContextProvider>
        <ToastContainer />
        <BackToTopButton/>
        <Component {...pageProps} />
      </AuthContextProvider>
    </>
  );
}
