import { useRouter } from "next/router";
import Navbar from "@/components/navbar";
import ReusableForm from "@/components/Form";
export default function OrdersForm() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Navbar />
      <div className="container min-h-screen mx-auto pt-20"></div>
    </>
  );
}
