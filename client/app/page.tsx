import Footer from "../components/Footer";
import Header from "../components/Header";
import HowToUse from "../components/HowToUse";
import Carousel from "../components/Carousel";
import HomeCard from "../components/cards/CardforHome";
import SuperCard from "../components/cards/Supercard";
import BestsellerCard from "../components/cards/BestSellerCard";
const CenteredLayout = () => {
  return (
    <div className="h-screen flex bg-black">
      <div className="bg-black flex-1"></div>

      <div className="bg-white w-full max-w-md mx-auto shadow-lg overflow-y-auto">
        <Header />
        <Carousel />
        <SuperCard />
        <BestsellerCard />
        <HomeCard />
        <HowToUse />
        <Footer />
      </div>

      <div className="bg-black flex-1"></div>
    </div>
  );
};

export default CenteredLayout;
