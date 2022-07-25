import React, { memo, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ophimApi from '../../api/ophimApi';
import Loading from '../../components/Loading/Loading';
import Video from '../../components/Video/Video';
import './WatchMovie.scss';

interface Episode {
  server_name: string;
  server_data: {
    name: string;
    slug: string;
    link_embed: string;
  }[];
}

const WatchMovie: React.FC = () => {
  const { slug } = useParams(); // thang ngu nay lam cho component re-render ne
  const [episodes, setEpisodes] = useState<Episode>();
  const [currEp, setCurrEp] = useState<string | null>('');
  const [active, setActive] = useState<string>('');

  // Scroll top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const getEpisodes = async () => {
      if (slug) {
        const res = await ophimApi.getOneMovie(slug);
        setEpisodes(() => res.data.episodes[0]);
        if (res.data.episodes[0].server_data[0].link_embed) {
          setCurrEp(() => res.data.episodes[0].server_data[0].link_embed);
          setActive(() => res.data.episodes[0].server_data[0].slug);
        } else {
          setCurrEp(() => null);
        }
      }
    };
    getEpisodes();
  }, []);

  const handleSetEp = (url: string, slug: string) => {
    setCurrEp(() => url);
    setActive(() => slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="main section section--sm">
      {!episodes ? (
        <Loading />
      ) : (
        <>
          {/* Video Movie */}
          {currEp && <Video url_video={currEp} />}

          {/* List Episodes */}
          <div className="episodes">
            {/* check du lieu cua server_data da co chua? */}
            {!currEp ? (
              <div style={{ textAlign: 'center' }}>
                <h1>Chưa có dữ liệu phim. Xin lỗi vì sự chậm trễ này!</h1>
                <Link to="/">Về trang chủ</Link>
              </div>
            ) : (
              <>
                <h1 style={{ textAlign: 'center' }}>SERVER: {episodes?.server_name}</h1>
                <div className="ep__list">
                  {episodes?.server_data.map((ep, index) => (
                    <div
                      className={`ep__list__item ${ep.slug === active ? 'active' : ''}`}
                      key={index}
                      onClick={() => handleSetEp(ep.link_embed, ep.slug)}
                    >
                      {!ep.name ? 'Đợi cập nhật . . .' : ep.name}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default memo(WatchMovie);
