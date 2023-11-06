import React, { useEffect, useState } from "react";
import ModalContainer from "../../components/Modal/ModalContainer";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";

export default function Auth({visible = false,onClose = null}) {
  const [loginForm, setLoginForm] = useState(true);
    
  const toggleLoginForm = () => {
    setLoginForm(!loginForm);
  }

  const handleClose = () => {
    setLoginForm(true);
    onClose &&  onClose();
  }

  useEffect(() =>{
    return () =>{
      setLoginForm(true);
    }
  },[])

  
  return (
    <ModalContainer visible={visible} onClose={handleClose} ignoreContainer={true}>
      {loginForm ? <LoginForm onClose={onClose} toggleLoginForm={toggleLoginForm} /> : <RegisterForm onClose={onClose}  toggleLoginForm={toggleLoginForm} />}
    </ModalContainer>
  );
}
