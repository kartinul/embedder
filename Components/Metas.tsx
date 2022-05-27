import Head from "next/head";

export function Metas(props: any) {
  let { query, children } = props;
  children = children || <></>;
  return (
    <Head>
      {/* /?title=Amogus Very gud website&color=#fff&desc=susy baka&head=mango Boy!&img=https://cdn.discordapp.com/icons/102860784329052160/a_4fbc177539c73d884393602c62be8a38.gif?size=128&big=yes */}
      <meta name="theme-color" content={query.color} />
      <meta property="og:title" content={query.title} />
      <meta property="og:description" content={query.desc} />
      <meta property="og:site_name" content={query.head} />
      <meta property="og:image" content={query.img} />
      {query.big ? <meta name="twitter:card" content="summary_large_image" /> : <></>}
      {children}
    </Head>
  );
}
