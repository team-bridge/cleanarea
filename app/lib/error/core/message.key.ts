const errorMessage = {
  emailAlreadyExists: "이미 존재하는 이메일이에요.",
  loginFailed: "아이디나 패스워드가 정확하지 않아요",
}

export type ErrorMessageKey = keyof typeof errorMessage

/**
 * 한국어 외에 에러메시지가 필요할 경우 로직 추가
 * @param key
 */
export const getErrorMessageByKey = (key: ErrorMessageKey) => {
  return errorMessage[key]
}
