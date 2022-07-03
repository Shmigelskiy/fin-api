import axios from "axios";
import { YAHOO_REQUEST } from "./const";

const URL_TEMPLATE_BY_REQUEST = {
  [YAHOO_REQUEST.FINANCIAL]: (quote) =>
    `https://finance.yahoo.com/quote/${quote}/financials?p=${quote}`,
};

export default async function yahooParser(request, quote) {
  const template = URL_TEMPLATE_BY_REQUEST[request];
  if (!template) return null;
  const url = template(quote);

  const res = await axios.get(url);
  if (!res.data) return null;

  try {
    const stateJSON = res.data.match(`root.App.main = (.*);`);
    if (!stateJSON) return null;

    const state = JSON.parse(stateJSON[1]);

    return state.context.dispatcher.stores;
  } catch (e) {
    console.error(e);
    return null;
  }
}
