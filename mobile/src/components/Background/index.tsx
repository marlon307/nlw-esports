import { ImageBackground, View } from "react-native";
import { styles } from "./styles";
import backgroundImg from '../../assets/background-galaxy.png';

interface Props {
  children: React.ReactNode
}


export function BackGround({ children }: Props) {
  return (
    <ImageBackground
      source={ backgroundImg }
      defaultSource={ backgroundImg }
      style={ styles.container }
    >
      { children }
    </ImageBackground>
  );
}
