import React from "react";
import useTokens from "./hook";
import { entries, has } from "lodash";

type TokensProps = {
  theme?: string;
};

const Tokens: React.FC<TokensProps> = ({ theme = "light" }) => {
  const { variables, findValueFromColorConfig } = useTokens(theme);

  const variableDetails = variables[0];
  return (
    <div>
      {entries(variableDetails).map(([name, details]) => {
        if (!details) {
          return <></>;
        }
        return (
          <div>
            <p className="text-2xl font-bold mb-4 text-[var(--colors-text-text-primary-900)] transition">
              {name}
            </p>
            <>
              {entries(details).map(([name, tokenConfig]) => {
                return (
                  <div>
                    <p className="text-lg font-semibold text-[var(--colors-text-text-primary-900)] transition">
                      {name}
                    </p>
                    <div className="flex gap-4 flex-wrap">
                      {entries(tokenConfig).map(([tokenName, _tokenValue]) => {
                        if (has(_tokenValue, "value")) {
                          const value = findValueFromColorConfig(
                            tokenConfig,
                            tokenName
                          );
                          return (
                            <div className="flex flex-col gap-1">
                              <p className="whitespace-nowrap text-[var(--colors-text-text-primary-900)]">
                                {tokenName}
                              </p>
                              <div
                                className="w-[100px] h-[100px] rounded shadow hover:cursor-pointer"
                                style={{ backgroundColor: value[tokenName] }}
                              ></div>
                            </div>
                          );
                        } else {
                          return (
                            <div className="flex gap-2 flex-wrap">
                              {entries(_tokenValue).map(
                                ([name, _valueForNestedToken]) => {
                                  const value = findValueFromColorConfig(
                                    _tokenValue,
                                    name
                                  );
                                  return (
                                    <div>
                                      <p className="whitespace-nowrap text-[var(--colors-text-text-primary-900)]">
                                        {name}
                                      </p>
                                      <div
                                        className="w-[100px] h-[100px] rounded shadow hover:cursor-pointer"
                                        style={{
                                          backgroundColor: value[name],
                                        }}
                                      ></div>
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          );
                          //   return (
                          //     <div className="flex flex-col gap-1">
                          //       <p className="whitespace-nowrap text-[var(--colors-text-text-primary-900)]">
                          //         {tokenName}
                          //       </p>
                          //       <div
                          //         className="w-[100px] h-[100px] rounded shadow hover:cursor-pointer"
                          //         style={{ backgroundColor: value[tokenName] }}
                          //       ></div>
                          //     </div>
                          //   );
                        }
                      })}
                    </div>
                  </div>
                );
              })}
            </>
          </div>
        );
      })}
    </div>
  );
};

export default Tokens;
