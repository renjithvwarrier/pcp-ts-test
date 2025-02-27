import React from "react";

interface Props {
  title: string;
  body: string;
  icon?: string;
  theme?: "primary" | "secondary" | "info" | "warning";
}

const InfoCard = ({ title, body, icon = "info", theme = "primary" }: Props) => {
  // Map theme names to tailwind classes
  const themeClasses = {
    primary: "bg-blue-50 border-blue-200 text-blue-800",
    secondary: "bg-purple-50 border-purple-200 text-purple-800",
    info: "bg-gray-50 border-gray-200 text-gray-800",
    warning: "bg-amber-50 border-amber-200 text-amber-800",
  };

  // Map icon names to emoji icons (simple implementation)
  const iconMap: Record<string, string> = {
    info: "ℹ️",
    warning: "⚠️",
    success: "✅",
    error: "❌",
    tip: "💡",
  };

  return (
    <div className={`not-prose p-4 rounded-md border ${themeClasses[theme]}`}>
      <div className="flex items-start gap-3">
        <div className="text-xl">{iconMap[icon] || iconMap.info}</div>
        <div>
          <h3 className="font-bold text-lg mb-1">{title}</h3>
          <p>{body}</p>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;