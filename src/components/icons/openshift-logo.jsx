import React from 'react';

const LOGO_HEIGHT = 65.408;
const TEXT_HEIGHT = 12.46323375;

export const OpenShiftLogo = ({hideText = false, textColor = '#241f21', ...props}) => {
  let height = LOGO_HEIGHT;
  if (hideText) {
    height -= TEXT_HEIGHT;
  }
  return (
    <svg
      viewBox={`-1.734 -1.734 61.263 ${height}`}
      {...props}
    >
      <path
        d="M54.228 11.987a23.32 23.32 0 00-2.004-3.4l-8.212 2.988a15.351 15.351 0 012.413 3.252l7.803-2.84zM17.925 21.07L9.71 24.059a23.89 23.89 0 00.651 3.893l7.804-2.84a15.271 15.271 0 01-.24-4.042"
        fill="#c22133"
      />
      <path
        d="M36.156 9.66a15.205 15.205 0 014.438 3.16l8.212-2.989a23.35 23.35 0 00-9.17-7.63C27.895-3.276 13.887 1.822 8.414 13.562a23.32 23.32 0 00-2.122 11.74l8.214-2.988a15.19 15.19 0 011.366-5.274C19.43 9.414 28.53 6.104 36.156 9.661M44.916 24.668a15.063 15.063 0 01-1.379 5.274c-3.556 7.629-12.656 10.939-20.282 7.382a15.11 15.11 0 01-4.447-3.155l-8.196 2.983a23.294 23.294 0 009.164 7.634c11.741 5.473 25.746.376 31.221-11.365a23.254 23.254 0 002.115-11.735l-8.196 2.982z"
        fill="#db212e"
      />
      <path
        d="M46.935 14.641l-7.803 2.84a15.311 15.311 0 011.91 8.595l8.196-2.981a23.665 23.665 0 00-2.303-8.454M10.873 27.765l-7.804 2.843a23.758 23.758 0 003.67 7.955l8.195-2.984a15.34 15.34 0 01-4.061-7.814"
        fill="#eb2126"
      />
      <path
        d="M53.038 9.823a22.41 22.41 0 00-.813-1.236l-8.213 2.988c.361.37.694.763 1.011 1.165l8.015-2.917zM17.894 22.719c-.02-.547-.012-1.097.03-1.648L9.71 24.059c.042.527.109 1.05.187 1.57l7.997-2.91z"
        fill="#ad213b"
      />
      <path
        d="M53.112 21.686l-8.197 2.982a14.996 14.996 0 01-.692 3.525l8.921-3.252c.064-1.09.054-2.178-.032-3.255m-42.5 15.467c.632.889 1.33 1.736 2.09 2.536l8.922-3.253a15.164 15.164 0 01-2.816-2.267l-8.195 2.984z"
        fill="#ba2133"
      />
      {!hideText && <path
        d="M52.69 54.532v.74h2.146v6.554h.812v-6.554h2.148v-.74h-5.107zm-4.93.74v2.417h2v.74h-2v3.396h-.812v-7.292h4.283v.738h-3.47zm-3.717-.739h.813v7.294h-.813v-7.294zm-2.904 7.293v-3.439h-3.626v3.439H36.7v-7.294h.813v3.116h3.626v-3.116h.812v7.294h-.812zm-8.667.114c-.99 0-1.876-.427-2.449-1.01l.543-.605c.551.532 1.187.877 1.937.877.97 0 1.574-.48 1.574-1.252 0-.677-.406-1.062-1.74-1.542-1.574-.563-2.105-1.073-2.105-2.125 0-1.168.916-1.866 2.281-1.866.98 0 1.605.292 2.22.782l-.52.635c-.532-.437-1.022-.677-1.75-.677-1.002 0-1.418.5-1.418 1.073 0 .605.27.948 1.73 1.47 1.615.583 2.115 1.125 2.115 2.21 0 1.145-.897 2.03-2.418 2.03m-5.741-.114l-2.678-3.98c-.177-.271-.417-.636-.511-.824 0 .271.021 1.188.021 1.594v3.21h-1.439v-7.294h1.397l2.585 3.855c.177.271.416.636.51.824 0-.271-.02-1.188-.02-1.595v-3.084h1.437v7.294h-1.302zm-11.502 0v-7.294h5.064v1.428h-3.605v1.26h2.095v1.417h-2.095v1.761h3.761v1.428h-5.22zm-4.144-2.584H9.48v2.584H8.02v-7.294h3.19c1.375 0 2.51.761 2.51 2.313 0 1.688-1.124 2.397-2.635 2.397m.073-3.292H9.48v1.875h1.698c.678 0 1.043-.314 1.043-.949s-.418-.926-1.063-.926M3.21 61.94C1.303 61.94 0 60.544 0 58.19c0-2.356 1.324-3.773 3.231-3.773 1.897 0 3.199 1.397 3.199 3.752 0 2.355-1.324 3.771-3.22 3.771m-.01-6.075c-1.021 0-1.699.824-1.699 2.304s.709 2.323 1.73 2.323 1.698-.823 1.698-2.303-.708-2.324-1.729-2.324"
        fill={textColor}
      />}
    </svg>
  );
};
