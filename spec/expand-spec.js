var Firehash = require("../index");

var collection = {
  tic: {blah:"foo",yada:"qwerty"},
  tac: {blah:"foo",hoot:"asdf"},
  toe: {blah:"bar",burp:"zxcv"},
  tug: {hoot:"12345"}
}

describe("expand()", function() {

  it("produces the expected transform", function() {

    var hash = new Firehash();
    hash.set("expandable",{tic:true,tac:true});
    hash.expand("expandable",collection);

    expect(hash.get("expandable")).toEqual({ tic: {blah:"foo",yada:"qwerty"}, tac: {blah:"foo",hoot:"asdf"} });
  });

});
