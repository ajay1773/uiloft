import React from "react";
import typography from "@/design-system/json/typography.json";
import { entries, get } from "lodash";

type TypographyProps = {
  theme?: string;
};

function toKebabCase(input: string): string {
  return input
    .trim() // Remove leading and trailing whitespace
    .toLowerCase() // Convert to lowercase
    .replace(/\s+/g, "-"); // Replace spaces with hyphens
}

function toCamelCase(input: string): string {
  return input
    .trim() // Remove leading and trailing whitespace
    .toLowerCase() // Convert to lowercase
    .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
      index === 0 ? match.toLowerCase() : match.toUpperCase()
    )
    .replace(/\s+/g, ""); // Remove all spaces
}

const Typography: React.FC<TypographyProps> = () => {
  return (
    <div className="flex flex-col gap-4">
      {entries(typography).map(([name, config]) => {
        const kebabCaseName = toKebabCase(name);
        const camelCaseName = toCamelCase(name);
        return (
          <div className="flex flex-col gap-1">
            <p className="text-2xl font-bold  text-[var(--colors-text-text-primary-900)] transition">
              {kebabCaseName}
            </p>
            <div>
              {entries(config).map(([entryName, entryDetails]) => {
                const value = get(entryDetails, "value", "");
                if (camelCaseName !== "fontWeight") {
                  return (
                    <div>
                      <p className="text-lg font-semibold text-[var(--colors-text-text-primary-900)] transition">
                        {entryName}
                      </p>
                      <p
                        style={{
                          [camelCaseName]:
                            typeof value === "number" ? `${value}px` : value,
                        }}
                        className="text-[var(--colors-text-text-primary-900)]"
                      >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Vero, hic?
                      </p>
                    </div>
                  );
                } else {
                  const weightNameToAmountConfig: Record<
                    "Regular" | "Medium" | "Semibold" | "Bold",
                    number
                  > = {
                    Regular: 400,
                    Medium: 500,
                    Semibold: 600,
                    Bold: 700,
                  };
                  const values = value.split(" ");
                  let weight = 200;
                  let fontStyle = "";

                  if (values.length > 1) {
                    const weightKey =
                      values[0] as keyof typeof weightNameToAmountConfig;
                    weight = weightNameToAmountConfig[weightKey];
                    fontStyle = values[1];
                  }
                  return (
                    <div>
                      <p className="text-lg font-semibold text-[var(--colors-text-text-primary-900)] transition">
                        {entryName}
                      </p>
                      <p
                        style={{
                          [camelCaseName]: weight,
                          fontStyle,
                        }}
                        className="text-[var(--colors-text-text-primary-900)]"
                      >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Vero, hic?
                      </p>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Typography;
