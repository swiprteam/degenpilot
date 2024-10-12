import { TokenInterface } from "~/types/interfaces";
import { Serializable } from "./serializable";
import { Score, TokenInfo, TokenLinks } from "~/types/types";

export class Token
  extends Serializable<TokenInterface>
  implements TokenInterface
{
  id: string;
  info: TokenInfo;
  links: TokenLinks;
  score: Score;
  meta: {
    updatedAt: Date;
  };
  index: number;

  static byId: { [id: string]: TokenInterface } = {};
  constructor(token: TokenInterface) {
    super();
    this.id = token.id;
    this.score = token.score;
    this.info = token.info;
    this.links = token.links;
    this.score = token.score;
    this.meta = token.meta;
    this.index = token.index;

    Token.byId[this.id] = this;
  }
}
