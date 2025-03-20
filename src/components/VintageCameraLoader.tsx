import { useState, useEffect } from 'react';

export function VintageCameraLoader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = oldProgress + 1;
        return newProgress >= 100 ? 0 : newProgress;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-1 bg-muted relative overflow-hidden">
      <div className="absolute inset-y-0 left-0 bg-primary transition-all duration-300 flex items-center" style={{ width: `${progress}%` }}>
        <svg
          className="h-8 w-8 absolute right-0 top-1/2 -translate-y-1/2 text-primary animate-pulse"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 5H9M15 5H19C20.1046 5 21 5.89543 21 7V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V7C3 5.89543 3.89543 5 5 5H9M15 5V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17 8H17.01"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}