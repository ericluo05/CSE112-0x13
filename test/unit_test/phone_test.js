let assert = require('assert');

let ValidNumberTest = {
  'United States': {
    'Valid Numbers': {
      'Expected': true,
      'Cases': [
                  ['1', '8581234567'],
                  ['1', '5101234567'],
                  ['1', '9259876543'],
                  ['1', '6623392704'],
                  ['1', '2485710083'],
                  ['1', '7757591094'],
                ],
    },
    'Invalid Numbers': {
      'Expected': false,
      'Cases': [
                  ['1', '85859876543'],
                  ['1', '510876543'],
                  ['1', '4311987653'],
                ],
    },
  },
  'Mexico': {
    'Valid Numbers': {
      'Expected': true,
      'Cases': [
                  ['52', '020'],
                  ['52', '072'],
                  ['52', '5512345678'],
                  ['52', '8198765432'],
                  ['52', '3357038957'],
                  ['52', '2225782034'],
                  ['52', '9611239570'],
                  ['52', '7442739023'],
                  ['52', '7222375091'],
                ],
    },
    'Invalid Numbers': {
      'Expected': false,
      'Cases': [
                  ['52', '021'],
                  ['52', '0201'],
                  ['52', '1234567890'],
                  ['52', '9973589238'],
                  ['52', '6871234123'],
                  ['52', '4839192438'],
                ],
    },
  },
  'China': {
    'Valid Numbers': {
      'Expected': true,
      'Cases': [
                  ['86', '110'],
                  ['86', '119'],
                  ['86', '12300'],
                  ['86', '96123'],
                  ['86', '10102345'],
                  ['86', '95105837'],
                  ['86', '021962288'],
                  ['86', '2157394735'],
                  ['86', '2557293483'],
                  ['86', '8542398349'],
                  ['86', '7942398572'],
                  ['86', '3558939857'],
                  ['86', '5123455939'],
                  ['86', '31139348573'],
                  ['86', '75710239482'],
                  ['86', '13057938382'],
                  ['86', '18457292714'],
                  ['86', '17052384926'],
                  ['86', '17162849240'],
                ],
    },
    'Invalid Numbers': {
      'Expected': false,
      'Cases': [
                  ['86', '111'],
                  ['86', '121'],
                  ['86', '12411'],
                  ['86', '97534'],
                  ['86', '021123456'],
                  ['86', '10112344'],
                  ['86', '95150234'],
                  ['86', '3112345875'],
                  ['86', '5815927304'],
                  ['86', '31258837403'],
                  ['86', '57829274920'],
                  ['86', '14639474720'],
                  ['86', '17956204736'],
                  ['86', '17045729374'],
                  ['86', '17225729374'],
                ],
    },
  },
};

describe('Phone Number Test', function() {
  let country;
  for (country in ValidNumberTest) {
    describe(country, function() {
      let data_c = ValidNumberTest[country];

      for (validity in data_c) {
        let data_v = data_c[validity];

        describe(validity, function() {
          let expected = data_v['Expected'];
          let cases = data_v['Cases'];

          for (let index_c = 0; index_c < cases.length; ++index_c) {
            let CC = cases[index_c][0];
            let PN = cases[index_c][1];
            let PN_f = '+' + CC + '\t' + PN;

            describe(PN_f + ':', function() {
              let res = phoneGeneral.isValidPhone(CC, PN);
              it('Expect: ' + expected, function() {
                assert.equal(expected, res['isValid']);
              });
            });
          }
        });
      }
    });
  }

    describe('Invalid Phone Number', function() {
        it('Expected: 9991231-34 to be invalid phone number', function() {
            let res = phoneGeneral.isValidPhone('1', '9991231-34');
            assert.equal(false, res['isValid']);
        });

        it('Expected: CC=1 Areacode = 999 be invalid', function() {
            let res = phoneGeneral.isValidPhone('1', '9991231-34');
            assert.equal('Area Code Not Valid', res['Error']);
        });

        it('Expected: CC=9 tobe invalid', function() {
            let res = phoneGeneral.isValidPhone('9', '9991231-34');
            assert.equal('Unable to find info with Country Code: 9', res['Error']);
        });

        it('Expected Error: Area Code Not valid', function() {
            let res = phoneGeneral.isValidPhone('1', '5691231234');
            assert.equal('Area Code Not Valid', res['Error']);
        });

        it('Expected Error: Invalid Number', function() {
            let res = phoneGeneral.isValidPhone('1', '56212312345');
            assert.equal('CC_1 Error(Last): Invalid Number', res['Error']);
        });
    });
});

describe('Format Phone', function() {
    describe('US', function() {
        it('Expected: (562)213-1234', function() {
            let res = phoneGeneral.formatPhoneNumber('1', '5622131234');
            assert.equal('(562)213-1234', res['Format']);
        });

        it('Invalid CC', function() {
            let res = phoneGeneral.formatPhoneNumber('15', '9992131234');
            assert.equal(false, res['isValid']);
        });
    });
});


