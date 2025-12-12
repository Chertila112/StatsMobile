import { TouchableOpacity, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Platform } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import DropDownPicker from 'react-native-dropdown-picker';
import { useState } from 'react'


type Summoner = {
  username: string,
  tag: string,
  region: string
}

const SummonerSearch = () => {
  const [data, setData] = useState();
  const [open, setOpen] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<Summoner>();

  const onSubmit = (data: Summoner) => {
    setData(data);
  }

  const regionItems = [
    { label: 'RU', value: 'ru' },
    { label: 'EUW', value: 'euw' },
    { label: 'EUN', value: 'eun' },
    { label: 'NA', value: 'na' },
    { label: 'KR', value: 'kr' },
    { label: 'BR', value: 'br' },
    { label: 'JP', value: 'jp' },
    { label: 'SEA', value: 'sea' },
    { label: 'TW', value: 'tw' },
    { label: 'VN', value: 'vn' },
    { label: 'ME', value: 'me' },
    { label: 'LAS', value: 'las' },
    { label: 'LAN', value: 'lan' },
    { label: 'TR', value: 'tr' },
    { label: 'OCE', value: 'oce' },
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View className='flex-1 justify-center mx-8'>
        <Text className='text-dark-tertiary relative bottom-10 text-5xl mb-4'>Welcome! Fill the fields below to see statistics</Text>
        <View className="flex-row w-full">
          <Controller
            control={control}
            name='username'
            rules={{ required: 'This field cant be empty' }}
            render={({ field: { value, onChange, onBlur }, fieldState }) => (
              <View style={{ flex: 3 }} className='bg-dark-secondary border h-[40px] rounded-xl'>
                <TextInput
                  placeholder='Summoner name'
                  placeholderTextColor={'#1a1a1a'}
                  value={value}
                  cursorColor={'black'}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
                {fieldState.error && (
                  <Text style={{ color: 'red' }}>{fieldState.error.message}</Text>
                )}
              </View>
            )}
          />
          <Controller
            control={control}
            name='tag'
            rules={{ required: 'This field cant be empty' }}
            render={({ field: { value, onChange, onBlur }, fieldState }) => (
              <View style={{ flex: 2 }} className='border-y h-[40px] bg-dark-secondary border-l ml-1 rounded-l-xl'>
                <TextInput
                  placeholder='Tag'
                  placeholderTextColor={'#1a1a1a'}
                  value={value}
                  cursorColor={'black'}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
                {fieldState.error && (
                  <Text style={{ color: 'red' }}>{fieldState.error.message}</Text>
                )}
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
                setValue={onChange}
                onSelectItem={(item) => {
                  onChange(item.value);
                }}
                style={{
                  backgroundColor: '#595959',
                  borderWidth: 1,
                  borderColor: 'black',
                  borderTopRightRadius: 12,
                  borderBottomRightRadius: 12,
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  minHeight: 40,
                  maxHeight: 40,
                }}
                containerStyle={{
                  flex: 2,
                }}
                dropDownContainerStyle={{
                  backgroundColor: '#595959',
                  borderColor: '#595959',
                }}
                textStyle={{
                  color: 'black',
                  textAlign: 'center',
                }}
                placeholderStyle={{
                  color: '#1a1a1a'
                }}
                placeholder={'Region'}
                showArrowIcon={false}
              />
            )}
          />
        </View>
        <TouchableOpacity
          className="bg-dark-tertiary pt-2 h-[40px] rounded-xl items-center mt-2"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-black font-bold">Show</Text>
        </TouchableOpacity>
      </View >
    </KeyboardAvoidingView>
  )
}

export default SummonerSearch
