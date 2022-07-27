const apiConfig = {
  baseUrl: 'https://ophim1.com/',
  thumbUrl: (slug: string) => `https://img.ophim.cc/uploads/${slug}-thumb.jpg`,
  posterUrl: (slug: string) => `https://img.ophim.cc/uploads/${slug}-poster.jpg`,
};

export default apiConfig;
