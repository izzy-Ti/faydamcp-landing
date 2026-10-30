import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#183d32",
          borderRadius: 38,
        }}
      >
        <svg viewBox="0 0 26 26" width="120" height="120">
          <circle cx="13" cy="13" r="12" fill="#ffe46b" />
          <path
            d="M7.6 13.4l3.5 3.5 6.8-7"
            fill="none"
            stroke="#183d32"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="18.6" cy="9.2" r="2" fill="#183d32" />
        </svg>
      </div>
    ),
    size,
  );
}
