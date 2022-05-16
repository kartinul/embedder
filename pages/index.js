import Head from "next/head";

export function getServerSideProps({ query }) {
  return {
    props: { ...query },
  };
}

function Home(props) {
  return (
    <Head>
      <meta property="og:title" content={props.title}></meta>
    </Head>
  );
}
export default Home;
