import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function ArticleForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return null
  // <Form<S> {...props}>
  //   123
  //   {/* 뒤로 or 닫기 or 접기
  //   내용 Input
  //   제출 버튼
  //   내용 텍스트
  //   writter = 배틀태그를 조회한 유저 리스트
  //   none writter = 배틀태그 보기 + ~명이 확인했어요 */}
  //   <LabeledTextField name="content" label="Content" placeholder="Content" />
  //   123
  // </Form>
}
