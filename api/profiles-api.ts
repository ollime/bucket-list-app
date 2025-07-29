import { supabase } from 'utils/supabase';
import { Session } from '@supabase/supabase-js';
import { showAlert } from 'utils/alert';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

export async function getUsername(session?: Session) {
  try {
    if (!session?.user) throw new Error('No user on the session!');

    const { data, error, status } = await supabase
      .from('profiles')
      .select(`username`)
      .eq('id', session?.user.id)
      .single();

    if (error && status !== 406) {
      throw error;
    }

    if (data) {
      return data.username;
    }
  } catch (error) {
    if (error instanceof Error) {
      showAlert(error.message, 'error', false);
    }
  }
}

export async function getAllUsers() {
  const { data: users, error } = await supabase
    .from('profiles')
    .select(`username, avatar_url`)
    .eq('is_public', true);

  if (error) {
    showAlert(error.message, 'error', false);
    return;
  }
  return users;
}

export async function downloadImage(path: string) {
  try {
    const { data, error } = await supabase.storage.from('avatars').download(path);
    if (error) {
      throw error;
    }

    return await new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.readAsDataURL(data);
      fr.onload = () => resolve(fr.result as string);
      fr.onerror = () => reject(fr.error);
    });
  } catch (error) {
    if (error instanceof Error) {
      showAlert(`Error downloading image: ${error.message}`, 'error', false);
    }
  }
}

export async function uploadAvatar(
  userId: string,
  url: string,
  onUpload: (filepath: string) => void,
  setUploading: (isLoading: boolean) => void
) {
  if (url) removeAvatar(url);
  try {
    setUploading(true);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Restrict to only images
      allowsMultipleSelection: false, // Can only select one image
      allowsEditing: true, // Allows the user to crop / rotate their photo before uploading it
      quality: 1,
      exif: false,
    });
    if (result.canceled || !result.assets || result.assets.length === 0) {
      console.log('User cancelled image picker.');
      return;
    }
    const image = result.assets[0];
    console.log('Got image', image);
    if (!image.uri) {
      throw new Error('No image uri!');
    }

    const manipResult = await ImageManipulator.manipulateAsync(
      image.uri,
      [{ resize: { width: 50, height: 50 } }],
      { format: ImageManipulator.SaveFormat.JPEG, compress: 0.5 }
    );

    const arraybuffer = await fetch(manipResult.uri).then((res) => res.arrayBuffer());
    const fileExt = manipResult.uri?.split('.').pop()?.toLowerCase() ?? 'jpeg';
    const fileName = `${Date.now()}.${fileExt}`;
    const path = `${userId}/${fileName}`;
    const { data, error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(path, arraybuffer, {
        contentType: image.mimeType ?? 'image/jpeg',
      });
    if (uploadError) {
      throw uploadError;
    }
    onUpload(data.path);
  } catch (error) {
    if (error instanceof Error) {
      showAlert(error.message, 'error', false);
    } else {
      throw error;
    }
  } finally {
    setUploading(false);
  }
}

export async function removeAvatar(path: string) {
  const { data, error } = await supabase.storage.from('avatars').remove([path]);

  if (error) {
    throw error;
  }
}
