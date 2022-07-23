import React, { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ophimApi from '../../api/ophimApi';
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
  const { slug } = useParams(); // thang lon nay lam cho component re-render ne
  const [episodes, setEpisodes] = useState<Episode>();
  const [currEp, setCurrEp] = useState<string>('');

  useEffect(() => {
    const getEpisodes = async () => {
      if (slug) {
        const res = await ophimApi.getOneMovie(slug);
        setEpisodes(res.data.episodes[0]);
      }
    };
    getEpisodes();
  }, []);

  const handleSetEp = (url: string) => {
    setCurrEp(url);
  };

  console.log(currEp);

  return (
    <div className="main section section--sm">
      {currEp && <Video url_video={currEp} />}
      <div className="episodes">
        <div className="ep__list">
          {episodes?.server_data.map((ep, index) => (
            <div className="ep__list__item" key={index} onClick={() => handleSetEp(ep.link_embed)}>
              {!ep.name ? 'Đợi cập nhật . . .' : ep.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(WatchMovie);
