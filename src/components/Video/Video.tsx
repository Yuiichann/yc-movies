import React, { memo, useEffect, useState } from 'react';
import './Video.scss';
import { Player } from 'video-react';

interface Props {
  url_yt?: string;
  url_video?: string;
}

const Video = (props: Props) => {
  const { url_yt, url_video } = props;
  const [url, setUrl] = useState<string>('');

  useEffect(() => {
    setUrl('');
    if (url_yt) {
      const getId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);

        return match && match[2].length === 11 ? match[2] : null;
      };
      setUrl(`https://youtube.com/embed/${getId(url_yt)}`);
    }

    if (url_video) {
      setUrl(url_video);
    }
  }, [props]);

  return (
    <div className="video">
      {url ? <iframe src={url} allowFullScreen></iframe> : <h3>Không có video</h3>}
    </div>
  );
};

export default memo(Video);
