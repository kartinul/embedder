import { app, db } from "../firebaseConfig";
import { getDocs, collection, deleteDoc, doc, DocumentData } from "firebase/firestore";
import { Metas } from "../Components/Metas";
import querystring from "querystring";

export async function getServerSideProps({ params, req }: { params: any; req: { headers: { host: string } } }) {
  const urls = collection(db, "urls");
  const current = await getDocs(urls);
  const date = new Date();
  let data: any = null;

  current.forEach((x) => {
    let docData = x.data();
    if (docData.expiry < date.getDate()) {
      deleteDoc(x.ref);
      data = null;
    }
    if (docData.id === params.pid) {
      data = docData;
    }
  });

  let query = data?.query || null;

  return {
    props: { ...params, query: query },
  };
}

const Post = (props: { url?: any; pid?: any; query?: any }) => {
  const { pid, query } = props;
  console.log(query);
  return (
    <>
      {query ? (
        <>
          <Metas query={query}>{/* <meta httpEquiv="refresh" content={"3;url=http://" + props.url} /> */}</Metas>
        </>
      ) : (
        <h1 style={{ marginLeft: "20px" }}>404</h1>
      )}
    </>
  );
};

export default Post;
