import { REQUESTS_BY_DATA_TYPE, DISABLE_CACHE_BY_DATA_TYPE } from "./const";
import getDataMapper from "./data-mapper";
import { getCashedValue, saveCache } from "./mongoose";
import yahooParser from "./yahoo-parser";

export default function endpointFactory(dataType) {
  const requests = REQUESTS_BY_DATA_TYPE[dataType] || [];
  if (!requests.length) {
    console.error(
      `No such dataType or it is incorrectly configured - ${dataType}`
    );
  }
  const disableCache = DISABLE_CACHE_BY_DATA_TYPE[dataType];
  const mapper = getDataMapper(dataType);

  return async (req, res) => {
    try {
      const ticker = req.params.ticker;

      if (!disableCache) {
        const cachedData = await getCashedValue(dataType, ticker);
        if (cachedData) return res.json(cachedData);
      }

      const request = requests[0];
      const yahooData = await yahooParser(request, ticker);
      if (!yahooData) {
        return res.status(404).json({ error: "Data is not found" });
      }
      const data = mapper(yahooData);
      res.json(data);
    } catch (e) {
      console.error(e);
      res.status(404).json({ error: "Not found" });
      return;
    }

    saveCache(request, ticker, yahooData);
  };
}
