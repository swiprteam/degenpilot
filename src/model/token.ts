import { TokenInterface } from "~/types/interfaces";
import { Serializable } from "./serializable";
import {
  Agregation,
  Score,
  TokenFinancial,
  TokenMeta,
  TokenSocial,
} from "~/types/types";

export class Token extends Serializable implements TokenInterface {
  score: Score;
  meta: TokenMeta;
  financial: TokenFinancial;
  social: TokenSocial;
  poolsAggregation: Agregation;
  constructor(token: TokenInterface) {
    super();
    this.score = token.score;
    this.meta = token.meta;
    this.financial = token.financial;
    this.social = token.social;
    this.poolsAggregation = token.poolsAggregation;
  }
}
