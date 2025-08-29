import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Colors } from '@/constants/Colors';
import { Entypo } from '@expo/vector-icons';
import { GlobalStateContext } from '@/app/globalcontext';

const data = [
  { label: 'The Host', value: 'The Host' },
  // { label: 'Just a Chill Guy', value: 'Just a Chill Guy' },
   { label: 'Influencer', value: 'Influencer' },
  // { label: 'Crypto Bro', value: 'Crypto Bro' },
  // { label: 'The President', value: 'The President' }

];

const DropdownComponent = () => {
  const { globalState, setGlobalState } = useContext(GlobalStateContext);


  const host = globalState.host
  const [value, setValue] = useState(host);
  const [isFocus, setIsFocus] = useState(false);


  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: '#990FB3' }]}>
          Host
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: '#990FB3' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select item' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
          setGlobalState({host: item.value })
        }}
        renderLeftIcon={() => (
          <Entypo
            style={styles.icon}
            color={isFocus ? '#990FB3' : Colors.dark.text}
            name="modern-mic"
            size={20}
          />
        )}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.background,
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 50
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: Colors.dark.background,
    color: Colors.dark.text,
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: Colors.dark.text
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});