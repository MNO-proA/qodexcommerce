import { useState, useEffect } from "react";

const AnimatedLoader = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % 3);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center gap-2 h-8">
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className={`w-2 h-2 rounded-full bg-white transition-all duration-500 ease-in-out ${
            index === activeIndex ? "opacity-100" : "opacity-30"
          }`}
        />
      ))}
    </div>
  );
};

export default AnimatedLoader;
