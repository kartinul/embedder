import Head from "next/head";

export function getServerSideProps({ query }) {
  return {
    props: { ...query },
  };
}

function Home(props) {
  return (
    <>
      <Head>
        {/* /?title=Amogus Very gud website&color=#fff&desc=susy baka&head=mango Boy!&img=https://cdn.discordapp.com/icons/102860784329052160/a_4fbc177539c73d884393602c62be8a38.gif?size=128&big=yes */}
        <meta property="og:title" content={props.title} />
        <meta name="theme-color" content={props.color} />
        <meta property="og:description" content={props.desc} />
        <meta property="og:site_name" content={props.head} />
        <meta property="og:image" content={props.img} />
        {props.big ? <meta name="twitter:card" content="summary_large_image" /> : <></>}
      </Head>
      <h1>Hello</h1>
    </>
  );
}
export default Home;
