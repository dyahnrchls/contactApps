import {ReactNode} from 'react';
import React, {StyleSheet, Text, View} from 'react-native';

export interface CallLogProps {
  icon: ReactNode;
  title: string;
  date: string;
  testID?: string;
}

export const CallLog = ({icon, title, date, testID}: CallLogProps) => {
  return (
    <View style={styles.callLog} testID={testID}>
      <View style={styles.logInfo} {...(testID && {testID: `${testID}-info`})}>
        {icon && (
          <View {...(testID && {testID: `${testID}-info-icon`})}>{icon}</View>
        )}
        <Text>{title}</Text>
      </View>

      <Text>{date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  callLog: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    fontSize: 12,
  },
  logInfo: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
});
