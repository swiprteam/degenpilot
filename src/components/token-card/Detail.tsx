import { TokenInterface } from "~/types/interfaces";
import TokenImage from "~/components/TokenImage";
import clsx from "clsx";
import { useMemo } from "react";
import dayjs from 'dayjs'
const Detail = ({ token }: { token: TokenInterface }) => {
  const grades= useMemo(() => {
    
    return token.score.grades
  }, [token.score.grades]);

  return (
    <div className="flex flex-col justify-between items-start w-full h-full m-5">
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex flex-row justify-center items-center">
          <TokenImage token={token} />
          <h1 className="tokenName flipped">{token.info.symbol}</h1>
        </div>
        <div className="scoreDetail">
          SCORE <span className="score">{token.score.value}</span>
        </div>
      </div>
      <div className="wrapperFlip flex flex-col justify-start items-start w-full">
        <div className="block w-full">
          <h3 className="mt-3">volume & liquidity</h3>
          <div className="icon flex flex-row mt-2 mb-3 volume">
            {Array.from({ length: 6 }).map((_, i) => (
              <svg
                className={clsx({
                  active: i < grades.volume,
                })}
                key={i}
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.6">
                  <path
                    d="M2.86093 7.6201C2.71498 6.96262 2.73739 6.27894 2.92609 5.63244C3.1148 4.98593 3.46368 4.39754 3.9404 3.92182C4.41712 3.4461 5.00624 3.09844 5.65314 2.91109C6.30004 2.72374 6.98377 2.70276 7.64093 2.8501C8.00264 2.2844 8.50094 1.81886 9.08989 1.49638C9.67883 1.17391 10.3395 1.00488 11.0109 1.00488C11.6824 1.00488 12.343 1.17391 12.932 1.49638C13.5209 1.81886 14.0192 2.2844 14.3809 2.8501C15.0391 2.70212 15.724 2.72301 16.3719 2.91081C17.0199 3.09862 17.6098 3.44724 18.0868 3.92425C18.5638 4.40126 18.9124 4.99117 19.1002 5.6391C19.288 6.28703 19.3089 6.97193 19.1609 7.6301C19.7266 7.99181 20.1922 8.4901 20.5146 9.07905C20.8371 9.668 21.0061 10.3286 21.0061 11.0001C21.0061 11.6715 20.8371 12.3322 20.5146 12.9211C20.1922 13.5101 19.7266 14.0084 19.1609 14.3701C19.3083 15.0273 19.2873 15.711 19.0999 16.3579C18.9126 17.0048 18.5649 17.5939 18.0892 18.0706C17.6135 18.5473 17.0251 18.8962 16.3786 19.0849C15.7321 19.2736 15.0484 19.2961 14.3909 19.1501C14.0297 19.718 13.531 20.1855 12.9411 20.5094C12.3511 20.8333 11.689 21.0032 11.0159 21.0032C10.3429 21.0032 9.68076 20.8333 9.09081 20.5094C8.50086 20.1855 8.00217 19.718 7.64093 19.1501C6.98377 19.2974 6.30004 19.2765 5.65314 19.0891C5.00624 18.9018 4.41712 18.5541 3.9404 18.0784C3.46368 17.6027 3.1148 17.0143 2.92609 16.3678C2.73739 15.7213 2.71498 15.0376 2.86093 14.3801C2.29089 14.0193 1.82135 13.5203 1.49598 12.9293C1.17062 12.3384 1 11.6747 1 11.0001C1 10.3255 1.17062 9.66184 1.49598 9.07088C1.82135 8.47992 2.29089 7.98085 2.86093 7.6201Z"
                    stroke="#656565"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.011 7H9.01099C8.48055 7 7.97185 7.21071 7.59677 7.58579C7.2217 7.96086 7.01099 8.46957 7.01099 9C7.01099 9.53043 7.2217 10.0391 7.59677 10.4142C7.97185 10.7893 8.48055 11 9.01099 11H13.011C13.5414 11 14.0501 11.2107 14.4252 11.5858C14.8003 11.9609 15.011 12.4696 15.011 13C15.011 13.5304 14.8003 14.0391 14.4252 14.4142C14.0501 14.7893 13.5414 15 13.011 15H7.01099"
                    stroke="#656565"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.011 17V5"
                    stroke="#656565"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
            ))}
          </div>
        </div>
        <div className="block w-full">
          <h3 className="mt-3">holders info</h3>
          <div className="holder icon flex flex-row mt-2 mb-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <svg
                className={clsx({
                  active: i < grades.mediumHolders,
                })}
                key={i}
                width="29"
                height="27"
                viewBox="0 0 29 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.6" clipPath="url(#clip0_2023_871)">
                  <path
                    d="M0 16.3661C0 18.5839 1.85951 20.3879 4.14439 20.3879H20.215C19.4764 21.1282 19.0698 22.1 19.0698 23.1328C19.0698 24.1655 19.4934 25.1796 20.2621 25.9255L21.1995 26.8351C21.3076 26.9401 21.4549 26.9995 21.6078 26.9995C21.7608 26.9995 21.908 26.9401 22.0162 26.8351L22.9536 25.9255C23.7222 25.1796 24.1459 24.1881 24.1459 23.1328C24.1459 22.8046 24.1051 22.4831 24.0253 22.1725C24.3447 22.2495 24.6766 22.2896 25.0148 22.2896C26.1017 22.2896 27.1241 21.879 27.8927 21.1326L28.8301 20.223C28.9383 20.118 28.9994 19.9751 28.9994 19.8267C28.9994 19.6783 28.9383 19.5354 28.8301 19.4304L27.8927 18.5207C27.1241 17.7749 26.1017 17.3637 25.0148 17.3637C23.9278 17.3637 22.9298 17.7655 22.164 18.4949V17.6523C22.164 15.8143 20.6234 14.3193 18.7294 14.3193H16.9831C15.9166 14.3193 15.0488 13.4772 15.0488 12.4422C15.0488 10.629 13.5286 9.1543 11.6606 9.1543H4.14439C1.85895 9.1543 0 10.9582 0 13.176V16.3656V16.3661ZM1.15547 13.1766C1.15547 11.5771 2.49615 10.2756 4.14496 10.2756H11.6617C12.8931 10.2756 13.8945 11.2473 13.8945 12.4422C13.8945 14.0956 15.2805 15.44 16.9843 15.44H18.7305C19.9873 15.44 21.0103 16.4321 21.0103 17.6523V19.2666H12.0089C11.0772 16.7943 6.69096 14.9613 1.15604 14.7617V13.1766H1.15547ZM1.15547 16.3661V15.8841C6.19139 16.0715 9.7099 17.627 10.7294 19.2671H4.14439C2.49615 19.2671 1.1549 17.9656 1.1549 16.3661H1.15547ZM22.991 23.1333C22.991 23.8885 22.688 24.5992 22.1374 25.1334L21.6084 25.6468L21.0794 25.1334C20.5288 24.5992 20.2258 23.8891 20.2258 23.1333C20.2258 22.3776 20.5288 21.6674 21.0794 21.1332L21.6084 20.6198L22.1374 21.1332C22.688 21.6674 22.991 22.3776 22.991 23.1333ZM27.0765 20.3406C26.5259 20.8748 25.7941 21.1689 25.0153 21.1689C24.2365 21.1689 23.5047 20.8748 22.9542 20.3406L22.4252 19.8272L22.9542 19.3139C23.5047 18.7796 24.2365 18.4855 25.0153 18.4855C25.7941 18.4855 26.5259 18.7796 27.0765 19.3139L27.6055 19.8272L27.0765 20.3406Z"
                    fill="#656565"
                  />
                  <path
                    d="M3.46308 11.8733C3.09831 11.8733 2.80151 12.1613 2.80151 12.5153C2.80151 12.8692 3.09831 13.1573 3.46308 13.1573C3.82784 13.1573 4.12464 12.8692 4.12464 12.5153C4.12464 12.1613 3.82784 11.8733 3.46308 11.8733Z"
                    fill="#656565"
                  />
                  <path
                    d="M10.3206 2.73568V3.11603C10.3206 3.42548 10.5794 3.67667 10.8983 3.67667C11.2172 3.67667 11.476 3.42548 11.476 3.11603V2.73568C11.476 2.42623 11.2172 2.17505 10.8983 2.17505C10.5794 2.17505 10.3206 2.42623 10.3206 2.73568Z"
                    fill="#656565"
                  />
                  <path
                    d="M7.6664 2.40908C7.6664 1.69894 8.26169 1.12127 8.99349 1.12127C9.4047 1.12127 9.78589 1.30155 10.0396 1.61649C10.2362 1.86053 10.5992 1.90341 10.8507 1.71213C11.1022 1.52141 11.1464 1.16909 10.9493 0.925045C10.4746 0.337479 9.7621 0 8.99349 0C7.66923 0 6.58456 1.01134 6.51489 2.27936C6.277 2.17768 6.01476 2.12051 5.73835 2.12051C4.67521 2.12051 3.8103 2.95982 3.8103 3.99149V4.49276C3.8103 4.80221 4.06915 5.0534 4.38804 5.0534C4.70692 5.0534 4.96577 4.80221 4.96577 4.49276V3.99149C4.96577 3.57816 5.31241 3.24178 5.73835 3.24178C6.16429 3.24178 6.51093 3.57816 6.51093 3.99149V7.84612C6.51093 8.15557 6.76978 8.40675 7.08866 8.40675C7.40755 8.40675 7.6664 8.15557 7.6664 7.84612V2.40908Z"
                    fill="#656565"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2023_871">
                    <rect width="29" height="27" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            ))}
          </div>
          <div className="icon flex flex-row mt-2 mb-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <svg
                key={i}
                className={clsx("holder2", {
                  active: i < grades.littleHolders,
                })}
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.6" clipPath="url(#clip0_2023_911)">
                  <path
                    d="M13.8465 4.48066C12.7244 2.90947 10.9583 1.88203 9.00114 1.66201C8.99934 1.66201 8.99755 1.66201 8.99575 1.66172C8.71298 1.52051 8.39338 1.44023 8.0549 1.44023H3.37161C3.20297 1.44023 3.06608 1.57412 3.06608 1.73906C3.06608 3.06064 3.7664 4.2252 4.82287 4.89668H2.80877C1.59684 4.89668 0.611059 3.93252 0.611059 2.74717C0.611059 1.56182 1.59684 0.597656 2.80877 0.597656H4.91932C5.08796 0.597656 5.22485 0.46377 5.22485 0.298828C5.22485 0.133887 5.08796 0 4.91932 0H2.80877C1.26016 0 0 1.23252 0 2.74717C0 4.26182 1.26016 5.49434 2.80877 5.49434H6.66504C6.74741 5.49961 6.83008 5.50254 6.91395 5.50254H8.0546C8.36402 5.50254 8.65787 5.43545 8.92176 5.31621C8.92625 5.31621 8.93075 5.3168 8.93524 5.3168H9.12065C9.62088 5.34639 10.1001 5.49639 10.5255 5.7542C9.95158 6.23613 9.58734 6.95039 9.58734 7.74639C9.58734 8.25176 10.0076 8.66279 10.5246 8.66279C11.0416 8.66279 11.4616 8.25176 11.4616 7.74639C11.4616 7.49707 11.5799 7.27441 11.7647 7.12881C11.9381 7.4877 12.0483 7.87822 12.0864 8.27256C12.0741 8.96016 11.9031 10.2272 10.9095 11.1079C10.3694 11.5866 9.79971 11.7768 9.17457 11.9218C8.87653 11.3886 7.95485 11.0637 7.43036 11.0637C6.74771 11.0637 6.19266 11.6068 6.19266 12.2742C6.19266 12.5537 6.29061 12.8197 6.46464 13.0318C6.29061 13.2439 6.19266 13.51 6.19266 13.7895C6.19266 14.4571 6.74801 15 7.43036 15C7.986 15 8.98736 14.6353 9.2207 14.0446L9.25335 14.0429C10.5369 13.974 11.7982 13.4751 12.8059 12.6378C13.8033 11.8087 14.5192 10.6775 14.8218 9.45234C15.2483 7.72441 14.9024 5.95898 13.8465 4.48066ZM7.24704 4.90488C7.22458 4.8999 7.20151 4.89668 7.17755 4.89668H6.68211C5.10654 4.78682 3.83889 3.56924 3.69152 2.0376H8.0549C8.86305 2.0376 9.52054 2.68066 9.52054 3.47109C9.52054 4.26152 8.86305 4.90459 8.0549 4.90459L7.24704 4.90488ZM10.8511 7.74639C10.8511 7.92217 10.7049 8.06543 10.5249 8.06543C10.3449 8.06543 10.1987 7.92246 10.1987 7.74639C10.1987 6.62813 11.1288 5.71846 12.2721 5.71846C12.4518 5.71846 12.5983 5.86143 12.5983 6.0375C12.5983 6.21357 12.4521 6.35654 12.2721 6.35654C11.4885 6.35654 10.8511 6.97998 10.8511 7.74639ZM8.65967 13.7895C8.65967 13.8703 8.53086 14.0238 8.2481 14.17C7.93897 14.3297 7.60768 14.4023 7.43036 14.4023C7.08469 14.4023 6.80342 14.1272 6.80342 13.7892C6.80342 13.5847 6.90736 13.3939 7.0814 13.2797C7.16586 13.2243 7.21649 13.1312 7.21649 13.0315C7.21649 12.9319 7.16586 12.8391 7.0814 12.7834C6.90736 12.6691 6.80342 12.4787 6.80342 12.2739C6.80342 11.9358 7.08469 11.6607 7.43036 11.6607C7.60768 11.6607 7.93897 11.7334 8.2481 11.8931C8.53086 12.0393 8.65967 12.1928 8.65967 12.2736V13.7895ZM14.2281 9.3123C13.6626 11.6024 11.6284 13.2943 9.27072 13.4432V12.5139C9.97674 12.3524 10.6645 12.1321 11.3202 11.5512C12.4926 10.512 12.6867 9.04688 12.6977 8.26582C12.6977 8.25557 12.6977 8.24531 12.6965 8.23506C12.6561 7.79385 12.5384 7.35645 12.3533 6.95068C12.8322 6.91025 13.2094 6.5165 13.2094 6.03779C13.2094 5.53242 12.7891 5.12139 12.2721 5.12139C11.8426 5.12139 11.4364 5.2207 11.076 5.39678C10.6438 5.08945 10.1562 4.88115 9.63976 4.78184C9.94588 4.42793 10.131 3.9709 10.131 3.47197C10.131 3.08877 10.022 2.73018 9.83266 2.42402C11.2498 2.79346 12.4989 3.63838 13.345 4.82344C14.2994 6.15938 14.613 7.75312 14.2281 9.3123Z"
                    fill="#656565"
                  />
                  <path
                    d="M5.78115 2.53442C5.56518 2.53442 5.38965 2.7061 5.38965 2.91733C5.38965 3.12856 5.56548 3.30024 5.78115 3.30024C5.99681 3.30024 6.17264 3.12856 6.17264 2.91733C6.17264 2.7061 5.99711 2.53442 5.78115 2.53442Z"
                    fill="#656565"
                  />
                  <path
                    d="M6.58824 0.597656H7.17714C7.34578 0.597656 7.48267 0.46377 7.48267 0.298828C7.48267 0.133887 7.34578 0 7.17714 0H6.58824C6.4196 0 6.28271 0.133887 6.28271 0.298828C6.28271 0.46377 6.4196 0.597656 6.58824 0.597656Z"
                    fill="#656565"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2023_911">
                    <rect width="15" height="15" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            ))}
          </div>
        </div>
        <div className="block w-full">
          <h3 className="mt-3">social stats</h3>
          <div className="social icon flex flex-row mt-2 mb-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <svg
                key={i}
                className={clsx({
                  active: i < grades.social,
                })}
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.6">
                  <path
                    d="M6.9 18.0079C8.80858 18.9869 11.0041 19.2521 13.0909 18.7556C15.1777 18.2592 17.0186 17.0337 18.2818 15.3C19.545 13.5664 20.1474 11.4386 19.9806 9.30002C19.8137 7.16147 18.8886 5.15283 17.3718 3.63605C15.855 2.11928 13.8464 1.19411 11.7078 1.02728C9.56929 0.860441 7.44147 1.46291 5.70782 2.72611C3.97417 3.98931 2.74869 5.83017 2.25222 7.91697C1.75575 10.0038 2.02094 12.1993 3 14.1079L1 20.0079L6.9 18.0079Z"
                    stroke="#656565"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 10.0078H7.01"
                    stroke="#656565"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11 10.0078H11.01"
                    stroke="#656565"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 10.0078H15.01"
                    stroke="#656565"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
            ))}
          </div>
        </div>

        <div className="block w-full">
          <h3 className="mt-3">supply audit</h3>
          <div className="supply icon flex flex-row mt-2 mb-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <svg
                key={i}
                className={clsx({
                  active: i < grades.supplyAudit,
                })}
                width="23"
                height="20"
                viewBox="0 0 23 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="13"
                  cy="11"
                  r="8.25"
                  stroke="#656565"
                  strokeOpacity="0.6"
                  strokeWidth="1.5"
                />
                <circle cx="4" cy="15" r="4" fill="#1D1D1D" />
                <circle
                  cx="4"
                  cy="15"
                  r="3.5"
                  stroke="#656565"
                  strokeOpacity="0.6"
                />
                <circle cx="19" cy="4" r="4" fill="#1D1D1D" />
                <circle
                  cx="19"
                  cy="4"
                  r="3.5"
                  stroke="#656565"
                  strokeOpacity="0.6"
                />
              </svg>
            ))}
          </div>
        </div>
        <div className="block w-full">
          <h3 className="mt-3">Updated at: {dayjs(token.meta.updatedAt).format('YYYY-MM-DD HH:MM:ss')}</h3>
        </div>
      </div>
    </div>
  );
};
export default Detail;
