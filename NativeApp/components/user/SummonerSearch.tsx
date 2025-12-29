import { TouchableOpacity, Text, TextInput, View } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import DropDownPicker from 'react-native-dropdown-picker';
import { useState } from 'react'
import { Summoner } from '@/types/types';
import Popup from '../Popup';
import { regionItems } from '@/values/regionMap';


interface contextProps {
  setContext: (summoner: Summoner) => void,
}

const SummonerSearch = ({ setContext }: contextProps) => {
  const [open, setOpen] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<Summoner>({ mode: 'onSubmit' });


  return (
    <>
      <View className="flex-row flex-wrap py-2 px-4 w-full">
        <Controller
          control={control}
          name='username'
          rules={{ required: 'This field cant be empty' }}
          render={({ field: { value, onChange, onBlur } }) => (
            <View style={{ flex: 3 }} className='bg-dark-2  h-[40px] rounded-full'>
              <TextInput
                className='my-auto ml-2 text-dark-7'
                placeholder='Username'
                placeholderTextColor={'#696969'}
                value={value}
                cursorColor={'#7A7A7A'}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            </View>
          )}
        />
        <Controller
          control={control}
          name='tag'
          rules={{ required: 'This field cant be empty' }}
          render={({ field: { value, onChange, onBlur } }) => (
            <View style={{ flex: 2 }} className='h-[40px] bg-dark-2 ml-1 rounded-l-full'>
              <TextInput
                className='my-auto ml-2 text-dark-7'
                placeholder='Tag'
                placeholderTextColor={'#696969'}
                value={value}
                cursorColor={'#7A7A7A'}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            </View>
          )}
        />
        <Controller
          control={control}
          name="region"
          rules={{ required: 'This field cant be empty' }}
          render={({ field: { value, onChange } }) => (
            <DropDownPicker
              open={open}
              value={value}
              items={regionItems}
              setOpen={setOpen}
              setValue={() => { }}
              onSelectItem={(item) => onChange(item.value)}
              style={{
                borderWidth: 0,
                backgroundColor: '#232323',
                borderTopRightRadius: 50,
                borderBottomRightRadius: 50,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                minHeight: 40,
                maxHeight: 40,
              }}
              containerStyle={{
                flex: 2,
              }}
              dropDownContainerStyle={{
                backgroundColor: '#232323',
              }}
              textStyle={{
                color: '#7A7A7A',
                textAlign: 'center',
              }}
              placeholderStyle={{
                color: '#7A7A7A'
              }}
              placeholder={'Region'}
              showArrowIcon={false}
            />
          )}
        />
        <TouchableOpacity
          className="bg-dark-3 pt-2 h-[40px] p-4 w-full rounded-full items-center mt-2"
          onPress={handleSubmit(setContext)}
        >
          <Text className="text-dark-1 font-bold">Show</Text>
        </TouchableOpacity>
      </View>
      {(errors.username || errors.tag) && <Popup msg={`All fields must be filled`} />}
    </>
  )
}

export default SummonerSearch;
