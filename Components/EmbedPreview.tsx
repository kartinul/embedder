import React from "react";
import Image from "next/image";
import style from "../styles/Embed.module.scss";
import { metaData } from "./InputContainer";

interface PropsEmbedPreview {
  metaData: metaData;
}

export function EmbedPreview(props: PropsEmbedPreview) {
  let { metaData } = props;
  metaData.img = metaData.img || "";
  return (
    <div className={style.discordEmbedContainer} style={{ borderColor: metaData.color }}>
      <div className={style.head}>{metaData.head}</div>
      <div>{metaData.title}</div>
      <div>{metaData.desc}</div>
      <img src={metaData.img} alt="Image not found" />
    </div>
  );
}
