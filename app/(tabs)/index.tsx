import { Audio } from 'expo-av';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const soundRef = useRef<Audio.Sound | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [scheduled, setScheduled] = useState(false);

  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      shouldDuckAndroid: false,
      playThroughEarpieceAndroid: false,
    }).catch(() => {});

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (soundRef.current) {
        soundRef.current.unloadAsync().catch(() => {});
        soundRef.current = null;
      }
    };
  }, []);

  const loadSiren = async () => {
    if (soundRef.current) return;
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/siren.mp3'),
        { shouldPlay: false, staysActiveInBackground: true }
      );
      soundRef.current = sound;
    } catch (e) {
      console.warn('Failed to load siren', e);
    }
  };

  const onPressPlay = async () => {
    if (scheduled) return;
    setScheduled(true);

    await loadSiren();

    timerRef.current = setTimeout(async () => {
      try {
        await soundRef.current?.replayAsync();
      } catch (e) {
        console.warn('Failed to play siren', e);
      } finally {
        setScheduled(false);
      }
    }, 10000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.title}>Police Siren</Text>

        <TouchableOpacity
          style={styles.playButton}
          onPress={onPressPlay}
          activeOpacity={0.8}
        >
          <Text style={styles.playText}>{scheduled ? 'Scheduled...' : 'Play'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  hero: {
    flex: 1,
    paddingTop: 56,         // pushes hero content below any top UI
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 36,       // spacing between heading and CTA
  },
  playButton: {
    backgroundColor: '#1f2937',
    paddingVertical: 18,
    paddingHorizontal: 44,
    borderRadius: 12,
  },
  playText: { color: '#fff', fontSize: 20, fontWeight: '700' },
});
