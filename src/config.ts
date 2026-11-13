export const config = {
  authEndpoint: 'http://localhost:4000',
  topic: '',
  userName: 'React user',
  sessionPassword: '',
  // Default form selection: 0 = participant, 1 = host. The auth endpoint signs the selected role into the JWT.
  role: 1 as 0 | 1,
  webEndpoint: 'zoom.us',
};
