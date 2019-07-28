import axios from 'axios';
import {COUCH_DB_API} from 'constants/index';

class AppService {
  public url: string;
  public http = axios.create({
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin': '*',
    },
  });

  constructor(url: string) {
    this.url = COUCH_DB_API.BASE_URL + url;
  }

  handleResponse(response: any) {
    if (response.status === 200) {
      return response.data;
    }

    return Promise.reject(response.data);
  }

  handleError(error: any) {
    if (error.response && error.response.status === 500) {
      throw new Error('Ошибка сервера');
    }

    if (error.response && error.response.status === 401) {
      return Promise.reject('Неправильный логин или пароль');
    }

    return Promise.reject(error);
  }
}

export {
  AppService,
};
