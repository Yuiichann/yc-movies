const apiConfig = {
  baseUrl: 'https://ophim1.com/',
  thumbUrl: (slug: string) => `https://img.ophim.tv/uploads/${slug}-thumb.jpg`,
  posterUrl: (slug: string) => `https://img.ophim.tv/uploads/${slug}-poster.jpg`,
};

export default apiConfig;
