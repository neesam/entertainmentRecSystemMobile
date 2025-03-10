import { StyleSheet } from 'react-native'

export const cardStyles = StyleSheet.create({
    contentName: {
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 5,
        color: '#333',
    },
    tableName: {
        fontSize: 18,
        color: '#555',
    },
    loadingText: {
        fontSize: 18,
        fontStyle: 'italic',
        color: '#888',
    },
    card: {
        alignItems: 'center'
    }
});

export const containerStyles = StyleSheet.create({
    screenContainer: {
        backgroundColor: 'tan',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    topLeftCornerContainer: {
        position: 'absolute',
        top: 10,
        left: 10,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10
    },
    topRightCornerContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10
    },
    cardContainer: {
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: 'gold',
        borderRadius: 10,
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,  // This will give it a slight shadow on Android
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20
    },
    getContentButtonContainer: {
        backgroundColor: 'blue',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'white',
        borderWidth: 3,
    },
    deleteContentButtonContainer: {
        backgroundColor: 'red',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'white',
        borderWidth: 3,
    },
    mainButtonsContainer: {
        flexDirection: 'row',
        gap: 10
    },
    setCurrentContentModalButtonsContainerContainer: {
        flexDirection: 'row',
        width: '100%',
        height: 'auto',
        justifyContent: 'space-around'
    },
    setCurrentContentModalButtonContainer: {
        borderWidth: .2,
        borderColor: 'black',
        borderRadius: 10,
        elevation: 5,
        padding: 10,
        width: 100,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    }
});

export const buttonStyles = StyleSheet.create({
    buttonText: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
    },
    setCurrentContentModalButton: {
        fontSize: 20
    }
});

export const modalStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
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
        bottom: 10,
        flex: 'row'
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