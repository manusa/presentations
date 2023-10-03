import React from 'react';

export const InnerOuterLoop = ({
  innerLoopColor = '#06c',
  outerLoopColor = '#f63440',
  pushCommitColor = '#f05133',
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="-0.5 -0.5 729 678"
    {...props}
  >
    <path
      d="M476.61 429.28c-40.7 57.46-112.73 83.72-180.86 65.93-68.14-17.79-118.14-75.91-125.56-145.93-7.42-70.03 29.3-137.33 92.19-169 62.9-31.67 138.83-21.09 190.67 26.57l-35.51 38.63c-35.77-32.89-88.16-40.19-131.56-18.34-43.4 21.85-68.73 68.29-63.61 116.61 5.12 48.32 39.62 88.42 86.63 100.69 47.01 12.28 96.71-5.84 124.8-45.49Z"
      fill={`${innerLoopColor}`}
      pointerEvents="all"
    />
    <path
      d="m694.86 209.09-42.565 113.618-93.67-77.114Z"
      fill={`${outerLoopColor}`}
      pointerEvents="all"
    />
    <path
      d="M533.74 274.17a162.242 162.242 0 0 1 101.51 85.03c20.2 41.5 21.77 89.63 4.31 132.35l-48.04-19.63a110.314 110.314 0 0 0-71.96-147.82Z"
      fill={`${pushCommitColor}`}
      pointerEvents="all"
    />
    <path
      d="M582.76 572.85c-105.5 109.95-271.45 135.87-405.44 63.31-134-72.56-202.99-225.7-168.57-374.13C43.18 113.59 172.54 6.45 324.79.28c152.25-6.17 289.86 90.14 336.19 235.3l-51.6 16.47C570.47 130.11 454.87 49.21 326.98 54.39 199.09 59.58 90.43 149.57 61.51 274.26 32.59 398.95 90.55 527.59 203.1 588.53c112.56 60.95 251.96 39.19 340.58-53.17Z"
      fill={`${outerLoopColor}`}
      pointerEvents="all"
    />
    <path
      d="M520.4 323.98c-21.7-6.3-41.84-17.05-59.15-31.59l33.39-39.74c11.76 9.88 25.46 17.2 40.22 21.48ZM687.375 465.924l-93.67 77.114L551.14 429.42Z"
      fill={`${pushCommitColor}`}
      pointerEvents="all"
    />
    <path
      d="m452.381 178 14.086 84.527-84.52-14.093Z"
      fill={`${innerLoopColor}`}
      pointerEvents="all"
    />
    <path fill="none" pointerEvents="all" d="M82 20h513v30H82z" />
    <switch transform="translate(-.5 -.5)">
      <foreignObject
        pointerEvents="none"
        width="100%"
        height="100%"
        requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"
        style={{
          overflow: "visible",
          textAlign: "left",
        }}
      >
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          style={{
            display: "flex",
            alignItems: "unsafe center",
            justifyContent: "unsafe center",
            width: 511,
            height: 1,
            paddingTop: 35,
            marginLeft: 83,
          }}
        >
          <div
            data-drawio-colors="color: #FFFFFF;"
            style={{
              boxSizing: "border-box",
              fontSize: 0,
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "inline-block",
                fontSize: 49,
                fontFamily: "Helvetica",
                color: "#fff",
                lineHeight: 1.2,
                pointerEvents: "all",
                whiteSpace: "normal",
                overflowWrap: "normal",
              }}
            >
              {"Outer Loop"}
            </div>
          </div>
        </div>
      </foreignObject>
      <text
        x={339}
        y={50}
        fill="#FFF"
        fontFamily="Helvetica"
        fontSize={49}
        textAnchor="middle"
      >
        {"Outer Loop"}
      </text>
    </switch>
    <path fill="none" pointerEvents="all" d="M70 460h513v30H70z" />
    <switch transform="translate(-.5 -.5)">
      <foreignObject
        pointerEvents="none"
        width="100%"
        height="100%"
        requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"
        style={{
          overflow: "visible",
          textAlign: "left",
        }}
      >
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          style={{
            display: "flex",
            alignItems: "unsafe center",
            justifyContent: "unsafe center",
            width: 511,
            height: 1,
            paddingTop: 475,
            marginLeft: 71,
          }}
        >
          <div
            data-drawio-colors="color: #FFF0F6;"
            style={{
              boxSizing: "border-box",
              fontSize: 0,
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "inline-block",
                fontSize: 49,
                fontFamily: "Helvetica",
                color: "#fff0f6",
                lineHeight: 1.2,
                pointerEvents: "all",
                whiteSpace: "normal",
                overflowWrap: "normal",
              }}
            >
              {"Inner Loop"}
            </div>
          </div>
        </div>
      </foreignObject>
      <text
        x={327}
        y={490}
        fill="#FFF0F6"
        fontFamily="Helvetica"
        fontSize={49}
        textAnchor="middle"
      >
        {"Inner Loop"}
      </text>
    </switch>
    <image
      x={458.5}
      y={323.9}
      width={110}
      height={110}
      xlinkHref="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGNsYXNzPSJ3b3JrLWZsb3dfX2ljb24iIHZpZXdCb3g9IjAgMCA5NyA5NyI+PHBhdGggZD0iTTkyLjcxIDQ0LjQwOEw1Mi41OTEgNC4yOTFhNS45MTggNS45MTggMCAwMC04LjM2OSAwbC04LjMzIDguMzMyTDQ2LjQ1OSAyMy4xOWE3LjAyMiA3LjAyMiAwIDAxNy4yMjkgMS42ODUgNy4wMyA3LjAzIDAgMDExLjY3IDcuMjc1bDEwLjE4NiAxMC4xODVhNy4wMjggNy4wMjggMCAwMTcuMjc1IDEuNjcxIDcuMDQzIDcuMDQzIDAgMDEtOS45NjEgOS45NTggNy4wNDMgNy4wNDMgMCAwMS0xLjUzMS03LjY1OGwtOS41LTkuNDk5djI0Ljk5N2E3LjA0MiA3LjA0MiAwIDExLTguMDk2IDExLjI5MSA3LjA0MiA3LjA0MiAwIDAxMi4zMDctMTEuNDk2di0yNS4yM2E3LjA0MSA3LjA0MSAwIDAxLTMuODIzLTkuMjM1TDMxLjc5OCAxNi43MTUgNC4yODggNDQuMjIyYTUuOTIgNS45MiAwIDAwMCA4LjM3MWw0MC4xMjEgNDAuMTE4YTUuOTE4IDUuOTE4IDAgMDA4LjM2OSAwTDkyLjcxIDUyLjc3OWE1LjkyIDUuOTIgMCAwMDAtOC4zNzF6IiBmaWxsPSIjRjA1MTMzIi8+PC9zdmc+"
      preserveAspectRatio="none"
    />
  </svg>
);
