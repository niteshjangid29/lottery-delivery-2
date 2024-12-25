"use client";
import { useRouter } from "next/navigation";
import { IoHome, IoTicket, IoDocumentText } from "react-icons/io5";
import { FaTrophy, FaHistory } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setCurrTab } from "../redux/slice/currTabSlice";
import { RootState } from "../redux/store";

const Footer: React.FC = () => {
  const currTab = useSelector((state: RootState) => state.currTab.currTab);
  const isRetailer = useSelector((state: RootState) => state.retailer.isRetailer);
  const id = useSelector((state: RootState) => state.retailer.id);
  const isLogin = useSelector((state: RootState) => state.user.isLogin);
  const dispatch = useDispatch();
  const router = useRouter();

  const navigateTo = (path: string, tab: string) => {
    router.push(path);
    dispatch(setCurrTab(tab));
  };

  return (
    <footer
      className="bg-gray-100 py-2 flex justify-around border-t fixed bottom-0 w-full"
      style={{ position: "sticky", bottom: 0 }}
    >
      {/* Home */}
      <button
        className={`flex flex-col items-center ${
          currTab === "Home" ? "text-blue-500" : "text-gray-500"
        }`}
        onClick={() =>
          navigateTo(isRetailer ? `/${id}` : `/`, "Home")
        }
      >
        <span className="text-xl">
          <IoHome />
        </span>
        <p className="text-sm mt-1">Home</p>
      </button>

      {/* Lottery */}
      <button
        className={`flex flex-col items-center ${
          currTab === "Lottery" ? "text-blue-500" : "text-gray-500"
        }`}
        onClick={() =>
          navigateTo(isRetailer ? `/${id}/lottery` : `/lottery`, "Lottery")
        }
      >
        <span className="text-xl">
          <IoTicket />
        </span>
        <p className="text-sm mt-1">Lottery</p>
      </button>

      {/* Results */}
      <button
        className={`flex flex-col items-center ${
          currTab === "Result" ? "text-blue-500" : "text-gray-500"
        }`}
        onClick={() =>
          navigateTo(isRetailer ? `/${id}/results` : `/results`, "Result")
        }
      >
        <span className="text-xl">
          <IoDocumentText />
        </span>
        <p className="text-sm mt-1">Result</p>
      </button>

      {/* Winner */}
      <button
        className={`flex flex-col items-center ${
          currTab === "Winner" ? "text-blue-500" : "text-gray-500"
        }`}
        onClick={() =>
          navigateTo(isRetailer ? `/${id}/winner` : `/winner`, "Winner")
        }
      >
        <span className="text-xl">
          <FaTrophy />
        </span>
        <p className="text-sm mt-1">Winner</p>
      </button>

      {/* History */}
      <button
        className={`flex flex-col items-center ${
          currTab === "History" ? "text-blue-500" : "text-gray-500"
        }`}
        onClick={() =>
          navigateTo(isLogin 
            ? (isRetailer ? `/${id}/history` : `/history`) 
            : (isRetailer ? `/${id}/login` : `/login`), 
          "History")
        }
      >
        <span className="text-xl">
          <FaHistory />
        </span>
        <p className="text-sm mt-1">History</p>
      </button>
    </footer>
  );
};

export default Footer;
