import useGetFAQs from "@/api/queryHooks/FAQ/useGetFAQs";
import { ApiState } from "@/components/ApiState";
import { FAQContent } from "./FAQContent";

export default function FAQ() {
  const faqData= useGetFAQs();

  return (
    <ApiState query={faqData} loadingLabel="Loading FAQs…">
      {(faqs) => <FAQContent faqs={faqs} />}
    </ApiState>
  );
}