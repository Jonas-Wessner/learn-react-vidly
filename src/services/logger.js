import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

function init() {
  Sentry.init({
    dsn:
      "https://91f022f52c2244c98972708abe06d16f@o569202.ingest.sentry.io/5714734",
    integrations: [new Integrations.BrowserTracing()],

    // sample rate 0.0 in production to not capture errors that occur when coding
    sampleRate: 0.0,
  });
}

function log(...all) {
  console.error(all);
}

const logger = { init, log };

export default logger;
