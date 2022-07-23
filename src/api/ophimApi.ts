import axiosClient, { Params } from './axiosClient';

const ophimApi = {
  getMoviesLatest: (params: Params) => {
    const url = 'danh-sach/phim-moi-cap-nhat';
    return axiosClient.get(url, { params });
  },
  getOneMovie: (slug: string) => {
    const url = `phim/${slug}`;
    return axiosClient.get(url);
  },
};

export default ophimApi;
