# Bucket List App

An app to keep track of and share bucket list items with friends.

- Mobile app built with React Native + Expo, backend with Supabase
- Create an account by signing up with email
- Add your friends to track you activities together
- Add bucket list activities and check them off as you complete them

## Downloads

Download the .apk or .ipa package from the latest release (TBD)

## Local development build

Set up the `.env` file in the root directory with EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY

If `expo-dev-client` is installed,

- To run the prebuild: `npm run prebuild`
- Make sure the sdk location is specified in android/local.properties
  - `sdk.dir=YOUR_FILE_DIRECTORY_HERE`
- To run the app: `npm run android`
