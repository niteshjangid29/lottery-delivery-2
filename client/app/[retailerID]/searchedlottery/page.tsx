import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import SearchCard from "../../../components/cards/Searchcard";
import { Suspense } from "react";
const CenteredLayout = () => {
  return (
    <div className="h-screen flex bg-black">
      <div className="bg-black flex-1"></div>

      <div className="bg-white w-full max-w-md mx-auto shadow-lg overflow-y-auto">
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <SearchCard />
        </Suspense>
        {/* <div className="position-relative fixed bottom-0" style={{width: "31.8%"}}> */}
        <Footer />
        {/* </div> */}
      </div>

      <div className="bg-black flex-1"></div>
    </div>
  );
};

const CenteredLayoutPage=()=> {
  return(
    <Suspense fallback={<div>Loading...</div>}>
      <CenteredLayout />
    </Suspense>
  );
}
export default CenteredLayoutPage;