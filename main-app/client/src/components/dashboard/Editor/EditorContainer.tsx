import { useIsMobile } from "@/lib/responsive"
import { ButtonNextSection } from "../ButtonChangeSection";
import TitleEditor from "./TitleEditor";
import ContentEditor from "./ContentEditor";

export default function EditorContainer() {
  const isMobile = useIsMobile();

  return (
    <div className="w-full md:w-2/3 h-full overflow-scroll flex flex-col gap-8">
      <TitleEditor />
      <ContentEditor />

      {isMobile && <ButtonNextSection />}
    </div>
  )
}
