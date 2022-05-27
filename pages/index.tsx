import { EmbedPreview } from "../Components/EmbedPreview";
import { InputContainer } from "../Components/InputContainer";
import { AppContainer } from "../Components/AppContainer";
import { Metas } from "../Components/Metas";
import { useState } from "react";
import { db } from "../firebaseConfig";
import { setDoc, collection, getDocs, addDoc, doc } from "firebase/firestore";

export async function getServerSideProps({ query, req }: any) {
  let idDoc = await getDocs(collection(db, "urls"));
  let ids: string[] = [];

  idDoc.forEach((y) => {
    ids.push(y.data().id);
  });

  return {
    props: { query, ids: ids, host: req.headers.host },
  };
}

interface HomeProps {
  host: any;
  ids: string[];
  query: any;
}

function Home(props: HomeProps) {
  const { host, query, ids } = props;
  const dom = host;

  return (
    <>
      <Metas query={query} />

      <AppContainer ids={ids} dom={dom} query={query}></AppContainer>
    </>
  );
}

export default Home;
