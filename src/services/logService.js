import Raven from "raven-js";

function init() {
    Raven.config(
      "https://be6d4018500f4c98a149dec8fbe450de@o1407841.ingest.sentry.io/4504760945082368",
      {
        release: "1-0-0",
        environment: "development-test",
      }
    ).install();
}

function log(error) {
    Raven.captureException(error);
}

export default {
    init,
    log
};