import {AppService} from 'services/app.service';

class ElevatorService extends AppService {
  constructor() {
    super('');
  }

  getOne(point: string) {
    return this.http.get(`${this.url}/${point}`)
      .then(this.handleResponse)
      .catch(this.handleError);
  }
}

export {
  ElevatorService,
};
