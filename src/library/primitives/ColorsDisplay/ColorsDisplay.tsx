import React from "react";

type Color = {
  attributes: {
    category: string;
  };
  value: string;
};

type ColorsGroup = {
  [colorName: string]: Color;
};

export type ColorsData = {
  [categoryName: string]: ColorsGroup;
};

export interface ColorsDisplayProps {
  colors: ColorsData;
}

const ColorsDisplay: React.FC<ColorsDisplayProps> = ({ colors }) => {
  const handleCopyColor = (details: string) => {
    navigator.clipboard.writeText(details).then(
      () => {
        alert(`Color code ${details} copied to clipboard!`);
      },
      (err) => {
        console.error("Failed to copy color code:", err);
      }
    );
  };
  const renderColors = (categoryName: string, colorGroup: ColorsGroup) => {
    return (
      <div key={categoryName} className="mb-6">
        <h2 className="text-2xl font-bold mb-4 text-[var(--colors-text-text-primary-900)] transition">
          {categoryName}
        </h2>
        <div className="flex flex-col gap-4">
          {Object.entries(colorGroup).map(([colorName, colorDetails]) => (
            <div
              key={colorName}
              className="flex space-y-2 flex-col items-start"
            >
              <p className="text-lg font-semibold text-[var(--colors-text-text-primary-900)] transition">
                {colorName}
              </p>
              <div className="flex gap-2 flex-wrap">
                {Object.entries(colorDetails).map(([name, details]) => {
                  const newDetails = details as unknown as { value: string };
                  return (
                    <div>
                      <p className="text-[var(--colors-text-text-primary-900)] transition">
                        {name}
                      </p>
                      <div
                        onClick={() => handleCopyColor(newDetails.value)}
                        className="w-[100px] h-[100px] rounded shadow hover:cursor-pointer"
                        style={{ backgroundColor: newDetails.value }}
                      ></div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      {Object.entries(colors).map(([categoryName, colorGroup]) => {
        if (categoryName !== "spacing") {
          return renderColors(categoryName, colorGroup);
        }
      })}
    </div>
  );
};

export default ColorsDisplay;
