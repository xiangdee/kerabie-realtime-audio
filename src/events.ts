import KerabieRealtimeAudioModule from "./KerabieRealtimeAudioModule";

export type MicrophoneDataEvent = {
  data: Uint8Array;
};

export type VolumeLevelEvent = {
  data: number;
};

export type RecordingChangeEvent = {
  data: boolean;
};

export type AudioInterruptionEvent = {
  data: string;
};

export interface KerabieRealtimeAudioEventMap {
  onMicrophoneData: MicrophoneDataEvent;
  onInputVolumeLevelData: VolumeLevelEvent;
  onOutputVolumeLevelData: VolumeLevelEvent;
  onRecordingChange: RecordingChangeEvent;
  onAudioInterruption: AudioInterruptionEvent;
}

// These are useful for defining `useCallback` types inline
export type MicrophoneDataCallback = (event: MicrophoneDataEvent) => void;
export type VolumeLevelCallback = (event: VolumeLevelEvent) => void;
export type RecordingChangeCallback = (event: RecordingChangeEvent) => void;
export type AudioInterruptionCallback = (event: AudioInterruptionEvent) => void;

export function addKerabieRealtimeAudioEventListener<K extends keyof KerabieRealtimeAudioEventMap>(
  eventName: K,
  handler: (ev: KerabieRealtimeAudioEventMap[K]) => void,
) {
  return KerabieRealtimeAudioModule.addListener(eventName, handler);
}
