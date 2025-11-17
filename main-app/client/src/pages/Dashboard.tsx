import { useIsMobile } from "@/lib/responsive";
import { useAppContext } from "@/context/AppContext";
import Layout from "../components/layout/Layout";
import EditorContainer from "../components/dashboard/Editor/EditorContainer";
import OptionsContainer from "../components/dashboard/Options/OptionsContainer";
import ResultContainer from "@/components/dashboard/Result/ResultContainer";
import ReviewContainer from "@/components/dashboard/Review/ReviewContainer";
import ProgressBar from "@/components/dashboard/ProgressBar";

export default function Dashboard() {
  const isMobile = useIsMobile();
  const { dashboardSectionMobile, dashboardSectionDesktop } = useAppContext();

  const renderSectionMobile = () => {
    switch (dashboardSectionMobile) {
      case 1:
        return <EditorContainer />
      case 2:
        return <OptionsContainer />
      case 3:
        return <ResultContainer />
      case 4:
        return <ReviewContainer />
      default:
        return <EditorContainer />
    }
  }

  const renderSectionDesktop = () => {
    switch (dashboardSectionDesktop) {
      case 1:
        return (<><EditorContainer /><OptionsContainer /></>)
      case 2:
        return (<><ResultContainer /><ReviewContainer /></>)
      default:
        return (<><EditorContainer /><OptionsContainer /></>)
    }
  }

  return (
    <Layout>
      {isMobile && <ProgressBar />}
      {isMobile ? renderSectionMobile() : renderSectionDesktop()}
    </Layout>
  )
}
