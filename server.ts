import blitz from "blitz/custom-server"
import { createServer } from "http"
import { parse } from "url"
import { log } from "@blitzjs/display"
import { getConstant } from "config"

const { PORT } = getConstant()
const dev = process.env.NODE_ENV !== "production"
const app = blitz({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url!, true)

    handle(req, res, parsedUrl)
  }).listen(PORT, () => {
    log.success(`Ready on ${PORT}`)
  })
})
