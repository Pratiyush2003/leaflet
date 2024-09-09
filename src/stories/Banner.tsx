/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";

// Define the props interface
interface BannerProps {
  variant?: "info" | "congrats" | "documentation" | "danger";
  children: React.ReactNode;
}

const Banner: React.FC<BannerProps> = ({ variant = "info", children }) => {
  // Define variant styles first
  const variantStyles: Record<string, any> = {
    info: {
      backgroundColor: "#b4aaff",
      borderLeft: "4px solid #b4aaff",
      before: {
        content: '"🔑"',
        backgroundColor: "#b4aaff",
      },
    },
    danger: {
      backgroundColor: "#ff7828",
      borderLeft: "4px solid #ff7828",
      before: {
        content: '"⚠️"',
        backgroundColor: "#ff7828",
      },
    },
    congrats: {
      backgroundColor: "#72bc23",
      borderLeft: "4px solid #72bc23",
      before: {
        content: '"🎉"',
        backgroundColor: "#72bc23",
      },
    },
    documentation: {
      backgroundColor: "#44a9ba",
      borderLeft: "4px solid #44a9ba",
      before: {
        content: '"📚"',
        backgroundColor: "#44a9ba",
      },
    },
  };

  // Styles for the icon
  const beforeStyles = css({
    width: 30,
    height: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: "1rem",
    borderRadius: "50%",
    fontSize: "1.5rem",
    color: "#fff",
    backgroundColor: variantStyles[variant].before.backgroundColor,
    content: variantStyles[variant].before.content,
  });

  return (
    <aside
      css={css({
        display: "flex",
        alignItems: "center",
        height: "50px",
        width: "100%",
        padding: "0 2rem", // Adjust padding as needed
        position: "relative",
        borderRadius: "5px",
        color: "#fff",
        ...variantStyles[variant],
        textAlign: "left",
        lineHeight: "20px", // Center text vertically
      })}
    >
      <span css={beforeStyles} />
      <span css={css({ marginLeft: "2.5rem" })}>{children}</span>
    </aside>
  );
};

export default Banner;
