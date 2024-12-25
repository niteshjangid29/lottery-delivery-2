import Login from "../../../components/Login";
const CenteredLayout = () => {
  return (
    <div className="h-screen flex bg-black">
      <div className="bg-black flex-1"></div>

      <div className="bg-white w-full max-w-md mx-auto shadow-lg overflow-y-auto">
        
        <Login/>
      </div>

      <div className="bg-black flex-1"></div>
    </div>
  );
};

export default CenteredLayout;
