import Footer from "../../components/Footer";
import Track from "../../components/OrderTracking";
import Header from "../../components/Header";
import CartButton from "../../components/CartButton";
const CenteredLayout = () => {
  return (
    <div className="h-screen flex bg-black">
      <div className="bg-black flex-1"></div>

      <div className="bg-white w-full max-w-md mx-auto shadow-lg overflow-y-auto">
        <Header />
        <Track />
        <CartButton />
        {/* <div className="position-relative fixed bottom-0" style={{width: "440px"}}> */}
        <Footer />
        {/* </div> */}
      </div>

      <div className="bg-black flex-1"></div>
    </div>
  );
};

export default CenteredLayout;
