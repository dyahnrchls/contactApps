import React, {StyleSheet, Text, TouchableOpacity} from 'react-native';

export interface ButtonProps {
  onPress:
    | (((event: React.GestureResponderEvent) => void) & (() => void))
    | undefined;
  disabled: boolean;
  title: string;
  style?: React.StyleProp<React.TextStyle>;
  testID?: string;
}

export const Button = ({
  onPress,
  disabled,
  title,
  style,
  testID,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={style}
      testID={testID}>
      <Text style={disabled ? styles.buttonDisable : styles.button}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    color: '#2C7865',
    fontSize: 16,
  },
  buttonDisable: {
    color: '#B5C0D0',
    fontSize: 16,
  },
});
