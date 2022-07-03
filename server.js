import express from "express";
import config from "./src/config";
import { DATA_TYPE } from "./src/const";
import endpointFactory from "./src/endpoint-factory";

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome at Financial API");
});

const PREFIX = "/tickers/:ticker";
app.get(PREFIX, endpointFactory(DATA_TYPE.GENERAL));
app.get(PREFIX + "/price", endpointFactory(DATA_TYPE.PRICE));
app.get(
  PREFIX + "/income-statement",
  endpointFactory(DATA_TYPE.INCOME_STATEMENT)
);
app.get(
  PREFIX + "/income-statement/history",
  endpointFactory(DATA_TYPE.INCOME_STATEMENT_HISTORY)
);
app.get(
  PREFIX + "/income-statement/quarterly",
  endpointFactory(DATA_TYPE.INCOME_STATEMENT_QUARTERLY)
);
app.get(
  PREFIX + "/income-statement/quarterly/history",
  endpointFactory(DATA_TYPE.INCOME_STATEMENT_QUARTERLY_HISTORY)
);
app.get(PREFIX + "/balance-sheet", endpointFactory(DATA_TYPE.BALANCE_SHEET));
app.get(
  PREFIX + "/balance-sheet/history",
  endpointFactory(DATA_TYPE.BALANCE_SHEET_HISTORY)
);
app.get(
  PREFIX + "/balance-sheet/quarterly",
  endpointFactory(DATA_TYPE.BALANCE_SHEET_QUARTERLY)
);
app.get(
  PREFIX + "/balance-sheet/quarterly/history",
  endpointFactory(DATA_TYPE.BALANCE_SHEET_QUARTERLY_HISTORY)
);
app.get(PREFIX + "/cash-flow", endpointFactory(DATA_TYPE.CASH_FLOW));
app.get(
  PREFIX + "/cash-flow/history",
  endpointFactory(DATA_TYPE.CASH_FLOW_HISTORY)
);
app.get(
  PREFIX + "/cash-flow/quarterly",
  endpointFactory(DATA_TYPE.CASH_FLOW_QUARTERLY)
);
app.get(
  PREFIX + "/cash-flow/quarterly/history",
  endpointFactory(DATA_TYPE.CASH_FLOW_QUARTERLY_HISTORY)
);

app.listen(config.port, () => {
  console.info(`Server is started on http://localhost:${config.port}`);
});
