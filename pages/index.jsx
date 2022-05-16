import Head from "next/head";
import { useState } from "react";
const querystring = require("querystring");

export function getServerSideProps({ query }) {
  return {
    props: { ...query },
  };
}

const g = (t, custom) => {
  custom = custom || "value";
  return document.getElementById(t)[custom];
};

function toTitleCase(s) {
  s = s || "";
  return s.toLowerCase().replace(/\b((m)(a?c))?(\w)/g, function ($1, $2, $3, $4, $5) {
    if ($2) {
      return $3.toUpperCase() + $4 + $5.toUpperCase();
    }
    return $1.toUpperCase();
  });
}

function Home(props) {
  let [text, setText] = useState("");

  const onFormSubmit = (e) => {
    e.preventDefault();
    const q = {
      title: g("title"),
      desc: g("desc"),
      head: g("head"),
      img: g("img"),
      color: g("color"),
      big: g("big", "checked"),
    };
    console.log(q);
    setText(querystring.encode(q));
  };

  const meta = [
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
      id: "head",
      defaultValue: props.head,
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
      defaultValue: !!props.big,
      type: "checkbox",
    },
  ];

  return (
    <>
      <Metas q={props} />
      <h1>Embed maker</h1>
      <form className="form" onSubmit={onFormSubmit}>
        {btn(meta)}

        <button type="submit">Submit</button>
      </form>
      <h1>https://embedder-rouge.vercel.app/?{text}</h1>
    </>
  );
}

function btn(meta) {
  let btns = [];
  meta.forEach((x) => {
    btns.push(<label htmlFor={x.id}>{x.name || toTitleCase(x.id)}</label>);
    if (x.id === "desc") {
      btns.push(<textarea type={x.type || "text"} name={x.id} id={x.id} defaultValue={x.defaultValue}></textarea>);
    } else {
      btns.push(<input type={x.type || "text"} name={x.id} id={x.id} defaultValue={x.defaultValue} />);
    }
  });
  return btns;
}

function Metas({ q }) {
  console.log(q);
  return (
    <Head>
      {/* /?title=Amogus Very gud website&color=#fff&desc=susy baka&head=mango Boy!&img=https://cdn.discordapp.com/icons/102860784329052160/a_4fbc177539c73d884393602c62be8a38.gif?size=128&big=yes */}
      <meta name="theme-color" content={q.color} />
      <meta property="og:title" content={q.title} />
      <meta property="og:description" content={q.desc} />
      <meta property="og:site_name" content={q.head} />
      <meta property="og:image" content={q.img} />
      {q.big === "true" ? <meta name="twitter:card" content="summary_large_image" /> : <></>}
    </Head>
  );
}
export default Home;
