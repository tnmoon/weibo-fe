export function isValidUsername (username) {
  const usernameReg = /^[-_a-zA-Z0-9]{6,16}$/
  return usernameReg.test(username)
}

export function isValidPassword (password) {
  // const passwordReg = /^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,16}$/
  const passwordReg = /^[a-zA-Z0-9_]{6,16}$$/
  return passwordReg.test(password)
}

export function isValidNickname (nickname) {
  const nickNameReg = /^.{3,10}$/
  return nickNameReg.test(nickname)
}
