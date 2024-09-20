import { TokenInterface } from "~/types/interfaces";
import { Serializable } from "./serializable";
import { Score, TokenInfo, TokenLinks } from "~/types/types";

export class Token
  extends Serializable<TokenInterface>
  implements TokenInterface
{
  _id: string;
  info: TokenInfo;
  links: TokenLinks;
  score: Score;

  static byId: { [_id: string]: TokenInterface } = {};
  constructor(token: TokenInterface) {
    super();
    this._id = token._id;
    this.score = token.score;
    this.info = token.info;
    this.links = token.links;
    this.score = token.score;

    Token.byId[this._id] = this;
  }
}
