import React from 'react';
import {
	StyleSheet,
	Platform,
	TouchableOpacity,
	TouchableOpacityProps,
	View,
	Text,
} from 'react-native';

interface IDataCardProps extends TouchableOpacityProps {
	countryCode: string;
	countryName: string;
}

export const DataCard = ({ countryCode, countryName, ...props }: IDataCardProps) => {
	return (
		<TouchableOpacity style={styles.button} activeOpacity={0.7} {...props}>
			<Text style={styles.textCode}>{countryCode}</Text>
			<Text style={styles.textName}>{countryName}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: '#fff',
		padding: Platform.OS === 'ios' ? 15 : 12,
		borderRadius: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 15,
		minHeight: 60,
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: '#dedede',
	},
	textCode: {
		color: '#212121',
		fontSize: 14,
		width: '20%',
	},
	textName: {
		color: '#212121',
		fontSize: 20,
		fontWeight: 'bold',
		width: '80%',
	},
});
