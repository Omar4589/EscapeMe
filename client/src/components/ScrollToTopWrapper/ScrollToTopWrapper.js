import { useEffect } from "react";

const ScrollToTop = (WrappedComponent) => {
  const ScrollComponent = (props) => {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    return <WrappedComponent {...props} />;
  };

  return ScrollComponent;
};

export default ScrollToTop;
