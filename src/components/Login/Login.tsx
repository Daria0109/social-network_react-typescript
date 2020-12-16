import React, {FC} from 'react';
import {reduxForm, InjectedFormProps} from 'redux-form';
import {maxLengthValidatorCreator, required} from '../utilities/validators/validators';
import {createForm, Input} from '../common/FormControls/FormControls';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {login} from '../../redux/auth-reducer/auth-reducer';
import { Redirect } from 'react-router-dom';
import s from '../common/FormControls/FormControls.module.css'


type LoginFormPropsType = {}

const maxLength20 = maxLengthValidatorCreator(20);
const LoginForm = reduxForm<any, any>({form: 'login'})((props: InjectedFormProps<LoginValuesPropsType>) => {
  return (
    <form onSubmit={props.handleSubmit}>
      {createForm(Input, 'email', 'Email...', [required, maxLength20])}
      {createForm(Input, 'password', 'Password...', [required, maxLength20])}
      {createForm('input', 'rememberMe', null, [], {type: 'checkbox'}, 'remember me')}

      {props.error && <div className={s.errorSubmit}>{props.error}</div>}
      <button>Submit</button>
    </form>
  )
})


type LoginValuesPropsType = {
  email: string
  password: string
  rememberMe: boolean
}
type LoginPropsType = {
  login: (email: string, password: string, rememberMe: boolean) => void
  isAuth: boolean
}
const Login: FC<LoginPropsType> = function ({login, isAuth}) {
  const onSubmit = (formData: LoginValuesPropsType) => {
    login(formData.email, formData.password, formData.rememberMe)
  }

    if (isAuth) {
      return <Redirect to='/profile'/>
    }

    return (
    <div>
      <h1>Login</h1>
      <LoginForm onSubmit={onSubmit}/>
    </div>
  )
}

const mapStatePropsType = (state: AppStateType) => ({
  isAuth: state.auth.isAuth
})
export default connect(mapStatePropsType, {login})(Login);