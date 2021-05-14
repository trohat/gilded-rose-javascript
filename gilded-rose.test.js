const updateQuality = require("./");

test("should do something", () => {
  updateQuality([]);
});

test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
});

test('Sulfuras, Hand of Ragnaros does not change', () => {
  expect(updateQuality([ {
    name: "Sulfuras, Hand of Ragnaros",
    sellIn: 45,
    quality: 80
  } ])).toStrictEqual([ {
    name: "Sulfuras, Hand of Ragnaros",
    sellIn: 45,
    quality: 80
  } ]);
});

test('something degrades normally', () => {
  expect(updateQuality([ {
    name: "something",
    sellIn: 45,
    quality: 80
  } ])).toStrictEqual([ {
    name: "something",
    sellIn: 44,
    quality: 79
  } ]);
});

test('something starting with sellIn 1 still degrades normally', () => {
  expect(updateQuality([ {
    name: "something",
    sellIn: 1,
    quality: 80
  } ])).toStrictEqual([ {
    name: "something",
    sellIn: 0,
    quality: 79
  } ]);
});

test('something starting with sellIn 0 degrades twice as fast', () => {
  expect(updateQuality([ {
    name: "something",
    sellIn: 0,
    quality: 45
  } ])).toStrictEqual([ {
    name: "something",
    sellIn: -1,
    quality: 43
  } ]);
});

test('something with negative sellIn degrades twice as fast', () => {
  expect(updateQuality([ {
    name: "something",
    sellIn: -1,
    quality: 45
  } ])).toStrictEqual([ {
    name: "something",
    sellIn: -2,
    quality: 43
  } ]);
});

test('quality goes never below zero with positive sellIn', () => {
  expect(updateQuality([ {
    name: "something",
    sellIn: 10,
    quality: 0
  } ])).toStrictEqual([ {
    name: "something",
    sellIn: 9,
    quality: 0
  } ]);
});

test('quality goes never below zero with negative sellIn', () => {
  expect(updateQuality([ {
    name: "something",
    sellIn: -1,
    quality: 0
  } ])).toStrictEqual([ {
    name: "something",
    sellIn: -2,
    quality: 0
  } ]);
});

test('Aged Brie upgrades normally', () => {
  expect(updateQuality([ {
    name: "Aged Brie",
    sellIn: 45,
    quality: 40
  } ])).toStrictEqual([ {
    name: "Aged Brie",
    sellIn: 44,
    quality: 41
  } ]);
});

test('last upgrade of Aged Brie', () => {
  expect(updateQuality([ {
    name: "Aged Brie",
    sellIn: 45,
    quality: 49
  } ])).toStrictEqual([ {
    name: "Aged Brie",
    sellIn: 44,
    quality: 50
  } ]);
});

test('Aged Brie quality never over 50', () => {
  expect(updateQuality([ {
    name: "Aged Brie",
    sellIn: 45,
    quality: 50
  } ])).toStrictEqual([ {
    name: "Aged Brie",
    sellIn: 44,
    quality: 50
  } ]);
});

test('Backstage passes quality never over 50', () => {
  expect(updateQuality([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 45,
    quality: 50
  } ])).toStrictEqual([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 44,
    quality: 50
  } ]);
});

test('last upgrade of Backstage passes', () => {
  expect(updateQuality([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 45,
    quality: 49
  } ])).toStrictEqual([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 44,
    quality: 50
  } ]);
});

test('Backstage passes upgrades normally', () => {
  expect(updateQuality([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 45,
    quality: 30
  } ])).toStrictEqual([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 44,
    quality: 31
  } ]);
});

test('Backstage passes 11 days', () => {
  expect(updateQuality([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 11,
    quality: 30
  } ])).toStrictEqual([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 10,
    quality: 31
  } ]);
});

test('Backstage passes 10 days', () => {
  expect(updateQuality([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 10,
    quality: 30
  } ])).toStrictEqual([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 9,
    quality: 32
  } ]);
});

test('Backstage passes 6 days', () => {
  expect(updateQuality([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 6,
    quality: 30
  } ])).toStrictEqual([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 5,
    quality: 32
  } ]);
});

test('Backstage passes 5 days', () => {
  expect(updateQuality([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 5,
    quality: 30
  } ])).toStrictEqual([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 4,
    quality: 33
  } ]);
});

test('Backstage passes 1 days', () => {
  expect(updateQuality([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 1,
    quality: 30
  } ])).toStrictEqual([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 0,
    quality: 33
  } ]);
});

test('Backstage passes 0 days', () => {
  expect(updateQuality([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 0,
    quality: 30
  } ])).toStrictEqual([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: -1,
    quality: 0
  } ]);
});


