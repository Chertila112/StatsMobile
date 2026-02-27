import { View, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'

interface CardWrapperShadowProps {
  children: React.ReactNode;
  radius?: number;
}

function CardWrapperShadow({ radius, children }: CardWrapperShadowProps) {
  const styles = StyleSheet.create({
    wrapper: {
      width: '100%',
      marginVertical: 4,
    },
    gradientBorder: {
      borderRadius: !radius ? 22 : radius,
      paddingTop: 1.5,
      paddingBottom: 3
    },
  });

  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={[
          'rgba(255, 255, 255, 0.20)',
          'rgba(255, 255, 255, 0)',
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

