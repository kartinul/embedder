import React from "react";
import { metaData } from "./InputContainer";
import { Box, Flex, Text } from "@radix-ui/themes";

interface PropsEmbedPreview {
  metaData: metaData;
}

export function EmbedPreview(props: PropsEmbedPreview) {
  let { metaData } = props;
  
  return (
    <Box 
      style={{ 
        borderLeft: `4px solid ${metaData.color || '#5865F2'}`,
        backgroundColor: "var(--gray-a3)",
        borderRadius: "4px",
        padding: "16px",
        maxWidth: "500px"
      }}
    >
      <Flex direction="column" gap="2">
        {metaData.head && (
          <Text size="2" color="gray" weight="medium">
            {metaData.head}
          </Text>
        )}
        
        {metaData.title && (
          <Text size="4" weight="bold" style={{ color: "var(--iris-11)" }}>
            {metaData.title}
          </Text>
        )}
        
        {metaData.desc && (
          <Text size="2" style={{ color: "var(--gray-12)" }}>
            {metaData.desc}
          </Text>
        )}
        
        {metaData.img && (
          <Box mt="2" style={{ overflow: "hidden", borderRadius: "8px" }}>
            <img 
              src={metaData.img} 
              alt="Embed Image Preview" 
              style={{ 
                maxWidth: "100%", 
                maxHeight: metaData.big ? "400px" : "150px", 
                objectFit: "cover" 
              }} 
            />
          </Box>
        )}
      </Flex>
    </Box>
  );
}
