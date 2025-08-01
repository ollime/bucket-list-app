import { useState } from 'react';
import { View, AppState } from 'react-native';
import { useRouter } from 'expo-router';

import { showAlert } from 'utils/alert';
import { supabase } from 'utils/supabase';

import TextField from 'components/TextField';
import Button from 'components/Button';

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const router = useRouter();

  async function signInWithEmail() {
    // do not sign in if email or password is invalid
    if (!isEmailValid && !isPasswordValid) {
      showAlert('Invalid email or password', 'error', false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) showAlert(error.message, 'error', false);
    router.push('/account');
  }

  async function signUpWithEmail() {
    // do not sign up if email or password is invalid
    if (!isEmailValid && !isPasswordValid) {
      showAlert('Invalid email or password', 'error', false);
      return;
    }

    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) showAlert(error.message, 'error', false);
    if (!session)
      showAlert(
        'Please check your email inbox for verification',
        'info',
        false,
        'It may take a few minutes to arrive'
      );
    router.push('/account');
  }

  function validateEmail(value: string) {
    const regexp = /^[a-zA-Z0–9._%+-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,}$/;
    return value.match(regexp) != null;
  }

  function validatePassword(value: string) {
    // password must be at least 8 and at most 100 characters
    return value.length > 7 && value.length < 101;
  }

  return (
    <>
      <View>
        <TextField
          label="email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setIsEmailValid(validateEmail(text));
          }}
          placeholder="email@domain.com"
          isValid={isEmailValid}
          icon="email"></TextField>
        <TextField
          label="password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setIsPasswordValid(validatePassword(text));
          }}
          placeholder="password"
          isValid={isPasswordValid}
          icon="numbers"
          obfuscateText={true}></TextField>
        <View className={styles.buttonContainer}>
          <Button label="Sign in with email" callback={() => signInWithEmail()}></Button>
          <Button label="Sign up with email" callback={() => signUpWithEmail()}></Button>
        </View>
      </View>
    </>
  );
}

const styles = {
  buttonContainer: 'flex flex-row space-x-2 mt-2',
};
