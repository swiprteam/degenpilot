export type ScoreDetail = {
  pros: string[];
  cons: string[];
};

export type Score = {
  value: number;
  title: string;
  color: string;
  details: ScoreDetail;
  grades: TokenGrade;
};



export type TokenGrade = {
  social: number;
  mediumHolders: number;
  littleHolders: number;
  volume: number;
  supplyAudit: number;
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
  creationDate: Date
};
export type TokenLinks = {
  website: string;
  twitter: string;
  telegram: string;
  discord: string;
};


 export interface Estimation {
  estimation?: number;
  id?: string;
  //request?: EstimationRequest;
  // It is an same of request.steps but with Approve step added if needed
  error?: string;
}