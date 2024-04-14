import React from 'react';

interface UseCountdownParams {
  countStart: number;
  interval?: number;
  enabled?: boolean;
}

export const useCountdown = ({ interval = 1000, countStart }: UseCountdownParams) => {
  const intervalRef = React.useRef<ReturnType<typeof setInterval>>();
  const [count, setCount] = React.useState(countStart);

  const [enabled, setEnabled] = React.useState(true);

  React.useEffect(() => {
    if (!enabled) return;
    intervalRef.current = setInterval(() => {
      setCount((count) => count - 1);
    }, interval);

    return () => clearInterval(intervalRef.current);
  }, [enabled]);

  React.useEffect(() => {
    if (count === 0) {
      setEnabled(false);
      clearInterval(intervalRef.current);
    }
  }, [count]);

  const startCountdown = (time?: number) => {
    setCount(time ?? countStart);
    setEnabled(true);
  };

  return [count, { startCountdown }] as const;
};
