import { useState } from 'react';
import { View, Text, AppState } from 'react-native';
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

    if (session) {
      const new_user = session.user.email?.split('@')[0];
      const { error: profileError } = await supabase
        .from('profiles')
        .update([{ id: session.user.id, username: new_user }]);

      if (profileError) {
        showAlert(String(profileError), 'error', false);
      }
    }

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

  async function handleResetPassword() {
    const getURL = () => {
      let url =
        process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
        process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
        'http://localhost:3000/';
      // Make sure to include `https://` when not localhost.
      url = url.startsWith('http') ? url : `https://${url}`;
      // Make sure to include a trailing `/`.
      url = url.endsWith('/update-password') ? url : `${url}/update-password`;
      return url;
    };

    if (email) {
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: getURL(),
      });
      showAlert('Check your email for a link to reset password', 'info', true);
    } else {
      showAlert('Enter your email in the first field first', 'info', true);
    }
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
        <Text onPress={handleResetPassword} className="m-2 my-4 py-2">
          Forgot password?
        </Text>
      </View>
    </>
  );
}

const styles = {
  buttonContainer: 'flex flex-row space-x-2 mt-2',
};
