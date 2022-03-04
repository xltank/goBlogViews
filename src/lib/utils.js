
const regEmail = /^[\w\d._]+@\w+\.\w+/;

const validateEmail = function(email){
  return regEmail.test(email)
}

// function validatePass(email){
//   return true
// }


export default {
  validateEmail
}