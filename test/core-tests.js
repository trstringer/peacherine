const assert = require('chai').assert;
const core = require('../src/core');

describe('core root', () => {
  it('should return an object', (done) => {
    assert.equal(typeof core, 'object', 'core should be an object');
    done();
  });

  it('should list available data sources', (done) => {
    assert.isArray(core.getDataSourceTypes(), 'getDataSources() should return an array');
    done();
  });
});