import React from "react";
import radius from "@/design-system/json/radius.json";
import { entries } from "lodash";

type RadiusProps = {
  theme?: string;
};

const Radius: React.FC<RadiusProps> = () => {
  return (
    <div className="flex flex-col">
      <p className="text-2xl font-bold  text-[var(--colors-text-text-primary-900)] transition">
        Radius
      </p>
      <div className="flex flex-wrap gap-4">
        {entries(radius).map(([name, details]) => {
          return (
            <div className="flex flex-col gap-2">
              <p className="text-[var(--colors-text-text-primary-900)]">
                {name}
              </p>
              <div
                className="w-[100px] h-[100px] shadow hover:cursor-pointer bg-white"
                style={{ borderRadius: details.value }}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Radius;
