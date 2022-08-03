const useRequest = () => {
  const request = async (url, method, body, headers) => {
    const data = await fetch(url, {
      method: method,
      body: body,
      headers: headers,
    });

    return data;
  };

  return request;
};

export default useRequest;
