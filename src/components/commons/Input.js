import React from 'react';
import { TextInput } from 'react-native';
import Styles from '../../Styles';

const Input = ({ value, onChangeText, placeholder, secureTextEntry }) => {
  
  return (
    
      <TextInput 
        style={Styles.inputStyle}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        value={value}
        onChangeText={onChangeText}
        underlineColorAndroid='transparent'
      />
   
  );
};

export { Input };