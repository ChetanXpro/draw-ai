import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Draw AI - Transform Your Drawing Ideas into Reality</title>
        <link rel="icon" href="/logo.png" />
        <meta
          name="description"
          content="Draw ai app to convert your drawing ideas into reality."
          key="desc"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
