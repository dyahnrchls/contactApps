// Button.test.tsx
import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react-native';
import {Button} from '../src/components/Button/Button';

describe('Button', () => {
  it('renders correctly', () => {
    const onPressMock = jest.fn();
    render(
      <Button onPress={onPressMock} disabled={false} title="Test Button" />,
    );

    const buttonElement = screen.getByText('Test Button');
    expect(buttonElement).toBeTruthy();
  });

  it('calls onPress handler when clicked', () => {
    const onPressMock = jest.fn();
    render(
      <Button onPress={onPressMock} disabled={false} title="Test Button" />,
    );

    const buttonElement = screen.getByText('Test Button');
    fireEvent.press(buttonElement);

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('renders disabled style when disabled is true', () => {
    render(<Button onPress={() => {}} disabled={true} title="Test Button" />);

    const buttonElement = screen.getByText('Test Button');
    expect(buttonElement.props.style).toEqual({color: '#B5C0D0', fontSize: 16});
  });

  it('applies custom style to TouchableOpacity when provided', async () => {
    const customStyle = {backgroundColor: 'red', opacity: 1};
    render(
      <Button
        onPress={() => {}}
        disabled={false}
        title="Test Button"
        style={customStyle}
        testID="buttonTest"
      />,
    );

    const buttonWrapper = await screen.findByTestId('buttonTest');
    expect(buttonWrapper.props.style).toEqual(customStyle);
  });
});
