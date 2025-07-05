// "use client";

// import { useEffect } from "react";

// export default function ChatBox() {
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://cdn.botpress.cloud/webchat/v3.0/inject.js";
//     script.async = true;

//     script.onload = () => {
//       window.botpress.init({
//         botId: "86f6025e-63d5-4083-b089-17185594746f",
//         clientId: "5a639656-77ae-46ba-b615-18dea036fefd",
//         configuration: {
//           version: "v1",
//           color: "#3276EA",
//           variant: "solid",
//           headerVariant: "glass",
//           themeMode: "light",
//           fontFamily: "inter",
//           radius: 4,
//           feedbackEnabled: true,
//           footer: "[⚡ by Botpress](https://botpress.com/?from=webchat)",
//         },
//       });
//     };

//     document.body.appendChild(script);

//     return () => {
//       script.remove();
//     };
//   }, []);

//   return null;
// }
"use client";

import { useEffect } from "react";

export default function ChatBox() {
  useEffect(() => {
    const injectScript = document.createElement("script");
    injectScript.src = "https://cdn.botpress.cloud/webchat/v3.0/inject.js";
    injectScript.defer = true;

    const customScript = document.createElement("script");
    customScript.src =
      "https://files.bpcontent.cloud/2025/07/04/15/20250704155019-KM3V7NXE.js";
    customScript.defer = true;

    document.body.appendChild(injectScript);
    document.body.appendChild(customScript);

    return () => {
      injectScript.remove();
      customScript.remove();
    };
  }, []);

  return null;
}
