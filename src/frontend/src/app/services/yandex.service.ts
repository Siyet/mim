import axios from 'axios';
import {YANDEX_API} from 'constants/index';

class YandexService {
  url: string;

  constructor() {
    this.url = 'https://geocode-maps.yandex.ru/1.x';
  }

  getByAddress(address: string) {
    return axios.get(`https://geocode-maps.yandex.ru/1.x/?apikey=${YANDEX_API.APIKEY}&format=json&geocode=${address}`)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }
}

export {
  YandexService,
};
