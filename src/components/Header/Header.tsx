import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../../config/store';
import './Header.scss';

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const focusRef = useRef<HTMLInputElement | null>(null);
  const [keySearch, setKeySearch] = useState<string>('');
  const [showSearchMobile, setShowSearchMobile] = useState<boolean>(false);
  const [lightTheme, setLightTheme] = useState<boolean>(() => {
    if (localStorage.getItem('themeOption')) {
      let themeOption: string | null = localStorage.getItem('themeOption');

      return themeOption === 'true';
    }
    return true;
  });

  // set theme
  useEffect(() => {
    if (lightTheme) {
      document.body.dataset.theme = 'light';
    } else {
      document.body.dataset.theme = 'dark';
    }
  }, [lightTheme]);

  // handle settheme and save value in localstorage
  const handleSetTheme = () => {
    let isLightTheme = !lightTheme;

    localStorage.setItem('themeOption', JSON.stringify(isLightTheme));
    setLightTheme(isLightTheme);
  };

  // handle Search
  const handleSearch = () => {
    navigate(`/tim-kiem/${encodeURI(keySearch)}`);
    setKeySearch('');

    if (showSearchMobile) {
      setShowSearchMobile(false);
      focusRef.current?.blur();
    }
  };

  // hanlde search in mobile
  const handleShowSeachInput = () => {
    setShowSearchMobile((state) => !state);
    focusRef.current?.focus();
  };

  return (
    <div className="header section">
      {/* Logo */}
      <div className="header__logo">
        <h2>
          <Link to="/">YC Movies</Link>
        </h2>
      </div>

      <div className="header__menu">
        {/* search */}
        <div
          className="header__menu__search"
          onKeyUp={(e) => {
            if (e.which == 13) {
              handleSearch();
            }
          }}
        >
          <input
            type="text"
            className="search-input"
            placeholder="Tìm kiếm . . ."
            value={keySearch}
            onChange={(e) => setKeySearch(e.target.value)}
          />
          <div className="search-btn" onClick={handleSearch}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>

          <div
            className={`search-btn-mobile ${showSearchMobile && 'active'}`}
            onClick={handleShowSeachInput}
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>

          <div
            className={`search-input-mobile ${showSearchMobile && 'active'}`}
            onKeyUp={(e) => {
              if (e.which == 13) {
                handleSearch();
              }
            }}
          >
            <input
              ref={focusRef}
              type="text"
              placeholder="Enter từ khóa vào đây . . ."
              value={keySearch}
              onChange={(e) => setKeySearch(e.target.value)}
            />
          </div>
        </div>

        {/* btn */}
        <div className="header__menu__theme">
          <input
            type="checkbox"
            className="checkbox"
            id="chk"
            onChange={handleSetTheme}
            checked={lightTheme ? false : true}
            hidden
          />

          <label htmlFor="chk" className="label">
            <i className="fa-solid fa-sun"></i>
            <i className="fa-solid fa-moon"></i>
          </label>
        </div>
        {/* end btn */}

        {/* user */}

        {user.isLogin ? (
          <Link to="/tai-khoan" className="header__menu__user header__menu__user--with-img">
            <img src={user.current.photoUrl} alt="logo__google" />
          </Link>
        ) : (
          <Link to="/dang-nhap" className="header__menu__user">
            <i className="fa-solid fa-user"></i>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
