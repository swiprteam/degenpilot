export type ScoreDetail = {
  pros: string[];
  cons: string[];
};

export type Score = {
  value: number;
  title: string;
  color: string;
  details: ScoreDetail;
};

enum GradeType {
  VOLUME = "volume",
  SMALL_HOLDERS = "medium_holders",
  BIG_HOLDERS = "big_holders",
  SOCIAL = "social",
}

export type TokenGrade = {
  value: number;
  type: GradeType;
};

export type TokenMeta = {
  name: string;
  symbol: string;
  address: string;
  image: string;
  creationDate: string;
  score: Score;
};

export type TokenFinancial = {
  supply: number;
  price: string;
  marketCap: number;
};

export type TokenInfo = {
  name: string;
  symbol: string;
  address: string;
  imageUrl: string;
  h24Change: number;
  h6Change: number;
  decimals: number;
  chainId: number;
  rooterContract: string;
  marketCap: number;
};
export type TokenLinks = {
  website: string;
  twitter: string;
  telegram: string;
  discord: string;
};
