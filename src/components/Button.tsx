import React from 'react';
import {
	StyleSheet,
	Platform,
	TouchableOpacity,
	TouchableOpacityProps,
	View,
	Text,
} from 'react-native';

interface IButtonProps extends TouchableOpacityProps {
	title: string;
	error?: boolean | false;
	bgColor?: string;
	bottom?: boolean;
}

export const Button = ({ title, error, bgColor, bottom, ...props }: IButtonProps) => {
	return (
		<View style={bottom && styles(bgColor, bottom).buttonBottom}>
			<TouchableOpacity
				style={[
					styles(bgColor, bottom).button,
					error
						? styles(bgColor, bottom).buttonBackgroundError
						: styles(bgColor, bottom).buttonBackground,
				]}
				activeOpacity={0.7}
				{...props}
			>
				<Text style={styles(bgColor, bottom).buttonText}>
					{error ? 'Todos os campos são obrigatórios!' : title}
				</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = (bgColor = '#1b5cd4', bottom = false) =>
	StyleSheet.create({
		button: {
			padding: bottom === true ? 10 : Platform.OS === 'ios' ? 15 : 12,
			borderRadius: 10,
			alignItems: 'center',
			justifyContent: 'center',
			marginTop: 15,
			height: bottom === true ? 'auto' : 50,
		},
		buttonBottom: {
			backgroundColor: '#eee',
			position: 'absolute',
			bottom: 0,
			left: 0,
			right: 0,
			marginHorizontal: 20,
			height: 80,
		},
		buttonBackground: {
			backgroundColor: bgColor,
		},
		buttonBackgroundError: {
			backgroundColor: '#fa0707',
		},
		buttonText: {
			color: '#fff',
			fontSize: bottom === true ? 10 : 15,
			fontWeight: 'bold',
		},
	});
