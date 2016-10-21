var Firehash = require("../index");

var sampleTitle = "sample object",
    sampleObject = { title: sampleTitle, foo: 1, bar: 2, blah: 3, yada: 4, hoot: 5 },
    sampleName = "sample",
    sampleHash = new Firehash(sampleObject,sampleName);

describe("name()", function() {

  it("returns hash name", function() {
    expect(sampleHash.name()).toEqual(sampleName);
  });

});

describe("title()", function() {

  it("returns title field of data", function() {
    expect(sampleHash.title()).toEqual(sampleTitle);
  });

  it("returns 'UNTITLED' if title not set", function() {
    expect((new Firehash()).title()).toEqual("UNTITLED");
  });

});

describe("fix()", function() {

  var hash = new Firehash(sampleObject,sampleName);
  hash.fix("hoot","hoots");

  it("sets 'hoots' to a true array", function() {
    expect(hash.get("hoots")).not.toBeUndefined();
    expect(hash.get("hoots")["5"]).toEqual(true);
  });

});
