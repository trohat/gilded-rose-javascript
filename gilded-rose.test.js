const updateQuality = require("./");

describe("Normal item", () => {
  test("lowers both values for every item", () => {
    const [{ sellIn, quality }] = updateQuality([
      { name: "+5 Dexterity Vest", sellIn: 10, quality: 20 }
    ]);

    expect(sellIn).toBe(9);
    expect(quality).toBe(19);
  });

  test("quality degrades twice as fast if sellIn is less then zero", () => {
    const [{ sellIn, quality }] = updateQuality([
      { name: "+5 Dexterity Vest", sellIn: -10, quality: 20 }
    ]);

    expect(sellIn).toBe(-11);
    expect(quality).toBe(18);
  });

  test("quality is never negative", () => {
    const [{ sellIn, quality }] = updateQuality([
      { name: "+5 Dexterity Vest", sellIn: 10, quality: 0 }
    ]);

    expect(sellIn).toBe(9);
    expect(quality).toBe(0);
  });
});

describe("Aged Brie", () => {
  test("increase quality over time", () => {
    const [{ sellIn, quality }] = updateQuality([
      { name: "Aged Brie", sellIn: 2, quality: 0 }
    ]);

    expect(sellIn).toBe(1);
    expect(quality).toBe(1);
  });

  test("quality is never more than 50", () => {
    const [{ sellIn, quality }] = updateQuality([
      { name: "Aged Brie", sellIn: 2, quality: 50 }
    ]);

    expect(sellIn).toBe(1);
    expect(quality).toBe(50);
  });
});

describe("Sulfuras", () => {
  test("never has to be sold nor does it decrease in quality", () => {
    const [{ sellIn, quality }] = updateQuality([
      { name: "Sulfuras, Hand of Ragnaros", sellIn: 0, quality: 80 }
    ]);

    expect(sellIn).toBe(0);
    expect(quality).toBe(80);
  });
});

describe("Backstage passes", () => {
  test("increases in quality as it's sellIn value decreases", () => {
    const [{ sellIn, quality }] = updateQuality([
      {
        name: "Backstage passes to a TAFKAL80ETC concert",
        sellIn: 15,
        quality: 20
      }
    ]);

    expect(sellIn).toBe(14);
    expect(quality).toBe(21);
  });

  test("quality increases by 2 when there are 10 days or less", () => {
    const [{ sellIn, quality }] = updateQuality([
      {
        name: "Backstage passes to a TAFKAL80ETC concert",
        sellIn: 10,
        quality: 20
      }
    ]);

    expect(sellIn).toBe(9);
    expect(quality).toBe(22);
  });

  test("quality increases by 3 when there are 5 days or less", () => {
    const [{ sellIn, quality }] = updateQuality([
      {
        name: "Backstage passes to a TAFKAL80ETC concert",
        sellIn: 5,
        quality: 20
      }
    ]);

    expect(sellIn).toBe(4);
    expect(quality).toBe(23);
  });

  test("quality is never more than 50", () => {
    const [{ sellIn, quality }] = updateQuality([
      {
        name: "Backstage passes to a TAFKAL80ETC concert",
        sellIn: 5,
        quality: 49
      }
    ]);

    expect(sellIn).toBe(4);
    expect(quality).toBe(50);
  });

  test("quality drops to 0 after the concert", () => {
    const [{ sellIn, quality }] = updateQuality([
      {
        name: "Backstage passes to a TAFKAL80ETC concert",
        sellIn: 0,
        quality: 20
      }
    ]);

    expect(sellIn).toBe(-1);
    expect(quality).toBe(0);
  });
});

describe("Conjured item", () => {
  test("degrades quality twice as fast", () => {
    const [{ sellIn, quality }] = updateQuality([
      { name: "Conjured Mana Cake", sellIn: 3, quality: 6 }
    ]);

    expect(sellIn).toBe(2);
    expect(quality).toBe(4);
  });

  test("quality degrades four times as fast if sellIn is less then zero", () => {
    const [{ sellIn, quality }] = updateQuality([
      { name: "Conjured Mana Cake", sellIn: -3, quality: 6 }
    ]);

    expect(sellIn).toBe(-4);
    expect(quality).toBe(2);
  });

  test("quality is never negative", () => {
    const [{ sellIn, quality }] = updateQuality([
      { name: "Conjured Mana Cake", sellIn: 3, quality: 1 }
    ]);

    expect(sellIn).toBe(2);
    expect(quality).toBe(0);
  });
});
