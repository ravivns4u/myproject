import * as React from 'react';

const useOnScreen = (ref: any) => {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = React.useState(false);
  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
  }, []);
  return isIntersecting;
};
export default useOnScreen;
