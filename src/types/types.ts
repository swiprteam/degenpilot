export type Score = {
  score: number;
  details: {
    social: {
      sentiment: { ssePenalty: number };
      smartEngagement: { ssePenalty: number };
      mindshare: { ssePenalty: number };
    };
    dailyVolumePercentage: number;
    liquidityPercentage: number;
    top10HolderPercentage: number;
    mintAuthority: string;
    freezeAuthority: string;
    creationDatePenalty: number;
  };
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

export type TokenSocial = {
  discord: string | null;
  twitter: string | null;
  telegram: string | null;
  website: string | null;
};

export type Agregation = {
  total: {
    liquidity: number;
    volume: { hour: number; day: number };
    poolsLength: number;
  };
};
