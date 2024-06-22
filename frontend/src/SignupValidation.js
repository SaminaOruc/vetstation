function Validation(values){
  let error={}
  const email_pattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const password_pattern=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

  if(values.firstName===""){
      error.firstName="First name should not be empty"
  }
  else{
      error.firstName=""
  }

  if(values.lastName===""){
      error.lastName="Last name should not be emtpy"
  }
  else{
      error.lastName=""
  }

  if(values.nickname===""){
      error.nickname="Nickname should not be empty"
  }
  else{
      error.nickname=""
  }

  if(values.email===""){
      error.email="Email should not be empty"
  }
  else if(!email_pattern.test(values.email)){
      error.email="Email didn't match"
  }
  else{
      error.email=""
  }

  if (values.password===""){
      error.password="Password should not be empty"
  }
  else if(!password_pattern.test(values.password)){
      error.password="Password didn't match"
  }
  else{
      error.password=""
  }
  return error;
}

export default Validation;