test('Backstage passes 11 days at 50', () => {
  expect(updateQuality([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 11,
    quality: 50
  } ])).toStrictEqual([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 10,
    quality: 50
  } ]);
});

test('Backstage passes 10 days at 50', () => {
  expect(updateQuality([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 10,
    quality: 50
  } ])).toStrictEqual([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 9,
    quality: 50
  } ]);
});

test('Backstage passes 6 days at 50', () => {
  expect(updateQuality([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 6,
    quality: 50
  } ])).toStrictEqual([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 5,
    quality: 50
  } ]);
});

test('Backstage passes 5 days at 50', () => {
  expect(updateQuality([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 5,
    quality: 50
  } ])).toStrictEqual([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 4,
    quality: 50
  } ]);
});

test('Backstage passes 1 days at 50', () => {
  expect(updateQuality([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 1,
    quality: 50
  } ])).toStrictEqual([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 0,
    quality: 50
  } ]);
});

test('Backstage passes 0 days at 50', () => {
  expect(updateQuality([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 0,
    quality: 50
  } ])).toStrictEqual([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: -1,
    quality: 0
  } ]);
});


test('Backstage passes 11 days at 49', () => {
  expect(updateQuality([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 11,
    quality: 49
  } ])).toStrictEqual([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 10,
    quality: 50
  } ]);
});

test('Backstage passes 10 days at 49', () => {
  expect(updateQuality([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 10,
    quality: 49
  } ])).toStrictEqual([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 9,
    quality: 50
  } ]);
});

test('Backstage passes 6 days at 49', () => {
  expect(updateQuality([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 6,
    quality: 49
  } ])).toStrictEqual([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 5,
    quality: 50
  } ]);
});

test('Backstage passes 5 days at 49', () => {
  expect(updateQuality([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 5,
    quality: 49
  } ])).toStrictEqual([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 4,
    quality: 50
  } ]);
});

test('Backstage passes 1 days at 49', () => {
  expect(updateQuality([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 1,
    quality: 49
  } ])).toStrictEqual([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 0,
    quality: 50
  } ]);
});

test('Backstage passes 0 days at 49', () => {
  expect(updateQuality([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 0,
    quality: 49
  } ])).toStrictEqual([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: -1,
    quality: 0
  } ]);
});


test('Backstage passes 11 days at 48', () => {
  expect(updateQuality([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 11,
    quality: 48
  } ])).toStrictEqual([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 10,
    quality: 49
  } ]);
});

test('Backstage passes 10 days at 48', () => {
  expect(updateQuality([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 10,
    quality: 48
  } ])).toStrictEqual([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 9,
    quality: 50
  } ]);
});

test('Backstage passes 6 days at 48', () => {
  expect(updateQuality([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 6,
    quality: 48
  } ])).toStrictEqual([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 5,
    quality: 50
  } ]);
});

test('Backstage passes 5 days at 48', () => {
  expect(updateQuality([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 5,
    quality: 48
  } ])).toStrictEqual([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 4,
    quality: 50
  } ]);
});

test('Backstage passes 1 days at 48', () => {
  expect(updateQuality([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 1,
    quality: 48
  } ])).toStrictEqual([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 0,
    quality: 50
  } ]);
});

test('Backstage passes 0 days at 48', () => {
  expect(updateQuality([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 0,
    quality: 48
  } ])).toStrictEqual([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: -1,
    quality: 0
  } ]);
});



test('Backstage passes 11 days at 47', () => {
  expect(updateQuality([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 11,
    quality: 47
  } ])).toStrictEqual([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 10,
    quality: 48
  } ]);
});

test('Backstage passes 10 days at 47', () => {
  expect(updateQuality([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 10,
    quality: 47
  } ])).toStrictEqual([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 9,
    quality: 49
  } ]);
});

test('Backstage passes 6 days at 47', () => {
  expect(updateQuality([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 6,
    quality: 47
  } ])).toStrictEqual([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 5,
    quality: 49
  } ]);
});

test('Backstage passes 5 days at 47', () => {
  expect(updateQuality([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 5,
    quality: 47
  } ])).toStrictEqual([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 4,
    quality: 50
  } ]);
});

test('Backstage passes 1 days at 47', () => {
  expect(updateQuality([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 1,
    quality: 47
  } ])).toStrictEqual([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 0,
    quality: 50
  } ]);
});

test('Backstage passes 0 days at 47', () => {
  expect(updateQuality([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: 0,
    quality: 47
  } ])).toStrictEqual([ {
    name: "Backstage passes to a TAFKAL80ETC concert",
    sellIn: -1,
    quality: 0
  } ]);
});
