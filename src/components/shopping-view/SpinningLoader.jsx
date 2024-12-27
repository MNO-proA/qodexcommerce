import { Loader } from "lucide-react";

const SpinningLoader = () => {
  return (
    <div className="inline-flex items-center justify-center">
      <Loader 
        className="animate-spin" 
        color="#000000" 
        size={20}
      />
    </div>
  );
};

export default SpinningLoader;