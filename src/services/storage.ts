import { storage } from '../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const uploadAudio = async (blob: Blob, userId: string, sessionId: string) => {
  const audioRef = ref(storage, `recordings/${userId}/${sessionId}.webm`);
  const snapshot = await uploadBytes(audioRef, blob);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
};
