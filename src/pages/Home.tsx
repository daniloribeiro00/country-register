import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View, Text, FlatList, Keyboard } from 'react-native';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { DataCard } from '../components/DataCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IData {
	id: string;
	countryCode: string;
	countryName: string;
}

export const Home = () => {
	let listViewRef: any;
	const [countryCode, setCountryCode] = useState('');
	const [countryName, setCountryName] = useState('');
	const [data, setData] = useState<IData[]>([]);
	const [errorMessage, setErrorMessage] = useState(false);

	useEffect(() => {
		const loadData = async () => {
			const storedData = await AsyncStorage.getItem('@countryRegister:data');
			if (storedData) {
				setData(JSON.parse(storedData));
			}
		};
		loadData();
	}, []);

	useEffect(() => {
		const saveData = async () => {
			await AsyncStorage.setItem('@countryRegister:data', JSON.stringify(data));
		};
		saveData();
	}, [data]);

	const handleSubmit = () => {
		if (countryCode.trim() === '' || countryName.trim() === '') {
			setErrorMessage(true);
			setTimeout(() => {
				setErrorMessage(false);
			}, 5000);
		} else {
			setErrorMessage(false);
			const newData = {
				id: String(new Date().getTime()),
				countryCode: countryCode.trim(),
				countryName: countryName.trim(),
			};
			setData([...data, newData]);
			setCountryCode('');
			setCountryName('');
			Keyboard.dismiss();
		}
	};

	const handleScroll = () => {
		listViewRef.scrollToEnd();
	};

	useEffect(() => {
		let timer1 = setTimeout(() => {
			handleScroll();
		}, 80);
		return () => clearTimeout(timer1);
	}, [data]);

	const handleDelete = (id: string) => {
		setData(data.filter(el => el.id !== id));
	};

	const handleDeleteAll = () => {
		setData([]);
	};

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={styles.container}>
				<View style={styles.titleBox}>
					<Text style={styles.title}>Country Register 🌎</Text>
				</View>
				<View style={styles.form}>
					<Input
						error={errorMessage}
						placeholder='Código do País'
						placeholderTextColor='#555'
						autoCapitalize='sentences'
						blurOnSubmit={true}
						value={countryCode}
						onChangeText={value => {
							setCountryCode(value);
							setErrorMessage(false);
						}}
						keyboardType='phone-pad'
					/>
					<Input
						error={errorMessage}
						placeholder='Nome do País'
						placeholderTextColor='#555'
						autoCapitalize='sentences'
						blurOnSubmit={true}
						value={countryName}
						onChangeText={value => {
							setCountryName(value);
							setErrorMessage(false);
						}}
					/>
					<Button title='Cadastrar' error={errorMessage} onPress={handleSubmit} />
				</View>

				<View style={{ flex: 1 }}>
					<View style={styles.dataBox}>
						<Text style={styles.listTitle}>Países Cadastrados</Text>
					</View>
					<View style={{ flex: 1 }}>
						<FlatList
							ref={ref => {
								listViewRef = ref;
							}}
							style={{
								height: 'auto',
								marginBottom: 80,
							}}
							data={data}
							keyExtractor={item => item.id}
							renderItem={({ item }) => (
								<DataCard
									countryCode={item.countryCode}
									countryName={item.countryName}
									onPress={() => handleDelete(item.id)}
								/>
							)}
							showsVerticalScrollIndicator={false}
						/>
					</View>
				</View>
				<Button bottom={true} title='Apagar todos' bgColor='#fa0707' onPress={handleDeleteAll} />
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#eee',
		paddingTop: 60,
		paddingHorizontal: 20,
	},
	titleBox: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 10,
	},
	title: {
		color: '#212121',
		fontSize: 22,
		fontWeight: '800',
		textAlign: 'center',
	},
	form: {
		borderStyle: 'solid',
		borderBottomWidth: 1,
		borderBottomColor: '#2d2d30',
		paddingBottom: 20,
	},
	dataBox: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 10,
		marginTop: 15,
	},
	listTitle: {
		color: '#212121',
		fontSize: 18,
		fontWeight: '700',
		textAlign: 'center',
		marginBottom: 5,
	},
});
