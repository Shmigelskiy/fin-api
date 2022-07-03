import moment from "moment";
import mongoose from "mongoose";
import config from "./config";
import { DATA_TYPES_BY_REQUEST, DISABLE_CACHE_BY_DATA_TYPE } from "./const";
import getDataMapper from "./data-mapper";

if (config.isDevelopment) {
  mongoose.set("debug", true);
}
mongoose.connect(config.db.mongoUri).then(() => {
  console.info("Connected to Database");
});

const CacheSchema = new mongoose.Schema({
  ticker: String,
  dataType: String,
  expireDate: { type: Date, expires: 0 },
  data: mongoose.Schema.Types.Mixed,
});

CacheSchema.index({ ticker: 1, dataType: 1 }, { unique: true });
const Cache = mongoose.model("Cache", CacheSchema);

export async function getCashedValue(dataType, ticker) {
  const item = await Cache.findOne({ ticker, dataType });
  return item?.data;
}

export async function saveCache(request, ticker, stores) {
  try {
    const allDataTypes = DATA_TYPES_BY_REQUEST[request];
    if (!allDataTypes) return;

    const eligibleDataTypes = allDataTypes.filter(
      (type) => !DISABLE_CACHE_BY_DATA_TYPE[type]
    );
    if (!eligibleDataTypes.length) return;

    const batch = Cache.collection.initializeUnorderedBulkOp();
    eligibleDataTypes.forEach((dataType) => {
      batch
        .find({ ticker, dataType })
        .upsert()
        .replaceOne({
          ticker,
          dataType,
          data: getDataMapper(dataType)(stores),
          expireDate: moment(new Date()).endOf("day").toDate(),
        });
    });

    batch.execute();
  } catch (e) {
    console.error(e);
  }
}
