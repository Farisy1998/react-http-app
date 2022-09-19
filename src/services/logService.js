import Raven from "raven-js";

function init() {
  Raven.config(
    "https://85e3131f998647aa8e9ad59a9aee891f@o1407841.ingest.sentry.io/6743081",
    {
      release: "1.0.0",
      environment: "development-test",
    }
  ).install();
}

function log(error) {
  Raven.captureException(error);
}

export { init, log };
