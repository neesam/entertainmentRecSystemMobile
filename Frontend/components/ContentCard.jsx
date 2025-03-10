import { View, Text, Pressable, Modal, Linking, TouchableOpacity } from 'react-native'
import { useState, useEffect } from 'react'

import * as Haptics from 'expo-haptics';
import { Picker } from "@react-native-picker/picker";

import { containerStyles, cardStyles, modalStyles, buttonStyles } from '../Styles/AlbumStyles.jsx'

const ContentCard = ({ whichTable, availability, contentName, type, setEntry }) => {

    const [currentTableItemsModalVisible, setActiveTableItemsModalVisible] = useState(false)
    const [selectedElement, setSelectedElement] = useState('');
    const [activeTableEntries, setActiveTableEntries] = useState([])

    useEffect(() => {

    }, [availability, activeTableEntries])

    const handleCurrentTableItemsModalClose = () => {
        setActiveTableItemsModalVisible(false)
    }

    const handleOptionChange = (value) => {
        setSelectedElement(value)
    }

    const handlePopulateTableItemsModal = async (table) => {

        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

        if (table.includes('album') || table.includes('artist')) {
            try {
                const response = await fetch(`https://first-choice-porpoise.ngrok-free.app/api/all_from_selected_music_table/${table}`)
                const data = await response.json()
                setActiveTableEntries(data)
                console.log(activeTableEntries)
            } catch (error) {
                console.log(error)
            }
        } else if (table.includes('film')) {
            try {
                const response = await fetch(`https://first-choice-porpoise.ngrok-free.app/api/all_from_selected_film_table/${table}`)
                const data = await response.json()
                setActiveTableEntries(data)
            } catch (error) {
                console.log(error)
            }
        } else if (table.includes('anime') || table === 'shows') {
            try {
                const response = await fetch(`https://first-choice-porpoise.ngrok-free.app/api/all_from_selected_shows_table/${table}`)
                const data = await response.json()
                setActiveTableEntries(data)
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const response = await fetch(`https://first-choice-porpoise.ngrok-free.app/api/all_from_selected_book_table/${table}`)
                const data = await response.json()
                setActiveTableEntries(data)
            } catch (error) {
                console.log(error)
            }
        }
        setActiveTableItemsModalVisible(true)
    }

    const handleSetCurrentContent = (value) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        setEntry(value)
        handleCurrentTableItemsModalClose()
    }

    const openSpotify = () => {

        const encodedQuery = encodeURIComponent(contentName);
        const spotifyWebUrl = `https://open.spotify.com/search/${encodedQuery}`;

        // Open the Spotify app or redirect to Spotify on the web if app is not installed
        Linking.openURL(spotifyWebUrl).catch((err) => {
            console.error('Failed to open Spotify:', err);
            // If Spotify is not installed, open Spotify in the browser
            Linking.openURL(`https://open.spotify.com/search/${encodeURIComponent(searchQuery)}`);
        });
    };

    const openGoogle = () => {

        const encodedQuery = encodeURIComponent(contentName + ' ' + type);
        const googleUrl = `https://www.google.com/search?q=${encodedQuery}`;

        Linking.openURL(googleUrl).catch((err) => {
            console.error('Failed to open Google:', err);
            // If Spotify is not installed, open Spotify in the browser
        });
    };

    return (
        <View style={containerStyles.cardContainer}>
            {availability ? (
                <View style={cardStyles.card}>
                    {type === 'album' ? (
                        <Text onPress={openSpotify} style={cardStyles.contentName}>
                            {contentName}
                        </Text>
                    ) : (
                        <Text onPress={openGoogle} style={cardStyles.contentName}>
                            {contentName}
                        </Text>
                    )}
                    {type !== 'book' ? (
                        <TouchableOpacity onPress={() => handlePopulateTableItemsModal(whichTable)}>
                            <Text style={cardStyles.tableName}>
                                {whichTable}
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        <></>
                    )}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={currentTableItemsModalVisible}
                        onRequestClose={() => {
                            alert('Modal has been closed.');
                            setActiveTableItemsModalVisible(!currentTableItemsModalVisible);
                        }}>
                        <View style={modalStyles.centeredView}>
                            <View style={modalStyles.modalView}>
                                <Picker
                                    itemStyle={{ color: 'black' }}
                                    style={{ height: 'auto', width: '100%' }}
                                    selectedValue={selectedElement ? selectedElement : ''}
                                    onValueChange={handleOptionChange}
                                >
                                    {activeTableEntries.some(obj => obj.hasOwnProperty('title')) ? (
                                        activeTableEntries.map((item) => (
                                            <Picker.Item key={item.id} label={item.title} value={item.title} />
                                        ))
                                    ) : (
                                        activeTableEntries.map((item) => (
                                            <Picker.Item key={item.id} label={item.link} value={item.link} />
                                        ))
                                    )}
                                </Picker>
                                <View style={containerStyles.setCurrentContentModalButtonsContainerContainer}>
                                    <Pressable style={containerStyles.setCurrentContentModalButtonContainer} onPress={() => handleSetCurrentContent(selectedElement)}>
                                        <Text style={buttonStyles.setCurrentContentModalButton}>
                                            Set
                                        </Text>
                                    </Pressable>
                                    <Pressable style={containerStyles.setCurrentContentModalButtonContainer} onPress={handleCurrentTableItemsModalClose}>
                                        <Text style={buttonStyles.setCurrentContentModalButton}>
                                            Close
                                        </Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            ) :
                <>
                    <Text style={cardStyles.loadingText}>
                        Getting info...
                    </Text>
                </>}
        </View>
    )
}

export default ContentCard