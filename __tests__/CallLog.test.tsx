// CallLog.test.tsx
import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {CallLog} from '../src/components/CallLog/CallLog';

describe('CallLog', () => {
  it('renders icon, title, and date correctly', () => {
    const icon = <svg />; // Mock icon
    const title = 'Incoming Call';
    const date = '2022-04-06';

    render(<CallLog icon={icon} title={title} date={date} testID="callLog" />);

    // Assert icon, title, and date are rendered
    expect(screen.getByTestId('callLog-info-icon')).toBeTruthy();
    expect(screen.getByText(title)).toBeTruthy();
    expect(screen.getByText(date)).toBeTruthy();
  });

  it('renders call log with correct styles', () => {
    const icon = <svg />; // Mock icon
    const title = 'Incoming Call';
    const date = '2022-04-06';

    render(<CallLog icon={icon} title={title} date={date} testID="callLog" />);

    // Assert call log styles
    const callLog = screen.getByTestId('callLog');
    expect(callLog.props.style).toEqual({
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 8,
      fontSize: 12,
    });

    const logInfo = screen.getByTestId('callLog-info');
    expect(logInfo.props.style).toEqual({
      display: 'flex',
      flexDirection: 'row',
      gap: 16,
      alignItems: 'center',
    });
  });
});
