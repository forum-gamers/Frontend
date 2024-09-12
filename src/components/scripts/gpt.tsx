import Script from "next/script";

export default function LoadGPT() {
  return (
    <Script
      strategy="afterInteractive"
      src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
      async
      id="gpt-script"
    />
  );
}
