import React from "react";
import { Container } from "react-bootstrap";

const Announcements = ({ messages, bgColor = "#fff3cd", textColor = "#856404" }) => {
  return (
    <div
      style={{
        overflow: "hidden",
        whiteSpace: "nowrap",
        backgroundColor: bgColor,
        borderBottom: "1px solid #ffeeba",
        padding: "10px 0",
        fontWeight: "600",
      }}
    >
      <Container>
        <div
          style={{
            display: "inline-block",
            animation: "scroll-left 20s linear infinite",
          }}
        >
          {messages.map((msg, idx) => (
            <span
              key={idx}
              style={{ marginRight: "50px", color: textColor }}
            >
              {msg}
            </span>
          ))}
        </div>
      </Container>

      <style>
        {`
          @keyframes scroll-left {
            0% {
              transform: translateX(100%);
            }
            100% {
              transform: translateX(-100%);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Announcements;
