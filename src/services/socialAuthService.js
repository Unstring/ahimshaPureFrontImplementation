let googleAuthInitialized = false;
let appleAuthInitialized = false;

export const initGoogleAuth = () => {
  return new Promise((resolve, reject) => {
    console.log('Starting Google Auth initialization...');
    
    if (googleAuthInitialized) {
      console.log('Google Auth already initialized');
      resolve(google.accounts.oauth2);
      return;
    }

    try {
      console.log('Checking Google API availability...');
      if (!window.google) {
        throw new Error('Google API not loaded');
      }

      console.log('Creating token client...');
      const client = google.accounts.oauth2.initTokenClient({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        scope: 'email profile',
        callback: (response) => {
          console.log('Token client callback:', response);
          if (response.error) {
            reject(response);
          } else {
            resolve(response);
          }
        },
      });
      
      console.log('Token client created:', client);
      googleAuthInitialized = true;
      resolve(client);
    } catch (error) {
      console.error('Google Auth Init Error:', error);
      reject(new Error(`Failed to load Google Auth SDK: ${error.message}`));
    }
  });
};

export const initAppleAuth = () => {
  return new Promise((resolve, reject) => {
    if (appleAuthInitialized) {
      resolve(window.AppleID.auth);
      return;
    }

    try {
      window.AppleID.auth.init({
        clientId: import.meta.env.VITE_APPLE_CLIENT_ID,
        scope: 'name email',
        redirectURI: `${window.location.origin}/auth/callback`,
        state: 'origin:web',
        usePopup: true
      });
      appleAuthInitialized = true;
      resolve(window.AppleID.auth);
    } catch (error) {
      reject(new Error('Failed to initialize Apple Auth'));
    }
  });
}; 