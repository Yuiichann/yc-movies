import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  const [lightTheme, setLightTheme] = useState<boolean>(() => {
    if (localStorage.getItem('themeOption')) {
      let themeOption: string | null = localStorage.getItem('themeOption');

      return themeOption === 'true';
    }
    return true;
  });

  useEffect(() => {
    if (lightTheme) {
      document.body.dataset.theme = 'light';
    } else {
      document.body.dataset.theme = 'dark';
    }
  }, [lightTheme]);

  const handleSetTheme = () => {
    let isLightTheme = !lightTheme;

    localStorage.setItem('themeOption', JSON.stringify(isLightTheme));
    setLightTheme(isLightTheme);
  };

  return (
    <div className="header section">
      <div className="header__logo">
        <h2>
          <Link to="/">YC Movies</Link>
        </h2>
      </div>

      <div className="header__btn">
        <input
          type="checkbox"
          className="checkbox"
          id="chk"
          onChange={handleSetTheme}
          checked={lightTheme ? false : true}
        />
        <label className="label" htmlFor="chk">
          <div className="ball"></div>
        </label>
      </div>
    </div>
  );
};

export default Header;
