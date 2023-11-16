import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import Button from '../../../shared/component/Button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { LoginFormValidator } from './validator/LoginFormValidator';
import Input from '../../../shared/component/Input';
import Icon from '../../../shared/component/Icon';
import bcrypt from 'bcryptjs';
import { setUser } from '../../../redux/authSlice'
import { useDispatch } from 'react-redux';
import { getUser } from '../../../user/hooks/getUser';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginFormValidator),
  });

  const onSubmit = (data) => {
    const user = getUser(data.email)
    if (user) {
      bcrypt.compare(data.password, user.password, (err, result) => {
        if (result) {
          dispatch(setUser(user));
          navigate('/');
        } else {
          setLoginError('Invalid email or password');
        }
      });
    } else {
      setLoginError('Invalid email or password');
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="py-2">
      <Input
        label="E-mail"
        errorMessage={errors.email?.message}
        register={register('email')}
      />
      <Input
        label="Password"
        errorMessage={errors.password?.message}
        register={register('password')}
        type={showPassword ? 'text' : 'password'}
      >
        {showPassword ? (
          <Icon name="eyeInvisible" onClick={handleShowPassword} />
        ) : (
          <Icon name="eye" onClick={handleShowPassword} />
        )}
      </Input>
      {loginError && <p className="text-red-500">{loginError}</p>}
      <div className="flex justify-center space-x-4 py-6">
        <Button type="submit" name="Login" />
        <Link to="/registration">
          <Button name="Sign-up" outline />
        </Link>
      </div>
    </form>
  );
}
