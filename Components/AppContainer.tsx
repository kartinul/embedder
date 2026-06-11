import { Container, Box } from "@radix-ui/themes";
import { InputContainer } from "./InputContainer";

interface AppContainerProps {
  dom: string;
  query: any;
  ids: any[];
}

const AppContainer = (props: AppContainerProps) => {
  return (
    <Container size="4" px="4" py="8">
      <InputContainer ids={props.ids} dom={props.dom} query={props.query} />
    </Container>
  );
};

export { AppContainer };
