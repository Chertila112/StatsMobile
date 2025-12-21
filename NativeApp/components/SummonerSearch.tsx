import { TouchableOpacity, Text, TextInput, View, KeyboardAvoidingView, Platform } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import DropDownPicker from 'react-native-dropdown-picker';
import { useState } from 'react'
import { useRankStats } from '@/hooks/useRankStats';
import { Summoner } from '@/types/types';
import Popup from './Popup';
import { regionItems } from '@/values/regionMap';



const SummonerSearch = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Summoner | null>(null);

  //=================== QUERY =========================
  const { data, isLoading, isPending, error } = useRankStats(formData);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<Summoner>();


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
            render={({ field: { value, onChange, onBlur } }) => (
              <View style={{ flex: 3 }} className='bg-dark-secondary border h-[40px] rounded-full'>
                <TextInput
                  placeholder='Summoner name'
                  placeholderTextColor={'#1a1a1a'}
                  value={value}
                  cursorColor={'black'}
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
              <View style={{ flex: 2 }} className='border-y h-[40px] bg-dark-secondary border-l ml-1 rounded-l-full'>
                <TextInput
                  placeholder='Tag'
                  placeholderTextColor={'#1a1a1a'}
                  value={value}
                  cursorColor={'black'}
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
                setValue={onChange}
                style={{
                  backgroundColor: '#595959',
                  borderWidth: 1,
                  borderColor: 'black',
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
          className="bg-dark-tertiary pt-2 h-[40px] rounded-full items-center mt-2"
          onPress={handleSubmit(
            (data: Summoner) => setFormData(data)
          )
          }
        >
          <Text className="text-black font-bold">Show</Text>
        </TouchableOpacity>
        {isLoading && <View className='border-4 border-dashed mx-auto my-2 rounded-full border-dark-secondary animate-spin h-10 w-10' />
        }
        {error && <Text className='text-dark-tertiary'>Error: {error.message}</Text>}
        {!isPending && !error && <Text className='text-dark-tertiary'>{`${data?.tier} ${data?.rank}`}</Text>}
      </View >
      {errors.username && <Popup msg={`${errors.username?.message}: username`} />}
    </KeyboardAvoidingView >
  )
}

export default SummonerSearch;
