import Script from "next/script";

export default function LoadGtm() {
  return (
    <Script
      id="gtm-script"
      dangerouslySetInnerHTML={{
        __html: `
          window.googletag = window.googletag || {cmd: []};
          googletag.cmd.push(function() {
            googletag.defineSlot('/xxxxxx/yyyyyy', [728, 90], 'div-gpt-ad-123456789-0').addService(googletag.pubads());
            googletag.pubads().enableSingleRequest();
            googletag.enableServices();
          });
        `,
      }}
    />
  );
}
