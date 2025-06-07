"use client";
import React, { useEffect, useState } from "react";

interface LoadingBarProps {
  isLoading: boolean;
}

const LoadingBar = ({ isLoading }: LoadingBarProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: number | undefined;
    let timeout: number | undefined;

    if (isLoading) {
      setProgress(0);

      // Fast initial progress to 30%
      interval = window.setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress < 30) {
            return prevProgress + 5;
          } else if (prevProgress < 80) {
            return prevProgress + 0.5;
          }
          return prevProgress;
        });
      }, 100);

      // Clean up function
      return () => {
        if (interval) window.clearInterval(interval);
        if (timeout) window.clearTimeout(timeout);
      };
    } else if (progress > 0) {
      // Complete the progress bar when loading is done
      setProgress(100);
      timeout = window.setTimeout(() => {
        setProgress(0);
      }, 500);

      return () => {
        if (timeout) window.clearTimeout(timeout);
      };
    }
  }, [isLoading, progress]);

  if (progress === 0) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 h-2 z-50">
      <div
        className="h-full bg-blue-500 transition-all duration-300 ease-out"
        style={{
          width: `${progress}%`,
          backgroundImage: "linear-gradient(90deg, #0EA5E9 0%, #3B82F6 100%)",
          boxShadow: "0 0 10px rgba(59, 130, 246, 0.7)",
        }}
      />
    </div>
  );
};

export default LoadingBar;
