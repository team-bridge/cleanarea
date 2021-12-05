const errorMessage = {
  emailAlreadyExists: "이미 존재하는 이메일이에요.",
  loginFailed: "아이디나 패스워드가 정확하지 않아요",
  requiredEmail: "이메일을 입력해주세요.",
  invalidEmail: "유효하지 않은 이메일형식 입니다.",
  requiredName: "닉네임을 입력해주세요",
  invalidName: "유효하지 않은 닉네임입니다.",
  invalidNameLength: "닉네임은 3글자에서 20글자 사이로 입력 가능합니다.",
  invalidNameFormat: "닉네임은 한글,영어,숫자로만 구성될 수 있습니다.",
  blizzardAccountNotExists: "배틀넷 계정을 찾을 수 없어요. 배틀넷 인증을 다시 해주세요.",
  requiredPassword: "비밀번호를 입력해주세요.",
  invalidPassword: "유효하지 않은 패스워드 입니다.",
  invalidPasswordMinLength: "비밀번호는 10자 이상 입력해주세요.",
  invalidPasswordMaxLength: "비밀번호는 100자 이하로 입력해주세요.",
  invalidResetPasswordLink:
    "비밀번호 초기화 링크가 잘못되었거나 링크가 만료되었습니다. 다시 시도해주세요.",
}

export type ErrorMessageKey = keyof typeof errorMessage

/**
 * 한국어 외에 에러메시지가 필요할 경우 로직 추가
 * @param key
 */
export const getErrorMessageByKey = (key: ErrorMessageKey) => {
  return errorMessage[key]
}
