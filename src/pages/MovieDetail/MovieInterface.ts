export interface Movie {
  thumb_url: string;
  poster_url: string;
  trailer_url: string;
  name: string;
  origin_name: string;
  year: number;
  slug: string;
  content: string;
  type: string;
  lang: string;
  chieurap: boolean;
  time: string;
  episode_total: string;
  episode_current: string;
  quality: string;
  actor: string[];
  category: {
    name: string;
  }[];
  country: {
    name: string;
  }[];
  director: string[];
}
