import { useState } from 'react';
import { View, StyleSheet, Pressable, Modal, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker'

import { Ionicons } from '@expo/vector-icons'

const DropdownForm = ({name, submitFunction, attributes}) => {
  // State to store selected dropdown value
  const [tablesModalVisible, setTablesModalVisible] = useState(false);
  const [selectedElement, setSelectedElement] = useState('album');

  const handleTablesModalOpen = () => {
    setTablesModalVisible(true);
  }

  const handleTablesModalClose = () => setTablesModalVisible(false);

  const handleOptionChange = (value) => {
    setSelectedElement(value)
  }

  const handleTableItemsModalOpen = async (type) => {

    if(table.includes('album') || table.includes('artist')) {
        try {
            const response = await fetch(`https://first-choice-porpoise.ngrok-free.app/api/all_from_selected_music_table/${table}`)
            const data = await response.json()
            setActiveTableEntries(data)
        } catch (error) {
            console.log(error)
        }
    } else if(table.includes('film')) {
        try {
            const response = await fetch(`https://first-choice-porpoise.ngrok-free.app/api/all_from_selected_film_table/${table}`)
            const data = await response.json()
            setActiveTableEntries(data)
        } catch (error) {
            console.log(error)
        }
    } else if(table.includes('anime') || table === 'shows') {
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
    setShowTableItemsModal(true)
  }

  return (
      <View>
        { name === 'list-sharp' ? (
          <View>

            <Pressable onPress={handleTablesModalOpen}>
              <Ionicons name={name} size={20}/>
            </Pressable>

            <Modal
            animationType="slide"
            transparent={true}
            visible={tablesModalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setTablesModalVisible(!tablesModalVisible);
            }}>
            <View style={modalStyles.centeredView}>
              <View style={modalStyles.modalView}>
                <Picker
                  style={{ height: 'auto', width: '100%' }}
                  selectedValue={selectedElement}
                  onValueChange={handleOptionChange}
                  >
                    {attributes.tables.map((item) => (
                      <Picker.Item label={item} value={item} />
                    ))}
                </Picker>
              <Pressable onPress={handleTablesModalClose}>
                <Text>
                  Close
                </Text>
              </Pressable>
              </View>
            </View>
          </Modal>
        </View>
        ) :
        <Pressable onPress={handleTablesModalOpen}>
            <Ionicons name={name} size={20}/>
        </Pressable>}
      </View>
  );
};

const styles = StyleSheet.create({

})

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
    position: 'absolute',
    bottom: 10
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});


export default DropdownForm;
