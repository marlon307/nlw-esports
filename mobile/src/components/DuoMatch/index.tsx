import { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ModalProps, Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { CheckCircle } from 'phosphor-react-native';
import * as ClipBoard from 'expo-clipboard';
import { THEME } from '../../theme';
import { Heading } from '../Heading';
import { styles } from './styles';

interface Props extends ModalProps {
  discord: string;
  onClose: () => void
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {
  const [isCopping, setIsCopping] = useState(false);

  async function handleCopyUserToClipBoard() {
    setIsCopping(true);
    await ClipBoard.setStringAsync(discord);

    Alert.alert('Disocrd copiado!', 'Usuário copiado para voce colar no Disocrd.');
    setIsCopping(false);
  }

  return (
    <Modal
      transparent
      statusBarTranslucent
      animationType="fade"
      { ...rest }
    >
      <View style={ styles.container }>
        <View style={ styles.content }>
          <TouchableOpacity
            style={ styles.coloseIcon }
            onPress={ onClose }
          >
            <MaterialIcons
              name="close"
              size={ 20 }
              color={ THEME.COLORS.CAPTION_500 }
            />
          </TouchableOpacity>
          <CheckCircle
            size={ 64 }
            color={ THEME.COLORS.SUCCESS }
            weight="bold"
          />
          <Heading
            title="Let's play!"
            subtitle="Agora é só começar a jogar!"
            style={ { alignItems: 'center', marginTop: 24 } }
          />
          <Text style={ styles.label }>
            Adicione seu Discord
          </Text>
          <TouchableOpacity
            style={ styles.discordButton }
            onPress={ handleCopyUserToClipBoard }
            disabled={ isCopping }
          >
            <Text style={ styles.discord }>{
              isCopping ? <ActivityIndicator color={ THEME.COLORS.PRIMARY } /> : discord
            }</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}
