import { useState, useEffect } from 'react';

export interface ClockState {
  rawDate: Date;
  formattedTime: string; // e.g., "05:45 PM"
  formattedDate: string; // e.g., "27 May 2026"
  greeting: 'Morning' | 'Afternoon' | 'Evening' | 'Night';
}

export const useClock = (updateIntervalMs: number = 1000): ClockState => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, updateIntervalMs);

    // Hard memory teardown pass on unmount layout operations
    return () => clearInterval(timer);
  }, [updateIntervalMs]);

  // Format Time: HH:MM AM/PM
  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  // Format Date: DD MMM YYYY
  const formattedDate = currentTime.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  // Calculate semantic enterprise context greetings
  const greeting = (() => {
    const hours = currentTime.getHours();
    if (hours >= 5 && hours < 12) return 'Morning';
    if (hours >= 12 && hours < 17) return 'Afternoon';
    if (hours >= 17 && hours < 21) return 'Evening';
    return 'Night';
  })();

  return {
    rawDate: currentTime,
    formattedTime,
    formattedDate,
    greeting,
  };
};