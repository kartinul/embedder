import { app, db } from "../firebaseConfig";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { Metas } from "./index";
const querystring = require("query-string");

export async function getServerSideProps({ params }) {
  const urls = collection(db, "urls");
  const current = await getDocs(urls);
  const date = new Date();
  let data = null;
  console.log(date.getDate());
  current.forEach((x) => {
    if (x.data().exiry < date.getDate()) {
      deleteDoc(doc(db, x.id));
    }
    if (x.data().id === params.pid) {
      data = x.data();
    }
  });
  let re;
  if (data) {
    const split = data.url.split("/");
    const search = split[split.length - 1];
    re = querystring.parse(search);
  } else {
    re = null;
  }
  return {
    props: { ...params, re },
  };
}

const Post = (props) => {
  const { pid, re } = props;
  return (
    <>
      {re ? (
        <>
          <Metas q={re} />
        </>
      ) : (
        <h1 style={{ marginLeft: "20px" }}>404</h1>
      )}
    </>
  );
};

export default Post;
