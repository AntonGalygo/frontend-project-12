const getAuthHeader = () => {
  const token = JSON.parse(localStorage.getItem('token'));
  if (token) {
    return {
      headers: { Authorization: `Bearer ${token}` },
    };
  }

  return {};
};

export default getAuthHeader;
