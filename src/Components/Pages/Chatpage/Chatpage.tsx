import Algolia from "../../Algolia/Algolia";
import {
  Addsvg,
  ButtonDesc,
  Container,
  Content,
  Left,
  NewChatButton,
  Right,
  Title,
  Top,
} from "./ChatpageElements";

const Chatpage = () => {
  return (
    <Container>
      <Content>
        <Left>
          <Top>
            <Title>Chat</Title>
            <NewChatButton>
              <Addsvg
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="white" />
              </Addsvg>
              <ButtonDesc>Create New Chat</ButtonDesc>
            </NewChatButton>
          </Top>
          <Algolia/>
        </Left>
        <Right>Right</Right>
      </Content>
    </Container>
  );
};

export default Chatpage;
