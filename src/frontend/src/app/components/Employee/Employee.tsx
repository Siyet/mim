import React, {PureComponent} from 'react';

import './Employee.less';
import {BaseLayoutHeader} from '../BaseLayoutHeader';
import {BaseLayout} from '../BaseLayout';
import axios from 'axios';
import {Empty, Spin} from 'antd';

class Employee extends PureComponent<{}, {}> {
  state = {
    data: [],
    loading: false,
  };

  search = (value) => {
    axios.get('/')
      .then((res) => {

      })
      .catch((err) => {

      });
  }

  getCompanies = () => {
    this.setState({
      loading: true,
    });

    axios.get('http://95.214.63.201:5984/companies/_all_docs?include_docs=true')
      .then((res) => {
        const rows = res.data.rows.slice(0, 50).filter((item) => item.doc._id);

        this.setState({
          data: rows,
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

  componentDidMount(){
    this.getCompanies();
  }

  render() {
    const {data, loading} = this.state;

    // address: "Валдайский проезд, дом 10, корпус 1"
    // admarea: "Северный административный округ"
    // chiefname: "Решетников Александр Владимирович"
    // district: "район Левобережный"
    // email: "gbu-lev@mail.ru"
    // fullname: "Государственное бюджетное учреждение города Москвы «Жилищник района Левобережный»"
    // geodata: {type: "Point", coordinates: [37.467602857, 55.867278833]}
    // global_id: 272684242
    // homesquantity: 4
    // inn: "7712010516"
    // ogrn: "1037739585058"
    // publicphone: "(499) 458-12-78"
    // workinghours: {Hours: "08:00-17:00", DayOfWeek: "понедельник"}
    // DayOfWeek: "понедельник"
    // Hours: "08:00-17:00"

    return(
      <BaseLayout>
        <BaseLayoutHeader search={this.search}/>
        <div className="list">
          <div className="list-headers">
            <div className="list-header" style={{width: '20%'}}>Наименование</div>
            <div className="list-header" style={{width: '20%'}}>Округ</div>
            <div className="list-header" style={{width: '20%'}}>Район</div>
            <div className="list-header" style={{width: '25%'}}>Адрес</div>
            <div className="list-header p40" style={{width: '15%'}}>Состояние</div>
          </div>
          {
            <div className="list-items">
              <Spin spinning={loading} style={{padding: 100}}>
              {
                data.length ? data.map(({ doc: {_id, fullname, admarea, district, address} }) => {
                  return (
                    <div className="list-items-block" key={_id}>
                      <div className="list-item" style={{width: '20%'}} title={fullname}>{fullname}</div>
                      <div className="list-item" style={{width: '20%'}}>{admarea}</div>
                      <div className="list-item" style={{width: '20%'}}>{district}</div>
                      <div className="list-item" style={{width: '25%'}}>{address}</div>
                      <div className="list-item p40" style={{width: '15%'}}></div>
                      <div className="list-item-status"/>
                    </div>
                  );
                })  : <Empty style={{marginTop: 100}}
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
  Employee,
};
