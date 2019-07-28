import React, {PureComponent} from 'react';
import axios from 'axios';

import './Registry.less';
import {BaseLayout} from 'components/BaseLayout';
import {BaseLayoutHeader} from 'components/BaseLayoutHeader';
import {Empty, Spin} from 'antd';
import {inject, observer} from 'mobx-react';
import {AppStore} from 'stores/app.store';
import {toJS} from 'mobx';

interface IProps {
  appStore: AppStore;
}

@inject('appStore')
@observer
class Registry extends PureComponent<IProps, {}> {
  state = {
    data: [],
    loading: false,
  };

  selectElevator = (data) => () => {
    this.props.appStore.getElevator(data);
  }

  getElevators = () => {
    this.setState({
      loading: true,
    });

    axios.get(`http://95.214.63.201:5984/lifts2/_all_docs?include_docs=true`)
      .then((res) => {
        const rows = res.data.rows;

        this.setState({
          data: rows.filter((row) => row.doc.address && row.doc.address !== 'null'),
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);

        this.setState({
          loading: false,
        });
      });
  }

  getStatus = (type) => {
    switch (type) {
      case 'SUCCESS': {
        return 'success';
      }
      case 'WARNING': {
        return 'warning';
      }
      case 'ERROR': {
        return 'error';
      }
      default: {
        return 'success';
      }
    }
  }

  search = (value: string) => {
    console.log(value);
  }

  componentDidMount() {
    this.getElevators();
  }

  render() {
    let {data} = this.state;
    const {elevatorWithError} = this.props.appStore;

    if (elevatorWithError) {
      const elevator: any = toJS(elevatorWithError);

      const id = elevator!.doc.parent._id;

      const tt: any[] = data.filter((item: any) => item.doc).filter((item: any) => item.doc._id === id);

      if (tt[0]) {
        tt[0].doc.error = elevator.doc.error;

        data = [...tt, ...data.filter((item: any) => item.doc).filter((item: any) => item.doc._id !== id)] as any;
      }
    }

    return(
      <BaseLayout>
        <BaseLayoutHeader search={this.search}/>
        <div className="list">
          <div className="list-headers">
            <div className="list-header" style={{width: '40%'}}>Адрес</div>
            <div className="list-header" style={{width: '18%'}}>Тип</div>
            <div className="list-header" style={{width: '15%'}}>Модель</div>
            <div className="list-header" style={{width: '12%'}}>Груз</div>
            <div className="list-header p40" style={{width: '15%'}}>Состояние</div>
          </div>
          {
            <div className="list-items">
              <Spin spinning={false}>
              {
                data.length ? data.map((item: any) => {
                  const {doc: {_id, address, type, maxsteps, error}} = item;
                  const time = 60000 - maxsteps;

                  return (
                    <div className="list-items-block" key={_id} onClick={this.selectElevator(item.doc)}>
                      <div className="list-item" style={{width: '40%'}}>{address}</div>
                      <div className="list-item" style={{width: '18%'}}>Легковой</div>
                      <div className="list-item" style={{width: '15%'}}>{type}</div>
                      <div className="list-item" style={{width: '12%'}}>Нет</div>
                      <div className="list-item p40" style={{width: '15%'}}>{time} ч</div>
                      <div className={'list-item-status ' + ((error === '105') ? 'warning' : 'success')}/>
                    </div>
                  );
                }) : <Empty style={{marginTop: 100}}
                  imageStyle={{
                    height: 60,
                  }}
                  description={
                    <span>
                      Данных нет
                    </span>
                  }/>
              }
              </Spin>
            </div>
          }
        </div>
      </BaseLayout>
    );
  }
}

export {
  Registry,
};
