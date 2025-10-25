import React from "react";

const StatusBadge = ({ title, config = [], needPill = true }) => {
  console.log(title);

  // Find the config matching the title
  const status = config.find((item) => item.title === title);

  // Fallback if title not found
  const bgColor = status?.bg || "#f0f0f0";
  const textColor = status?.color || "#333";

  return (
    <div
      className="inline-flex items-center  gap-2 px-3 py-2 rounded-full  text-[12px]"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {needPill && (
        <span
          className="w-2 h-2  rounded-full"
          style={{ backgroundColor: textColor }}
        ></span>
      )}
      <span>{title == "coordinator" ? "co-ordinator" : title}</span>
    </div>
  );
};

export default StatusBadge;
