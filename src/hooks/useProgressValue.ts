import { useState, useEffect } from 'react';

type ProgressValueHook = {
  progress: number;
  isLoading: boolean;
};

const useProgressValue = (delay: number): ProgressValueHook => {
  const [progress, setProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        setIsLoading(false);
        const randomIncrement = Math.floor(Math.random() * 31) + 10; // Random increment between 10 and 40
        setProgress((prevProgress) => {
          const nextProgress = prevProgress + randomIncrement;
          return nextProgress > 100 ? 100 : nextProgress; // Cap progress at 100
        });
      } else {
        setIsLoading(false);
        clearInterval(timer);
      }
    }, delay);

    return () => {
      clearInterval(timer)
    };
  }, [delay]);

  return { progress, isLoading };
};

export default useProgressValue;