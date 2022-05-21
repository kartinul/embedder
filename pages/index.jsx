import Head from "next/head";
import { useState } from "react";
import { db } from "../firebaseConfig";
import { setDoc, collection, getDocs, addDoc, doc } from "firebase/firestore";

import querystring from "querystring";

export async function getServerSideProps({ query, req }) {
  let idDoc = await getDocs(collection(db, "urls"));
  let ids = [];
  idDoc.forEach((y) => {
    ids.push(y.data().id || null);
  });
  return {
    props: { ...query, ids: ids, host: req.headers.host },
  };
}

const g = (t, custom) => {
  custom = custom || "value";
  return document.getElementById(t)[custom].replace(/</gi, "⪡").replace(/>/gi, "⪢");
};

function toTitleCase(s) {
  s = s || "";
  return s.toLowerCase()?.replace(/\b((m)(a?c))?(\w)/g, function ($1, $2, $3, $4, $5) {
    if ($2) {
      return $3.toUpperCase() + $4 + $5.toUpperCase();
    }
    return $1.toUpperCase();
  });
}

function Home(props) {
  let [text, setText] = useState("");
  const dom = props.host;

  const onFormSubmit = () => {
    const q = {
      title: g("title"),
      desc: g("desc"),
      head: g("head"),
      img: g("img"),
      color: g("color"),
      big: g("big", "checked"),
    };
    setText("?" + querystring.encode(q));
    return querystring.encode(q);
  };

  const meta = [
    {
      id: "head",
      defaultValue: props.head,
    },
    {
      id: "title",
      defaultValue: props.title,
    },
    {
      id: "desc",
      name: "Description",
      defaultValue: props.desc,
    },
    {
      id: "img",
      name: "Image",
      defaultValue: props.img,
    },
    {
      id: "color",
      defaultValue: props.color,
      type: "color",
    },
    {
      id: "big",
      name: "Big image",
      customDefaultValue: "checked",
      defaultValue: props.big === "true",
      type: "checkbox",
    },
  ];

  const randId = () => {
    const alphabets = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
    const rand = "";
    for (let i = 0; i < 4; i++) {
      rand += alphabets[Math.floor(Math.random() * alphabets.length)];
    }
    return rand;
  };

  let form;
  const setCustomURL = () => {
    const url = onFormSubmit();

    let rand;
    do {
      rand = randId();
    } while (props.ids.includes(rand));

    if (!g("title")) {
      return;
    }

    const date = new Date();
    addDoc(collection(db, "urls"), {
      id: rand,
      query: url,
      expiry: date.getDate() + 2,
    }).then();

    Array.of(document.querySelectorAll("input")).forEach((x) =>
      x.forEach((y) => {
        y.value = "";
        y.checked = false;
      })
    );
    document.querySelector("textarea").value = "";
    setText(rand);
  };

  return (
    <>
      <Metas q={props} />
      <h1>Embed maker</h1>
      <form
        ref={form}
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          onFormSubmit();
        }}
      >
        {btn(meta)}

        <button id="submit" type="submit">
          Submit
        </button>
      </form>
      <button onClick={setCustomURL} style={{ color: "red", padding: "10px", marginTop: "20px", fontSize: "20px" }}>
        Set custom URL
      </button>
      <h1 id="url">
        <a href={`http://${dom}/${text}`}>
          http://{dom}/{text}
        </a>
      </h1>
    </>
  );
}

function btn(meta) {
  let btns = [];
  meta.forEach((x) => {
    btns.push(<label htmlFor={x.id}>{x.name || toTitleCase(x.id)}</label>);
    if (x.id === "desc") {
      btns.push(<textarea type={x.type || "text"} name={x.id} id={x.id} defaultValue={x.defaultValue}></textarea>);
      return;
    }
    if (x.id === "big" && x.defaultValue) {
      btns.push(<input type={x.type || "text"} name={x.id} id={x.id} defaultChecked={x.defaultValue} />);
      return;
    }

    btns.push(<input type={x.type || "text"} name={x.id} id={x.id} defaultValue={x.defaultValue} />);
  });
  return btns;
}

export function Metas({ q, children }) {
  children = children || <></>;
  return (
    <Head>
      {/* /?title=Amogus Very gud website&color=#fff&desc=susy baka&head=mango Boy!&img=https://cdn.discordapp.com/icons/102860784329052160/a_4fbc177539c73d884393602c62be8a38.gif?size=128&big=yes */}
      <meta name="theme-color" content={q.color} />
      <meta property="og:title" content={q.title} />
      <meta property="og:description" content={q.desc} />
      <meta property="og:site_name" content={q.head} />
      <meta property="og:image" content={q.img} />
      {q.big === "true" ? <meta name="twitter:card" content="summary_large_image" /> : <></>}
      {children}
    </Head>
  );
}

export default Home;
