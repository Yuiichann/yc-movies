import { useEffect, useState } from 'react';

const ScrollButton = () => {
  const [showBtnScroll, setShowBtnScroll] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 300) {
        setShowBtnScroll(true);
      } else {
        setShowBtnScroll(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <>
      {showBtnScroll ? (
        <div className="scroll-top" onClick={handleScrollToTop}>
          <img src="https://img.icons8.com/ios-filled/50/000000/circled-chevron-up.png" />
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default ScrollButton;
