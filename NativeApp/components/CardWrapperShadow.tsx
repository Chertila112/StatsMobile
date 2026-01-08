import { View, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'

interface CardWrapperShadowProps {
  children: React.ReactNode
}

function CardWrapperShadow({ children }: CardWrapperShadowProps) {
  return (
    <View className='w-full' style={styles.wrapper}>
      <LinearGradient
        colors={[
          'rgba(255, 255, 255, 0.15)',
          'rgba(255, 255, 255, 0.05)',
          'rgba(0, 0, 0, 0.2)'
        ]}
        start={{ x: 0.3, y: 0 }}
        end={{ x: 0.3, y: 1 }}
        style={styles.gradientBorder}
      >
        {children}
      </LinearGradient>
    </View>
  )
}

export default CardWrapperShadow

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 4,
  },
  gradientBorder: {
    borderRadius: 22,
    paddingTop: 1.5,
    paddingBottom: 3
  },
});
