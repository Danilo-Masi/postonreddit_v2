import { useIsMobile } from "@/lib/responsive";
import { useAppContext } from "@/context/AppContext";
import Layout from "../components/layout/Layout";
import Editor from "../components/dashboard/Editor/Editor";
import Options from "../components/dashboard/Options/Options";
import Result from "@/components/dashboard/Result/Result";
import Review from "@/components/dashboard/Review/Review";

export default function Dashboard() {
  const isMobile = useIsMobile();
  const { dashboardSectionMobile, dashboardSectionDesktop } = useAppContext();

  const renderSectionMobile = () => {
    switch (dashboardSectionMobile) {
      case 1:
        return <Editor />
      case 2:
        return <Options />
      case 3:
        return <Result />
      case 4:
        return <Review />
      default:
        return <Editor />
    }
  }

  const renderSectionDesktop = () => {
    switch (dashboardSectionDesktop) {
      case 1:
        return (<><Editor /><Options /></>)
      case 2:
        return (<><Result /><Review /></>)
      default:
        return (<><Editor /><Options /></>)
    }
  }

  return (
    <Layout>
      {isMobile ? renderSectionMobile() : renderSectionDesktop()}
    </Layout>
  )
}
