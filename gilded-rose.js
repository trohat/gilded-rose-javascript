/**
 * The update quality function
 * @example
 * updateQuality([
 *   { name: "+5 Dexterity Vest", sellIn: 10, quality: 20 },
 *   { name: "Aged Brie", sellIn: 2, quality: 0 },
 *   { name: "Elixir of the Mongoose", sellIn: 5, quality: 7 },
 *   { name: "Sulfuras, Hand of Ragnaros", sellIn: 0, quality: 80 },
 *   {
 *     name: "Backstage passes to a TAFKAL80ETC concert",
 *     sellIn: 15,
 *     quality: 20
 *   },
 *   { name: "Conjured Mana Cake", sellIn: 3, quality: 6 }
 * ]);
 */

module.exports = function updateQuality(items) {
  function check50(item) {
    if (item.quality > 50) item.quality = 50;
  }

  for (let item of items) {
    switch (item.name) {
      case "Sulfuras, Hand of Ragnaros":
        break;
      case "Aged Brie":
        if (item.sellIn <= 0) item.quality +=2;
        else item.quality++;
        break;
      case "Backstage passes to a TAFKAL80ETC concert":
        switch (true) {
          case (item.sellIn > 10):
            item.quality++;
            break;
          case (item.sellIn <= 10 && item.sellIn > 5):
            item.quality += 2;
            break;
          case (item.sellIn <= 5 && item.sellIn > 0):
            item.quality += 3;
            break;
          default:
            item.quality = 0;
        }
        break;
      case "Conjured Mana Cake":
          if (item.sellIn <= 0) item.quality -=4;
          else item.quality -= 2;
          break;
      default:
        if (item.sellIn <= 0) item.quality -=2;
        else item.quality--;
    }
    if (item.name !== "Sulfuras, Hand of Ragnaros") {
      item.sellIn--;
      check50(item);
    }
    if (item.quality < 0) item.quality = 0;
  }
  return items;
};
