import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableOpacity, View, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GameParams } from '../../@types/navigation';
import { Entypo } from "@expo/vector-icons"
import { BackGround } from '../../components/Background';
import { THEME } from '../../theme';
import logoImg from '../../assets/logo-nlw-esports.png';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { DuoMatch } from '../../components/DuoMatch';
import { styles } from './styles';

export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState<string>('')
  const navigation = useNavigation()
  const route = useRoute();
  const game = route.params as GameParams;

  async function getDiscordUser(adsId: string) {
    fetch(`http://10.0.0.100:3333/ads/${adsId}/discord`)
      .then((res) => res.json())
      .then((josn) => setDiscordDuoSelected(josn.discord)
      )
  }

  useEffect(() => {
    fetch(`http://10.0.0.100:3333/games/${game.id}/ads`)
      .then((res) => res.json())
      .then((josn) => setDuos(josn)
      )
  }, []);

  return (
    <BackGround>
      <SafeAreaView style={ styles.container }>
        <View style={ styles.header }>
          <TouchableOpacity onPress={ () => navigation.goBack() }>
            <Entypo name="chevron-thin-left" color={ THEME.COLORS.CAPTION_300 } size={ 20 } />
          </TouchableOpacity>
          <Image
            source={ logoImg }
            style={ styles.logo }
          />
          <View style={ styles.right } />
        </View>

        <Image
          source={ { uri: game.bannerUrl } }
          style={ styles.cover }
          resizeMode="cover"
        />

        <Heading
          title={ game.title }
          subtitle='Conecte-se e comece a jogar!'
        />
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={ false }
          contentContainerStyle={ duos.length > 0 ? styles.contentList : styles.empytListContent }
          style={ styles.containerList }
          ListEmptyComponent={ () =>
            <Text style={ styles.empytListText }>
              Não ha anúncios plublicados ainda.
            </Text>
          }
          data={ duos }
          keyExtractor={ (item) => item.id }
          renderItem={
            ({ item }) =>
              <DuoCard
                data={ item }
                onConnect={ () => getDiscordUser(item.id) }
              />
          }
        />
        <DuoMatch
          visible={ discordDuoSelected.length > 0 }
          discord={ discordDuoSelected }
          onClose={ () => setDiscordDuoSelected("") }
        />
      </SafeAreaView>
    </BackGround>
  )
}
