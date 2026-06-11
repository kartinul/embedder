import "@radix-ui/themes/styles.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Theme } from "@radix-ui/themes";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Theme appearance="dark" accentColor="bronze" panelBackground="translucent" radius="medium">
      <Component {...pageProps} />
    </Theme>
  );
}

export default MyApp;
