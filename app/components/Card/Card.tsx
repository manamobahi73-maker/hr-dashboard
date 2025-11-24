import React from "react";

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

const Card = ({ children, title, className = "" }: CardProps) => {
  return (
    <div
      className={`rounded-lg shadow-md p-6 ${className}`}
      style={{
        background: "var(--card-bg, #ffffff)",
        color: "var(--foreground, #171717)",
        border: "1px solid var(--card-border, #e5e7eb)",
      }}
    >
      {title && (
        <h2
          style={{ color: "var(--foreground, #171717)" }}
          className="text-lg font-semibold mb-4"
        >
          {title}
        </h2>
      )}
      <div className="w-full">{children}</div>
    </div>
  );
};

export default Card;
