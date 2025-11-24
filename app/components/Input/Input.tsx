import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = ({ label, error, className = "", ...inputProps }: InputProps) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          style={{
            color: "var(--foreground, #171717)",
            fontWeight: "500",
          }}
        >
          {label}
        </label>
      )}
      <input
        style={{
          width: "100%",
          padding: "0.5rem 1rem",
          border: `1px solid ${
            error ? "#ef4444" : "var(--card-border, #e5e7eb)"
          }`,
          borderRadius: "0.5rem",
          outline: "none",
          backgroundColor: "var(--card-bg, #ffffff)",
          color: "var(--foreground, #171717)",
          transition: "all 0.2s",
          boxShadow: error ? "0 0 0 2px rgba(239, 68, 68, 0.1)" : "none",
        }}
        onFocus={(e) => {
          e.currentTarget.style.boxShadow = error
            ? "0 0 0 2px rgba(239, 68, 68, 0.1)"
            : `0 0 0 2px ${
                error ? "rgba(239, 68, 68, 0.1)" : "rgba(37, 99, 235, 0.1)"
              }`;
          e.currentTarget.style.borderColor = error
            ? "#ef4444"
            : "var(--primary, #2563eb)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.borderColor = error
            ? "#ef4444"
            : "var(--card-border, #e5e7eb)";
        }}
        disabled={inputProps.disabled}
        className={className}
        {...inputProps}
      />
      {error && (
        <span
          style={{
            color: "#ef4444",
            fontSize: "0.875rem",
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
