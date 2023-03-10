import React from 'react';
import { View, Text } from 'react-native';

const ProfileNumbers = ({ followers, posts }) => {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
      <View style={{ alignItems: 'center', marginHorizontal: 10 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{posts}</Text>
        <Text style={{ fontSize: 14 }}>פריטים</Text>
      </View>
      <Text style={{ fontSize: 20, color: 'gray', marginHorizontal: 10 }}>| </Text>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{followers ? followers : "0"}</Text>
        <Text style={{ fontSize: 14 }}>עוקבות</Text>
      </View>
    </View>
  );
};

export default ProfileNumbers;
