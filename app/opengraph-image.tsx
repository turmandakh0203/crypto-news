import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Криптологи — Монголын криптографийн мэдээний платформ";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#010101",
        position: "relative",
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background:
            "linear-gradient(90deg, transparent 0%, #e63329 30%, #ff6b35 60%, transparent 100%)",
        }}
      />

      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(230,51,41,0.12) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 32,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            lineHeight: 1,
          }}
        >
          <span
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: "#f0ece0",
              letterSpacing: "0.1em",
            }}
          >
            CRYPTO
          </span>
          <span
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: "#e63329",
              letterSpacing: "0.1em",
            }}
          >
            NEWS
          </span>
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          width: 60,
          height: 2,
          background: "#e63329",
          marginBottom: 28,
        }}
      />

      {/* Description */}
      <div
        style={{
          fontSize: 22,
          color: "#999",
          letterSpacing: "0.04em",
          textAlign: "center",
          maxWidth: 640,
        }}
      >
        Монгол хэлээр криптографи, криптоанализ
      </div>
      <div
        style={{
          fontSize: 22,
          color: "#999",
          letterSpacing: "0.04em",
          textAlign: "center",
          marginTop: 8,
        }}
      >
        болон мэдээллийн аюулгүй байдлын мэдлэг
      </div>

      {/* Bottom URL */}
      <div
        style={{
          position: "absolute",
          bottom: 36,
          fontSize: 14,
          color: "#444",
          letterSpacing: "0.14em",
        }}
      >
        crypto-news-alpha.vercel.app
      </div>
    </div>,
    { ...size },
  );
}
