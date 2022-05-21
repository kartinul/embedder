import { app, db } from "../firebaseConfig";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { Metas } from "./index";
const querystring = require("query-string");

export async function getServerSideProps({ params, req }) {
  const urls = collection(db, "urls");
  const current = await getDocs(urls);
  const date = new Date();
  let data = null;
  let url;
  current.forEach((x) => {
    if (x.data().expiry < date.getDate()) {
      deleteDoc(x.ref);
    }
    if (x.data().id === params.pid) {
      data = x.data();
    }
  });
  let re;
  if (data) {
    re = querystring.parse(data.query);
    url = req.headers.host + "/?" + data.query;
  } else {
    re = null;
    url = req.headers.host;
  }
  return {
    props: { ...params, re, url },
  };
}

const Post = (props) => {
  const { pid, re } = props;
  return (
    <>
      {re ? (
        <>
          <Metas q={re}>
            <meta httpEquiv="refresh" content={"3;url=http://" + props.url} />
          </Metas>
        </>
      ) : (
        <h1 style={{ marginLeft: "20px" }}>404</h1>
      )}
    </>
  );
};

export default Post;
