import type { PermissionResponse } from "expo-modules-core";
import KerabieRealtimeAudioModule from "./KerabieRealtimeAudioModule";

export async function initialize() {
  return await KerabieRealtimeAudioModule.initialize();
}

export function playPCMData(audioData: Uint8Array) {
  return KerabieRealtimeAudioModule.playPCMData(audioData);
}

/** Drops audio that is queued and not yet heard, for when the customer speaks over the AI. */
export function clearPlayback() {
  return KerabieRealtimeAudioModule.clearPlayback();
}

export function bypassVoiceProcessing(bypass: boolean) {
  return KerabieRealtimeAudioModule.bypassVoiceProcessing(bypass);
}

export function toggleRecording(val: boolean): boolean {
  return KerabieRealtimeAudioModule.toggleRecording(val);
}

export function isRecording(): boolean {
  return KerabieRealtimeAudioModule.isRecording();
}

export function tearDown() {
  return KerabieRealtimeAudioModule.tearDown();
}

export function restart() {
  return KerabieRealtimeAudioModule.restart();
}

export async function getMicrophonePermissionsAsync(): Promise<PermissionResponse> {
  return KerabieRealtimeAudioModule.getMicrophonePermissionsAsync();
}

export async function requestMicrophonePermissionsAsync(): Promise<PermissionResponse> {
  return KerabieRealtimeAudioModule.requestMicrophonePermissionsAsync();
}

export function getMicrophoneModeIOS() {
  return KerabieRealtimeAudioModule.getMicrophoneModeIOS();
}

export function setMicrophoneModeIOS() {
  return KerabieRealtimeAudioModule.setMicrophoneModeIOS();
}
