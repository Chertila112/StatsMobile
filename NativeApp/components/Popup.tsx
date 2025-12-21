import { useState } from 'react';
import { Text, View } from 'react-native'
import Modal from 'react-native-modal';


interface popupProps {
  msg: string | undefined;
}

const Popup = ({ msg }: popupProps) => {
  const [isVisible, setVisible] = useState(true);
  return (
    <View className='absolute w-full h-1/4'>
      <Modal
        className='-top-10'
        isVisible={isVisible}
        backdropOpacity={0}
        onBackdropPress={() => { setVisible(false) }}
        animationIn={'slideInDown'}
        animationInTiming={500}
        animationOut={'slideOutUp'}
        animationOutTiming={500}
        coverScreen={false}
      >
        <View className='error_popup'>
          <Text>{msg}</Text>
        </View>
      </Modal>
    </View>
  )
}

export default Popup

