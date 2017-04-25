var assert = require('assert');
var phoneGeneral = require('../calls/phone_general');

var TestNumbers = {
  "United States" : {
    "Valid Numbers" : {
      "Expected" : true,
      "Cases" : [
                  ["1", "8581234567"],
                  ["1", "5101234567"]
                ]
    },
    "Invalid Numbers" : {
      "Expected" : false,
      "Cases" : [
                  ["1", "85859876543"],
                  ["1", "510876543"]
                ]
    }
  },
  "Mexico" : {
    "Valid Numbers" : {
      "Expected" : true,
      "Cases" : [
                  ["52", "020"]
                ]
    },
    "Invalid Numbers" : {
      "Expected" : false,
      "Cases" : [
                  ["52", "021"]
                ]
    }
  },
  "China" : {
    "Valid Numbers" : {
      "Expected" : true,
      "Cases" : [
                  ["86", "110"]
                ]
    },
    "Invalid Numbers" : {
      "Expected" : false,
      "Cases" : [
                  ["86", "111"]
                ]
    }
  }
}

describe('Phone Number Test', function() {

  for (country in TestNumbers) {

    describe(country, function() {
      var data_c = TestNumbers[country];

      for (validity in data_c) {
        var data_v = data_c[validity];

        describe(validity, function() {
          var expected = data_v["Expected"];
          var cases = data_v["Cases"];

          for (var index_c = 0; index_c < cases.length; ++index_c) {
            var CC = cases[index_c][0];
            var PN = cases[index_c][1];
            var PN_f = '+' + CC + '\t' + PN;

            it(PN_f, function() {
              var res = phoneGeneral.isValidPhone(CC, PN);
              assert.equal(expected, res["isValid"]);
            });
          }
        });
      }
    });
  }
});
