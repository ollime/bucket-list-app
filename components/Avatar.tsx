import { useState, useEffect } from 'react';
import { View, Image } from 'react-native';

import { downloadImage, uploadAvatar, removeAvatar } from 'api/profiles-api';
import Button from './Button';

interface Props {
  size: number;
  url: string | null;
  onUpload: (filePath: string) => void;
  userId: string;
}

export default function Avatar({ url, onUpload, userId }: Props) {
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    async function downloadUrl() {
      if (url) {
        const newUrl = (await downloadImage(url)) as unknown as string;
        setAvatarUrl(newUrl);
      }
    }
    downloadUrl();
  }, [url]);

  return (
    <>
      <View>
        {avatarUrl ? (
          <Image
            source={{ uri: avatarUrl }}
            accessibilityLabel="Avatar"
            className={styles.itemImage}></Image>
        ) : (
          <View className={`${styles.itemImage} ${styles.blankImage}`}></View>
        )}

        <View className={styles.buttonContainer}>
          <Button
            label={uploading ? 'Uploading...' : 'Upload avatar'}
            callback={() => {
              if (avatarUrl) uploadAvatar(userId, avatarUrl, onUpload, setUploading);
            }}
            disabled={uploading}></Button>
          <Button
            label="Delete avatar"
            callback={
              avatarUrl
                ? () => {
                    removeAvatar(avatarUrl ?? '');
                    setAvatarUrl('');
                    onUpload('');
                  }
                : () => {}
            }
            disabled={!avatarUrl}></Button>
        </View>
      </View>
    </>
  );
}

const styles = {
  itemImage: 'size-[50px] overflow-hidden rounded-full object-cover pt-0',
  blankImage: 'border-2 border-black bg-white',
  buttonContainer: 'flex flex-row',
};
