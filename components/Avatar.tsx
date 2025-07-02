import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

import Button from './Button';

interface Props {
  size: number;
  url: string | null;
  onUpload: (filePath: string) => void;
}

export default function Avatar({ url, onUpload }: Props) {
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage.from('avatars').download(path);
      if (error) {
        throw error;
      }
      const fr = new FileReader();
      fr.readAsDataURL(data);
      fr.onload = () => {
        setAvatarUrl(fr.result as string);
      };
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error downloading image: ', error.message);
      }
    }
  }

  async function uploadAvatar() {
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
      const path = `${Date.now()}.${fileExt}`;
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
        alert(error.message);
      } else {
        throw error;
      }
    } finally {
      setUploading(false);
    }
  }

  async function removeAvatar(path: string) {
    const { data, error } = await supabase.storage.from('avatars').remove([path]);

    if (error) {
      throw error;
    }
  }

  return (
    <>
      <View>
        {avatarUrl ? (
          <Image
            source={{ uri: avatarUrl }}
            accessibilityLabel="Avatar"
            className="size-[50px] overflow-hidden rounded-full object-cover pt-0"></Image>
        ) : (
          <View className="size-[50px] rounded-full border-2 border-black bg-white"></View>
        )}

        <Button
          label={uploading ? 'Uploading...' : 'Upload avatar'}
          callback={uploadAvatar}
          disabled={uploading}></Button>
      </View>
    </>
  );
}
