import React, {PureComponent} from 'react';

import './AuthPage.less';

import {AuthService} from 'services/auth.service';

import {FormComponentProps} from 'antd/lib/form';
import {Button, Card, Form, Icon, Input, notification} from 'antd';
import {authStore} from '../../App';

interface IAuthPageState {
  loading: boolean;
  error: boolean;
  errorMessage: string;
}

class AuthPage extends PureComponent<FormComponentProps, IAuthPageState> {
  state = {
    loading: false,
    error: false,
    errorMessage: '',
  };

  authService: AuthService = new AuthService();

  handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    this.props.form.validateFields((error, formData) => {
      if (!error) {
        const {name, password} = formData;
        const data = {
          name,
          password,
        };

        this.setState({
          loading: true,
        });

        this.authService.authorize(data)
          .then((response) => {
            this.setState({
              error: false,
              loading: false,
            });

            authStore.login(response);
          })
          .catch((err) => {
            if (err.message) {
              this.setState({
                loading: false,
              });

              notification.error({
                message: 'Что-то пошло не так',
                description: 'Повторите попытку позже',
              });
            } else {
              this.setState({
                error: true,
                errorMessage: err,
                loading: false,
              });
            }
          });
      } else {
        this.setState({
          loading: false,
        });
      }
    });
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const {loading, errorMessage} = this.state;

    return(
      <div className="auth">
        <Card title="Авторизация" bordered={false} style={{ width: 300 }}>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Введите логин!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Логин"
                  size="large"
                />,
              )}
            </Form.Item>
            <Form.Item help={errorMessage ? errorMessage : ''}>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Введите пароль!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Пароль"
                  size="large"
                />,
              )}
            </Form.Item>
            <Form.Item className="text-center">
              <Button type="primary" htmlType="submit" className="login-form-button" loading={loading} size="large">
                Войти
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

export const AuthFormWrapper = Form.create()(AuthPage);
