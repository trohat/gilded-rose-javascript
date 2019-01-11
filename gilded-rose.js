const _ = require("lodash/fp");

const moveSellIn = _.update("sellIn", _.add(-1));

const capQuality = _.update("quality", _.clamp(0, 50));

const hasName = _.matchesProperty("name");

const sellInRange = (start, end) =>
  _.flow(
    _.get("sellIn"),
    _.inRange(start, end)
  );

const updateDefault = _.flow(
  _.cond([
    [sellInRange(-Infinity, 1), _.update("quality", _.add(-2))],
    [_.stubTrue, _.update("quality", _.add(-1))]
  ]),
  capQuality,
  moveSellIn
);

const updatedAged = _.flow(
  _.cond([
    [sellInRange(-Infinity, 1), _.update("quality", _.add(2))],
    [_.stubTrue, _.update("quality", _.add(1))]
  ]),
  capQuality,
  moveSellIn
);

const updatePasses = _.flow(
  _.cond([
    [sellInRange(6, 11), _.update("quality", _.add(2))],
    [sellInRange(1, 6), _.update("quality", _.add(3))],
    [sellInRange(-Infinity, 1), _.update("quality", _.constant(0))],
    [_.stubTrue, _.update("quality", _.add(1))]
  ]),
  capQuality,
  moveSellIn
);

const updateConjured = _.flow(
  _.cond([
    [sellInRange(-Infinity, 1), _.update("quality", _.add(-4))],
    [_.stubTrue, _.update("quality", _.add(-2))]
  ]),
  capQuality,
  moveSellIn
);

const updateItemQuality = _.cond([
  [hasName("Sulfuras, Hand of Ragnaros"), _.identity],
  [hasName("Aged Brie"), updatedAged],
  [hasName("Backstage passes to a TAFKAL80ETC concert"), updatePasses],
  [hasName("Conjured Mana Cake"), updateConjured],
  [_.stubTrue, updateDefault]
]);

module.exports = _.map(updateItemQuality);
