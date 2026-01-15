import { useIsMobile } from "@/lib/responsive"
import { ButtonNextSection } from "../ButtonChangeSection";
import TitleEditor from "./TitleEditor";
import ContentEditor from "./ContentEditor";
import ProgressBar from "../ProgressBar";

export default function EditorContainer() {
  const isMobile = useIsMobile();

  return (
    <div className="w-full md:w-[calc(65%-10px)] h-full overflow-scroll flex flex-col gap-5">
      {isMobile && <ProgressBar />}
      <TitleEditor />
      <ContentEditor />
      {isMobile && <ButtonNextSection />}
    </div>
  )
}
