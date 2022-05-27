import { useState } from "react";
import { EmbedPreview } from "./EmbedPreview";
import { InputContainer } from "./InputContainer";

interface AppContainerProps {
  dom: string;
  query: any;
  ids: any[];
}

const AppContainer = (props: AppContainerProps) => {
  return (
    <div className="container" style={{ display: "flex", justifyContent: "space-between" }}>
      <InputContainer ids={props.ids} dom={props.dom} query={props.query} />
    </div>
  );
};

export { AppContainer };
