import { createPermissionHook } from "expo-modules-core";
import { useEffect, useSyncExternalStore } from "react";
import {
  getMicrophonePermissionsAsync,
  isRecording,
  requestMicrophonePermissionsAsync,
} from "./core";
import { KerabieRealtimeAudioEventMap, addKerabieRealtimeAudioEventListener } from "./events";

export const useMicrophonePermissions = createPermissionHook({
  getMethod: getMicrophonePermissionsAsync,
  requestMethod: requestMicrophonePermissionsAsync,
});

export function useIsRecording() {
  const subscribe = (cb: () => void) => {
    const sub = addKerabieRealtimeAudioEventListener("onRecordingChange", cb);
    return () => sub.remove();
  };
  const getSnapshot = () => isRecording();
  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function useKerabieRealtimeAudioEventListener<K extends keyof KerabieRealtimeAudioEventMap>(
  eventName: K,
  listener: (ev: KerabieRealtimeAudioEventMap[K]) => void,
) {
  useEffect(() => {
    const sub = addKerabieRealtimeAudioEventListener(eventName, listener);
    return () => sub.remove();
  }, [listener]);
}
