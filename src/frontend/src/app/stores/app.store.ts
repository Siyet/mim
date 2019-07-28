import {action, observable} from 'mobx';

class AppStore {
  @observable elevator = null;
  @observable elevatorInMap = null;
  @observable elevatorWithError = null;

  @action getElevator = (data) => {
    this.elevator = data;
  }

  @action getElevatorInMap = (data) => {
    this.elevatorInMap = data;
  }

  @action setElevatorWithError = (data) => {
    this.elevatorWithError = data;
  }
}

export {
  AppStore,
};
