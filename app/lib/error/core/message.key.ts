const errorMessage = {
  emailAlreadyExists: "이미 존재하는 이메일이에요.",
  loginFailed: "아이디나 패스워드가 정확하지 않아요",
  invalidEmail: "유효하지 않은 이메일형식 입니다.",
  invalidNameLength: "닉네임은 3글자에서 20글자 사이로 입력 가능합니다.",
  invalidNameFormat: "닉네임은 한글,영어,숫자로만 구성될 수 있습니다.",
}

export type ErrorMessageKey = keyof typeof errorMessage

/**
 * 한국어 외에 에러메시지가 필요할 경우 로직 추가
 * @param key
 */
export const getErrorMessageByKey = (key: ErrorMessageKey) => {
  return errorMessage[key]
}
