import Props from "./props";
import { Container, Text } from "./styles";


export function Button({ ...props }: Props){
return(
  <Container {...props}>
    <Text>{props.text}</Text>
  </Container>
);  
}