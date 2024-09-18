import { TokenInterface } from "~/types/interfaces";
import { Serializable } from "./serializable";
import {
  Agregation,
  Score,
  TokenFinancial,
  TokenMeta,
  TokenSocial,
} from "~/types/types";

import { v4 as uuid } from "uuid";
export class Token extends Serializable implements TokenInterface {
  id: string;
  score: Score;
  meta: TokenMeta;
  financial: TokenFinancial;
  social: TokenSocial;
  poolsAggregation: Agregation;

  static byId: { [id: string]: TokenInterface } = {};

  constructor(token: TokenInterface) {
    super();
    this.id = token.id ?? uuid();
    this.score = token.score;
    this.meta = token.meta;
    this.financial = token.financial;
    this.social = token.social;
    this.poolsAggregation = token.poolsAggregation;
    Token.byId[this.id] = this;
  }
}
