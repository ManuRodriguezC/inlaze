interface User {
  username: string;
  email: string;
  password: string;
}

interface Login {
  username: string;
  password: string;
}

export const controlUser = async (url: string, userData: any, method: string) => {
    try {
      const options = {
        method: method,
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      };
  
      const response = await fetch(url, options);
      const responseData = await response.json();
      return {
        response: responseData,
        status: response.status
      };
    } catch (err) {
      return {
        response: err,
        status: 500
      };
  };
}

export const addUser = async (datas: User) => {
  const result = await controlUser('http://localhost:4000/createduser', datas, 'POST');
  return result
};

export const loginUser = async (datasLogin: Login) => {
  return await controlUser('http://localhost:4000/loginuser', datasLogin, 'POST')
}