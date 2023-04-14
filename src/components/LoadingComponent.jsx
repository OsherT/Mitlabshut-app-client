import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingComponent = () => {//מציג נטען כאשר הדף נטען
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="Grey" />
      <Text style={styles.text}>טוען...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 10,
  },
});

export default LoadingComponent;
