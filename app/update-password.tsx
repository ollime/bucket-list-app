import { useState } from 'react';
import { Text } from 'react-native';
import Container from 'components/Container';

import { supabase } from 'utils/supabase';
import { showAlert } from 'utils/alert';
import TextField from 'components/TextField';
import Button from 'components/Button';
import { useRouter } from 'expo-router';

export default function UpdatePassword() {
  const router = useRouter();
  const [password, setPassword] = useState<string>('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  async function handleUpdatePassword() {
    if (isPasswordValid) {
      await supabase.auth.updateUser({ password: password });
      showAlert('Password updated', 'success', true);
      router.replace('/home');
    } else {
      showAlert('Password must be between 8 and 100 characters', 'info', true);
    }
  }

  function validatePassword(value: string) {
    // password must be at least 8 and at most 100 characters
    return value.length > 7 && value.length < 101;
  }

  return (
    <>
      <Container>
        <Text className={styles.title}>Reset password</Text>
        <TextField
          label="password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setIsPasswordValid(validatePassword(text));
          }}
          placeholder="new password"
          isValid={isPasswordValid}
          icon="numbers"
          obfuscateText={true}></TextField>
        <Button label="Reset password" callback={() => handleUpdatePassword()}></Button>
      </Container>
    </>
  );
}

const styles = {
  title: 'text-3xl font-bold text-primary',
};
