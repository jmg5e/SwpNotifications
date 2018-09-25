
export const getEllapsedMinutes = (createdAt) => {
  const ellapsedMilliseconds = Date.now() - new Date(createdAt);
  return Math.floor(ellapsedMilliseconds / 1000 / 60);
};

export const setRequestsEllapsedTime = requests => requests.map(request => ({
  ...request,
  ellapsedTime: getEllapsedMinutes(request.createdAt),
}));
