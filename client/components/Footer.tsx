"use client";
import Link from "next/link";
import { IoHome, IoTicket, IoDocumentText } from "react-icons/io5";
import { FaTrophy, FaHistory } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setCurrTab } from "../redux/slice/currTabSlice";
import { RootState } from "../redux/store";

const Footer: React.FC = () => {
  const currTab = useSelector((state: RootState) => state.currTab.currTab);
  const dispatch = useDispatch();
  const isLogin = useSelector((state: RootState) => state.user.isLogin)
  return (
    <footer
      className="bg-gray-100 py-2 flex justify-around border-t fixed bottom-0 w-full"
      style={{ position: "sticky", bottom: 0 }}
    >
      <Link
        className={`flex flex-col items-center ${
          currTab === "Home" ? "text-blue-500" : "text-gray-500"
        }`}
        href="/"
        onClick={() => dispatch(setCurrTab("Home"))}
      >
        <span className="text-xl">
          <IoHome />
        </span>
        <p className="text-sm mt-1">Home</p>
      </Link>
      <Link
        className={`flex flex-col items-center ${
          currTab === "Lottery" ? "text-blue-500" : "text-gray-500"
        }`}
        href="/lottery"
        onClick={() => dispatch(setCurrTab("Lottery"))}
      >
        <span className="text-xl">
          <IoTicket />
        </span>
        <p className="text-sm mt-1">Lottery</p>
      </Link>
      <Link
        className={`flex flex-col items-center ${
          currTab === "Result" ? "text-blue-500" : "text-gray-500"
        }`}
        href="/results"
        onClick={() => dispatch(setCurrTab("Result"))}
      >
        <span className="text-xl">
          <IoDocumentText />
        </span>
        <p className="text-sm mt-1">Result</p>
      </Link>
      <Link
        className={`flex flex-col items-center ${
          currTab === "Winner" ? "text-blue-500" : "text-gray-500"
        }`}
        href="/winner"
        onClick={() => dispatch(setCurrTab("Winner"))}
      >
        <span className="text-xl">
          <FaTrophy />
        </span>
        <p className="text-sm mt-1">Winner</p>
      </Link>
      <Link
        className={`flex flex-col items-center ${
          currTab === "History" ? "text-blue-500" : "text-gray-500"
        }`}
        href={isLogin ? "/history":"login"}
        onClick={() => {if(isLogin){dispatch(setCurrTab("History"))}}}
      >
        <span className="text-xl">
          <FaHistory />
        </span>
        <p className="text-sm mt-1">History</p>
      </Link>
    </footer>
  );
};

export default Footer;
