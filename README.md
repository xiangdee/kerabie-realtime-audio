# @kerabie/realtime-audio

Live two-way audio for Expo and React Native: the microphone streams to JavaScript as PCM16 16 kHz mono with echo cancelling and noise suppression, and PCM16 16 kHz chunks play back with low latency. It is what the Kerabie voice orb (`react-native-kerabie-helpdesk/voice`) uses, and it can be used on its own for any voice AI.

Based on [expo-two-way-audio](https://github.com/speechmatics/expo-two-way-audio) by Speechmatics (MIT), rebuilt for current Expo: no removed Objective-C helpers, so it builds on Expo SDK 54 and later without patches, and it adds `clearPlayback()`.

- iOS: `AVAudioEngine` with voice processing (system echo cancelling).
- Android: `AudioRecord` with the `VOICE_COMMUNICATION` source, `AcousticEchoCanceler` and `NoiseSuppressor`.

```sh
npx expo install @kerabie/realtime-audio
```

Add the microphone description (iOS) and make a new build; Android needs no setup (`RECORD_AUDIO` is requested at run time).

```json
{ "expo": { "ios": { "infoPlist": { "NSMicrophoneUsageDescription": "Used to talk to the assistant" } } } }
```

```ts
import {
  initialize, toggleRecording, playPCMData, clearPlayback, tearDown,
  requestMicrophonePermissionsAsync, addKerabieRealtimeAudioEventListener,
} from '@kerabie/realtime-audio';

await requestMicrophonePermissionsAsync();
await initialize();
addKerabieRealtimeAudioEventListener('onMicrophoneData', ({ data }) => send(data)); // Uint8Array, PCM16 16 kHz
toggleRecording(true);
playPCMData(chunk);   // PCM16 16 kHz
clearPlayback();      // the customer spoke over the AI: drop what is queued
tearDown();
```

Events: `onMicrophoneData`, `onInputVolumeLevelData`, `onOutputVolumeLevelData` (0 to 1), `onRecordingChange`, `onAudioInterruption`. Echo cancelling does not work on a simulator: test on a real device.
