import { useEffect, useState } from 'react'
import { View } from "react-native";

import * as Haptics from 'expo-haptics';

// import { ToastContainer, toast } from 'react-toastify';

import { bookAnthologies } from '../helper/lists';
import { containerStyles } from '../Styles/Styles'
import randomColor from '../helper/randomColor';
import TopScreenFunctionality from './TopScreenFunctionality'
import MainButtons from './MainButtons'
import ContentCard from './ContentCard'
import { bookTables } from '../helper/lists';

const Book = () => {

    const [book, setBook] = useState('')
    const [bookID, setBookID] = useState('')
    const [backgroundColor, setBackgroundColor] = useState('')
    const [bookAndTableAvailable, setBookAndTableAvailable] = useState(true)
    const [whichTable, setWhichTable] = useState('')

    useEffect(() => {

    }, [book]);

    const getBook = async () => {

        // Function to fetch actual album

        const fetchAlbumFromWhichTable = async (whichTable) => {

            try {

                const response = await fetch(`https://first-choice-porpoise.ngrok-free.app/api/${whichTable}`)

                if (!response.ok) {
                    throw new Error(`Failed to fetch details for ${whichTable}`);
                }

                const data = await response.json()

                if (bookAnthologies.includes(data[0]['title'])) {
                    const getRandomInt = (min, max) => {
                        const minCeiled = Math.ceil(min);
                        const maxFloored = Math.floor(max);
                        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
                    }
                    setBookID(data[0]['id'])
                    setBook(data[0]['title'] + ' ' + getRandomInt(2, 5))
                } else {
                    setBookID(data[0]['id'])
                    setBook(data[0]['title'])
                }

                // Logic to change background on each button press

                const bgColor = randomColor()
                setBackgroundColor(bgColor)
            } catch (error) {
                console.log(error.message)
            } finally {
                setBookAndTableAvailable(true)
            }
        }

        // Function to retrieve specific table

        const fetchWhichTable = async () => {

            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

            setBookAndTableAvailable(false)

            const response = await fetch('https://first-choice-porpoise.ngrok-free.app/api/whichBookTable');

            if (!response.ok) {
                alert('why')
                throw new Error('Failed to fetch whichTable');
            }

            const data = await response.json()
            const fetchedTable = data[0]['title']

            setWhichTable(fetchedTable)

            if (data.length > 0) {
                fetchAlbumFromWhichTable(fetchedTable);
            }
        }

        fetchWhichTable();
    }

    const deleteBook = async () => {

        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

        try {

            const response = await fetch(`https://first-choice-porpoise.ngrok-free.app/api/book_toread/${bookID}`, {
                method: 'DELETE',
                headers: { 'Content-type': 'application/json' },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Delete failed: ${errorData.message || 'Unknown error'}`);
            }

            console.log(await response.json());
            console.log('Book deleted successfully.');
        } catch (error) {
            console.error('Error during deletion:', error.message);
        }

        // toast('Deleted book!', {
        //     autoClose: 2000,
        //     theme: "light",
        //     });

        getBook()
    };

    const addToQueue = async () => {

        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

        try {
            const response = await fetch(`https://first-choice-porpoise.ngrok-free.app/api/addBookToQueue/${book}`, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
            })

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Post failed: ${errorData.message || 'Unknown error'}`);
            }

            console.log(await response.json());
            console.log('Book added successfully.');
        } catch (error) {
            console.error('Error in API call', error);
        }

        // toast('Added to queue!', {
        //     autoClose: 2000,
        //     theme: "light",
        //     });
    }

    const getDataForSpecificEntry = async (title) => {
        try {
            const response = await fetch(`https://first-choice-porpoise.ngrok-free.app/api/specificBookEntry/${title}`)

            if (!response.ok) {
                const errorData = await response.json();
                console.log(errorData.message)
            }

            const data = await response.json()

            setBook(data[0]['title'])
            setBookID(data[0]['id'])
        } catch (error) {
            console.log(error.message)
        }
    }

    const getFromSpecificTable = async (specificTable) => {

        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

        const response = await fetch(`https://first-choice-porpoise.ngrok-free.app/api/${specificTable}`)

        console.log(response)

        if (!response.ok) {
            throw new Error(`Failed to fetch details for ${specificTable}`);
        }

        const data = await response.json()

        console.log(data)

        const bookVal = data[0]['title']
        const bookIDVal = data[0]['id']
        const bgColor = randomColor()

        setBook(bookVal)
        setBookID(bookIDVal)
        setWhichTable(specificTable)
        setBackgroundColor(bgColor)
    }

    const screenStyle = {
        backgroundColor: backgroundColor
    }

    return (
        <View style={[containerStyles.screenContainer, screenStyle]}>
            <TopScreenFunctionality
                containerStyles={containerStyles}
                addToQueue={addToQueue}
                type={'book'}
                tables={bookTables}
                getFromSpecificTable={getFromSpecificTable}
            />
            <ContentCard
                type={'book'}
                contentName={book}
                availability={bookAndTableAvailable}
                whichTable={'book_toread'}
                getDataForSpecificEntry={getDataForSpecificEntry}
            />
            <MainButtons
                getContent={getBook}
                deleteContent={deleteBook}
                type={'book'}
                availability={bookAndTableAvailable}
                contentName={book}
            />
        </View>
    )
}

export default Book