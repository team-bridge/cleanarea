import { IBaseError } from "../core"
import { getErrorMessageByKey } from "../core/message.key"
import SuperJson from "superjson"

export class EmailAlreadyExistsError extends Error implements IBaseError {
  statusCode = 400
  name = "EmailAlreadyExists"

  constructor() {
    super(getErrorMessageByKey("emailAlreadyExists"))
  }
}

SuperJson.registerClass(EmailAlreadyExistsError)
SuperJson.allowErrorProps("statusCode")
