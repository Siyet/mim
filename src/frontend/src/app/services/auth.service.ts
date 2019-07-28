import {AppService} from 'services/app.service';

class AuthService extends AppService {
  constructor() {
    super('_session');
  }

  authorize(data: any) {
    return this.http.post(this.url, data)
      .then(this.handleResponse)
      .then((response: any) => {
        const {name, roles} = response;

        return {
          name,
          roles,
        };
      })
      .catch(this.handleError);
  }
}

export {
  AuthService,
};
