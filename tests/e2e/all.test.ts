import { startMockup, stopMockup } from './utils';
import * as validate_types from './validate_types';
import * as validate_michelson from './validate_michelson';

if (process.platform == 'linux') {
    beforeAll(startMockup);
    afterAll(stopMockup);

    validate_types.runTests();
    validate_michelson.runTests();
}
