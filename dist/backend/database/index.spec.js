"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _axios = _interopRequireDefault(require("axios"));

var _index = require("./index");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

jest.mock('axios');
describe('backend/database', function () {
  var testCollectionName = 'testCollection';
  var testDocumentName = 'testDocument';
  var testDocument = {
    stringKey: 'testString',
    numericKey: 100,
    booleanKey: true,
    arrayKey: ['one', 'two', 'three']
  };
  var database = new _index.Database({
    projectId: 'projectId',
    projectToken: 'projectToken'
  });
  it('should get a document', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var document;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            jest.spyOn(_axios["default"], 'post').mockResolvedValueOnce({
              data: {
                document: _objectSpread({
                  id: testDocumentName
                }, testDocument)
              }
            }); // @ts-ignore

            _context.next = 3;
            return database.get(testCollectionName, testDocumentName);

          case 3:
            document = _context.sent;
            expect(document).toEqual(_objectSpread({
              id: testDocumentName
            }, testDocument));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
});
//# sourceMappingURL=index.spec.js.map