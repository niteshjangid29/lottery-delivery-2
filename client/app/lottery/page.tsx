import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Card from "../../components/cards/Card";

const CenteredLayout = () => {
  return (
    <div className="h-screen flex bg-black">
      <div className="bg-black flex-1"></div>

      <div className="bg-white w-full max-w-md mx-auto shadow-lg overflow-y-auto">
        <Header />
        <Card />
        {/* <div className="position-relative fixed bottom-0" style={{width: "31.8%"}}> */}
        <Footer />
        {/* </div> */}
      </div>

      <div className="bg-black flex-1"></div>
    </div>
  );
};

export default CenteredLayout;
