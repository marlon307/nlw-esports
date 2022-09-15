import React, { useEffect, useState } from "react";
import { Image, FlatList } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { GameCard, GameCardProps } from "../../components/GameCard";
import { Heading } from "../../components/Heading";
import { useNavigation } from '@react-navigation/native'
import logoimg from '../../assets/logo-nlw-esports.png'
import { styles } from "./styles";
import { BackGround } from "../../components/Background";

export function Home() {
  const navigation = useNavigation()
  const [games, setGames] = useState<GameCardProps[]>([]);

  function hadleOpenGame({ id, title, bannerUrl }: GameCardProps) {
    navigation.navigate("game", { id, title, bannerUrl })
  }

  useEffect(() => {
    fetch('http://10.0.0.100:3333/games')
      .then((res) => res.json())
      .then((josn) => setGames(josn)
      )
  }, []);

  return (
    <BackGround>
      <SafeAreaView style={ styles.container }>
        <Image
          source={ logoimg }
          style={ styles.logo }
        />
        <Heading title="Encontre seu duo!" subtitle="selecione o game que deseja jogar..." />
        <FlatList
          data={ games }
          horizontal
          showsHorizontalScrollIndicator={ false }
          contentContainerStyle={ styles.contentList }
          keyExtractor={ (item) => item.id }
          renderItem={
            ({ item }) =>
              <GameCard
                data={ item }
                onPress={ () => hadleOpenGame(item) }
              />
          } />
      </SafeAreaView>
    </BackGround>
  )
}
