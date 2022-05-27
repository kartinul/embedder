import React, { useState } from "react";
import querystring from "querystring";
import { EmbedPreview } from "./EmbedPreview";
import { setDoc, collection, getDocs, addDoc, doc } from "firebase/firestore";
import { app, db } from "../firebaseConfig";
import { randId } from "../Funcs/string";

// const onFormSubmit = () => {
//   const q = {
//     title: g("title"),
//     desc: g("desc"),
//     head: g("head"),
//     img: g("img"),
//     color: g("color"),
//     big: g("big", "checked"),
//   };
//   setText("?" + querystring.encode(q));
//   return querystring.encode(q);
// };

// todo setCustomURL & onFormSubmit

export interface metaData {
  head: string;
  title: string;
  desc: string;
  img: string;
  color: string;
  big: boolean;
}

const setCustomURL = (ids: string[], metaData: metaData) => {
  let id: string;
  do {
    id = randId();
  } while (ids.includes(id));

  const urlsRef = collection(db, "urls");
  const data = {
    id: randId(),
    query: metaData,
    expiry: new Date().getDate() + 2,
  };
  addDoc(urlsRef, data);

  return data.id;
};

export function InputContainer({ dom, query, ids }: any) {
  let [metaData, setMetaData] = useState({
    head: query.head,
    title: query.title,
    desc: query.desc,
    img: query.img,
    color: query.color,
    big: query.big === "true" ? true : false,
  });
  let [text, setText] = useState("");

  const updateMetaData = (e: any) => {
    const value = e.target.id === "big" ? (e.target.checked ? "true" : "false") : `"${e.target.value}"`;
    console.log(value);
    let metaDataString = `{"${e.target.id}": ${value}}`;
    let metaDataEvent = { ...metaData, ...JSON.parse(metaDataString) };

    console.log(metaDataEvent);

    setMetaData(metaDataEvent);
  };

  const submitForm = (e: Event) => {
    e.preventDefault();
    setText("?" + querystring.stringify(metaData));
    console.log("You have Submited the form.");
  };

  const onSetCustomURL = (e: Event) => {
    setText(setCustomURL(ids, metaData));
  };

  return (
    <>
      <div className="input-container">
        <h1>Embed maker</h1>

        <InputForm query={query} onSubmit={submitForm} updateMetaData={updateMetaData} />

        <h1 id="url">
          <a href={`http://${dom}/${text}`}>
            http://{dom}/{text}
          </a>
        </h1>

        <CustomURLButton onClick={onSetCustomURL} />
      </div>
      <EmbedPreview metaData={metaData} />
    </>
  );
}

function InputForm({ onSubmit, updateMetaData, query }: any) {
  return (
    <form className="form" onSubmit={onSubmit}>
      <input defaultValue={query.head} onChange={updateMetaData} placeholder="Header" type="text" id="head" />
      <input defaultValue={query.title} onChange={updateMetaData} placeholder="Title" type="text" id="title" />
      <input defaultValue={query.desc} onChange={updateMetaData} placeholder="Description" type="text" id="desc" />
      <input defaultValue={query.img} onChange={updateMetaData} placeholder="Image URL" type="text" id="img" />
      <div>
        <label htmlFor="color">Color</label>
        <input defaultValue={query.color} onChange={updateMetaData} type="color" id="color" />
      </div>

      <div>
        <label htmlFor="big">Big Image?</label>
        <input
          defaultChecked={query.big === "true" ? true : false}
          onChange={updateMetaData}
          type="checkbox"
          id="big"
        />
      </div>

      <button id="submit" type="submit">
        Submit
      </button>
    </form>
  );
}

function CustomURLButton({ onClick }: any) {
  return (
    <button
      onClick={onClick}
      style={{
        color: "red",
        padding: "10px",
        marginTop: "20px",
        fontSize: "20px",
      }}
    >
      Set custom URL
    </button>
  );
}
