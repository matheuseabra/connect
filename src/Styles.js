import { StyleSheet } from 'react-native';

const grey = '#777';

export default StyleSheet.create({
    xLargeTextStyle: {
        fontFamily: 'Ubuntu',
        fontSize: 48,
        fontWeight: 'bold',
        color: '#ffff'
    },
    largeTextStyle: {
        fontFamily: 'Ubuntu',
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ffff'
    },
    mediumTextStyle: {
        fontFamily: 'Ubuntu',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffff'
    },
    smallTextStyle: {
        fontFamily: 'Ubuntu',
        fontSize: 12,
        fontWeight: 'bold',
        color: '#ffff'
    },
    inputStyle: {
        backgroundColor: '#ffff',
        paddingLeft: 20,
        fontSize: 18,
        fontFamily: 'Ubuntu',
        flex: 1,
        borderColor: grey,
        borderWidth: 2,
        borderRadius: 5
    },
    containerStyle: {
        padding: 10,
        paddingRight: 40,
        paddingLeft: 40,
        justifyContent: 'center',
        flexDirection: 'row',
        position: 'relative'
    },
    cardStyle: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 25
    },
    btnConfirm: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#2BA3DA',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#2BA3DA',
        elevation: 4
    },
    btnCancel: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#CC2820',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#CC2820',
        elevation: 4
    },
    btnBack: {
        width: 50,
        height: 50,
        backgroundColor: "#CC2820",
        borderRadius: 5,
        elevation: 4,
        alignSelf: 'flex-start'
    },
    btnBackTextStyle: {
        fontFamily: 'Ubuntu',
        fontSize: 40,
        fontWeight: '800',
        alignSelf: 'center',
        color: '#fff'
    },
    btnTextStyle: {
        fontFamily: 'Ubuntu',
        fontSize: 24,
        fontWeight: '600',
        alignSelf: 'center',
        color: '#fff',
        paddingTop: 10,
        paddingBottom: 10
    },
    spinnerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    scrollViewStyle: {
        height: '100%'
    }
});
