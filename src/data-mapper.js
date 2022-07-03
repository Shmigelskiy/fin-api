import config from "./config";
import { DATA_TYPE } from "./const";

const DATA_MAPPER_BY_TYPE = {
  [DATA_TYPE.GENERAL]: (stores) => {
    const {
      currency,
      currencySymbol,
      exchangeName,
      longName,
      quoteType,
      shortName,
      symbol,
    } = stores.QuoteSummaryStore.price;
    return {
      currency,
      currencySymbol,
      exchangeName,
      longName,
      quoteType,
      shortName,
      symbol,
    };
  },
  [DATA_TYPE.PRICE]: (stores) => {
    const {
      currency,
      currencySymbol,
      averageDailyVolume3Month,
      averageDailyVolume10Day,
      marketCap,
      marketState,
      postMarketChange,
      postMarketChangePercent,
      postMarketPrice,
      preMarketChange,
      preMarketPrice,
      regularMarketChange,
      regularMarketChangePercent,
      regularMarketDayHigh,
      regularMarketDayLow,
      regularMarketOpen,
      regularMarketPreviousClose,
      regularMarketPrice,
      regularMarketVolume,
    } = stores.QuoteSummaryStore.price;
    return {
      currency,
      currencySymbol,
      averageDailyVolume3Month,
      averageDailyVolume10Day,
      marketCap,
      marketState,
      postMarketChange,
      postMarketChangePercent,
      postMarketPrice,
      preMarketChange,
      preMarketPrice,
      regularMarketChange,
      regularMarketChangePercent,
      regularMarketDayHigh,
      regularMarketDayLow,
      regularMarketOpen,
      regularMarketPreviousClose,
      regularMarketPrice,
      regularMarketVolume,
    };
  },
  [DATA_TYPE.INCOME_STATEMENT]: (stores) =>
    stores.QuoteSummaryStore.incomeStatementHistory.incomeStatementHistory[0],
  [DATA_TYPE.INCOME_STATEMENT_HISTORY]: (stores) =>
    stores.QuoteSummaryStore.incomeStatementHistory.incomeStatementHistory.slice(
      1
    ),
  [DATA_TYPE.INCOME_STATEMENT_QUARTERLY]: (stores) =>
    stores.QuoteSummaryStore.incomeStatementHistoryQuarterly
      .incomeStatementHistory[0],
  [DATA_TYPE.INCOME_STATEMENT_QUARTERLY_HISTORY]: (stores) =>
    stores.QuoteSummaryStore.incomeStatementHistoryQuarterly.incomeStatementHistory.slice(
      1
    ),
  [DATA_TYPE.BALANCE_SHEET]: (stores) =>
    stores.QuoteSummaryStore.balanceSheetHistory.balanceSheetStatements[0],
  [DATA_TYPE.BALANCE_SHEET_HISTORY]: (stores) =>
    stores.QuoteSummaryStore.balanceSheetHistory.balanceSheetStatements.slice(
      1
    ),
  [DATA_TYPE.BALANCE_SHEET_QUARTERLY]: (stores) =>
    stores.QuoteSummaryStore.balanceSheetHistoryQuarterly
      .balanceSheetStatements[0],
  [DATA_TYPE.BALANCE_SHEET_QUARTERLY_HISTORY]: (stores) =>
    stores.QuoteSummaryStore.balanceSheetHistoryQuarterly.balanceSheetStatements.slice(
      1
    ),
  [DATA_TYPE.CASH_FLOW]: (stores) =>
    stores.QuoteSummaryStore.cashflowStatementHistory.cashflowStatements[0],
  [DATA_TYPE.CASH_FLOW_HISTORY]: (stores) =>
    stores.QuoteSummaryStore.cashflowStatementHistory.cashflowStatements.slice(
      1
    ),
  [DATA_TYPE.CASH_FLOW_QUARTERLY]: (stores) =>
    stores.QuoteSummaryStore.cashflowStatementHistoryQuarterly
      .cashflowStatements[0],
  [DATA_TYPE.CASH_FLOW_QUARTERLY_HISTORY]: (stores) =>
    stores.QuoteSummaryStore.cashflowStatementHistoryQuarterly.cashflowStatements.slice(
      1
    ),
};

const allMapper = (stores) => stores;

export default function getDataMapper(type) {
  const defaultMapper = config.isDevelopment
    ? allMapper
    : DATA_MAPPER_BY_TYPE[type.GENERAL];
  return DATA_MAPPER_BY_TYPE[type] || defaultMapper;
}
