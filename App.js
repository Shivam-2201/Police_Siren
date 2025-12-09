import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#000" />
            <View style={styles.nav}>
                <Text style={styles.navTitle}>Police Siren</Text>
            </View>

            <View style={styles.center}>
                <TouchableOpacity
                    style={styles.playButton}
                    activeOpacity={0.8}
                    onPress={() => {
                        // TODO: play siren sound or navigate
                    }}
                >
                    <Text style={styles.playText}>Play</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000', // dark background
    },
    nav: {
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'rgba(255,255,255,0.06)',
        paddingTop: Platform.OS === 'android' ? 0 : 0,
    },
    navTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    playButton: {
        backgroundColor: '#1f2937',
        paddingVertical: 18,
        paddingHorizontal: 44,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 4,
    },
    playText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
    },
});