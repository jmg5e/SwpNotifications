import jwtDecode from 'jwt-decode';

/* */
export const decodeToken = (token, decoder = jwtDecode) => {
  const decodedValue = decoder(token);
  return decodedValue;
};

// expiration should be Epoch timestamp in seconds
export const isExpired = (expiration) => {
  const currentTime = Date.now();
  return expiration * 1000 < currentTime;
};

export const tokenIsExpired = (token) => {
  const { exp } = decodeToken(token);
  return isExpired(exp);
};
