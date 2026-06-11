import React, { useState } from "react";
import { EmbedPreview } from "./EmbedPreview";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { randId } from "../Funcs/string";
import { Flex, Card, Heading, Text, TextField, Button, Checkbox, Box, Link, Grid } from "@radix-ui/themes";
import { Link2Icon, MagicWandIcon } from "@radix-ui/react-icons";

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
  const [metaData, setMetaData] = useState({
    head: query.head || "",
    title: query.title || "",
    desc: query.desc || "",
    img: query.img || "",
    color: query.color || "#5865F2",
    big: query.big === "true",
  });
  const [text, setText] = useState("");

  const handleChange = (field: keyof metaData, value: string | boolean) => {
    setMetaData((prev) => ({ ...prev, [field]: value }));
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(Object.entries({
      ...metaData,
      big: metaData.big ? "true" : "false"
    }));
    setText("?" + params.toString());
  };

  const onSetCustomURL = () => {
    setText(setCustomURL(ids, metaData));
  };

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="6" align="start">
      <Box>
        <Card size="4">
          <Flex direction="column" gap="4">
            <Heading size="6" mb="2">Embed Maker</Heading>
            
            <form onSubmit={submitForm}>
              <Flex direction="column" gap="3">
                <Box>
                  <Text as="div" size="2" mb="1" weight="bold">Provider / Header</Text>
                  <TextField.Root 
                    value={metaData.head} 
                    onChange={(e) => handleChange("head", e.target.value)} 
                    placeholder="E.g. My Awesome Site" 
                  />
                </Box>
                
                <Box>
                  <Text as="div" size="2" mb="1" weight="bold">Title</Text>
                  <TextField.Root 
                    value={metaData.title} 
                    onChange={(e) => handleChange("title", e.target.value)} 
                    placeholder="Embed Title" 
                  />
                </Box>
                
                <Box>
                  <Text as="div" size="2" mb="1" weight="bold">Description</Text>
                  <TextField.Root 
                    value={metaData.desc} 
                    onChange={(e) => handleChange("desc", e.target.value)} 
                    placeholder="A short description..." 
                  />
                </Box>
                
                <Box>
                  <Text as="div" size="2" mb="1" weight="bold">Image URL</Text>
                  <TextField.Root 
                    value={metaData.img} 
                    onChange={(e) => handleChange("img", e.target.value)} 
                    placeholder="https://..." 
                  />
                </Box>
                
                <Flex gap="4" align="center" mt="2">
                  <Box>
                    <Text as="div" size="2" mb="1" weight="bold">Color</Text>
                    <input 
                      type="color" 
                      value={metaData.color} 
                      onChange={(e) => handleChange("color", e.target.value)}
                      style={{ width: "40px", height: "40px", padding: 0, border: "none", borderRadius: "var(--radius-3)", cursor: "pointer" }}
                    />
                  </Box>
                  
                  <Flex align="center" gap="2" style={{ marginTop: "16px" }}>
                    <Checkbox 
                      checked={metaData.big} 
                      onCheckedChange={(checked) => handleChange("big", checked === true)} 
                    />
                    <Text size="2" weight="bold">Large Image Preview?</Text>
                  </Flex>
                </Flex>

                <Flex gap="3" mt="4">
                  <Button type="submit" size="3" variant="solid" color="iris">
                    <Link2Icon /> Generate URL
                  </Button>
                  
                  <Button type="button" size="3" variant="soft" color="tomato" onClick={onSetCustomURL}>
                    <MagicWandIcon /> Create Shortlink
                  </Button>
                </Flex>
              </Flex>
            </form>
            
            {text && (
              <Box mt="4" p="3" style={{ background: "var(--gray-a3)", borderRadius: "var(--radius-3)" }}>
                <Text size="2" color="gray" mb="1" as="div">Generated Link:</Text>
                <Link href={`http://${dom}/${text}`} size="3" weight="bold">
                  {`http://${dom}/${text}`}
                </Link>
              </Box>
            )}
          </Flex>
        </Card>
      </Box>
      
      <Box>
        <Card size="4" style={{ background: "var(--gray-a2)" }}>
          <Heading size="4" mb="4" color="gray">Live Preview</Heading>
          <EmbedPreview metaData={metaData} />
        </Card>
      </Box>
    </Grid>
  );
}
