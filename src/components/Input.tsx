import React from 'react';
import { StyleSheet, Platform, TextInput, TextInputProps } from 'react-native';

interface IInputProps extends TextInputProps {
	error?: boolean | false;
}

export const Input = ({ error, ...props }: IInputProps) => {
	return (
		<TextInput
			style={[styles.input, error && styles.inputError]}
			{...props}
		/>
	);
};

const styles = StyleSheet.create({
	input: {
		backgroundColor: '#fff',
		color: '#212121',
		fontSize: 15,
		height: 50,
		padding: Platform.OS === 'ios' ? 15 : 12,
		marginTop: 15,
		borderRadius: 10,
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: '#dedede',
	},
	inputError: {
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: '#fa0707',
	}
});
