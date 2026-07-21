import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "ANSH Apps – Simple Business Software for Every Business";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const ICON_STROKE = "#c4b5fd";

const FEATURES = [
  {
    label: "Tasks",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M20 6L9 17l-5-5"
          stroke={ICON_STROKE}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "HR",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="9" cy="8" r="3.2" stroke={ICON_STROKE} strokeWidth="2" />
        <path
          d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5"
          stroke={ICON_STROKE}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M16 5.5a3.2 3.2 0 010 5.8M18 14.3c1.8.8 2.8 2.5 2.8 4.7"
          stroke={ICON_STROKE}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "Forms",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect
          x="5"
          y="3.5"
          width="14"
          height="17"
          rx="2.5"
          stroke={ICON_STROKE}
          strokeWidth="2"
        />
        <path
          d="M9 9h6M9 13h6M9 17h3.5"
          stroke={ICON_STROKE}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "Visitors",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M4.5 20.5V6a2 2 0 012-2h11a2 2 0 012 2v14.5"
          stroke={ICON_STROKE}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M9 8.5h2M13 8.5h2M9 12.5h2M13 12.5h2M10 20.5v-4h4v4"
          stroke={ICON_STROKE}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path d="M2.5 20.5h19" stroke={ICON_STROKE} strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Expense",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M6 4h12M6 8.5h12M9.5 4c3 0 5 1.8 5 4.5S12.5 13 9.5 13H8l7 7"
          stroke={ICON_STROKE}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "AI",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z"
          stroke={ICON_STROKE}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M19 15.5l.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9.9-2.6z"
          fill={ICON_STROKE}
        />
      </svg>
    ),
  },
];

export default async function Image() {
  const fontsDir = join(process.cwd(), "src", "assets", "fonts");
  const [michroma, interMedium, interSemiBold] = await Promise.all([
    readFile(join(fontsDir, "Michroma-Regular.ttf")),
    readFile(join(fontsDir, "Inter-Medium.ttf")),
    readFile(join(fontsDir, "Inter-SemiBold.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          backgroundColor: "#050510",
          backgroundImage:
            "linear-gradient(145deg, #060614 0%, #0b0b22 45%, #05050f 100%)",
          fontFamily: "Inter",
        }}
      >
        {/* Center purple glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 980,
            height: 640,
            backgroundImage:
              "radial-gradient(ellipse at center, rgba(124, 58, 237, 0.32) 0%, rgba(124, 58, 237, 0.10) 42%, rgba(124, 58, 237, 0) 70%)",
          }}
        />
        {/* Hairline top accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 620,
            height: 2,
            backgroundImage:
              "linear-gradient(90deg, rgba(139,92,246,0) 0%, rgba(139,92,246,0.8) 50%, rgba(139,92,246,0) 100%)",
          }}
        />

        {/* Headline */}
        <div
          style={{
            display: "flex",
            fontFamily: "Michroma",
            fontSize: 84,
            color: "#ffffff",
            letterSpacing: 4,
          }}
        >
          ANSH Apps
        </div>

        {/* Subheadline */}
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 34,
            fontWeight: 500,
            color: "#b9b9d2",
            letterSpacing: 0.5,
          }}
        >
          Simple Business Software for Every Business
        </div>

        {/* Feature chips */}
        <div
          style={{
            display: "flex",
            marginTop: 58,
            gap: 16,
          }}
        >
          {FEATURES.map((feature) => (
            <div
              key={feature.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 22px",
                borderRadius: 999,
                border: "1px solid rgba(167, 139, 250, 0.28)",
                backgroundColor: "rgba(124, 58, 237, 0.10)",
                fontSize: 23,
                fontWeight: 500,
                color: "#e4e4f4",
              }}
            >
              {feature.icon}
              {feature.label}
            </div>
          ))}
        </div>

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            marginTop: 64,
            fontSize: 26,
            fontWeight: 600,
            color: "#8f8fae",
            letterSpacing: 0.5,
          }}
        >
          Built for every business. Ready for what&apos;s next.
        </div>

        {/* Website */}
        <div
          style={{
            display: "flex",
            marginTop: 18,
            fontSize: 26,
            fontWeight: 600,
            color: "#a78bfa",
            letterSpacing: 1,
          }}
        >
          anshapps.com
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Michroma", data: michroma, style: "normal", weight: 400 },
        { name: "Inter", data: interMedium, style: "normal", weight: 500 },
        { name: "Inter", data: interSemiBold, style: "normal", weight: 600 },
      ],
    }
  );
}
