import { getErrorMessageByKey, IBaseError } from ".."
import SuperJson from "superjson"

export class BlizzardAccountNotExists extends Error implements IBaseError {
  statusCode = 401
  name = "BlizzardAccountNotExists"
  constructor() {
    super()
    this.message = getErrorMessageByKey("blizzardAccountNotExists")
  }
}

SuperJson.registerClass(BlizzardAccountNotExists)
SuperJson.allowErrorProps("statusCode")
