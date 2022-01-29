import { MichelsonJSON, MichelsonMicheline } from '../typings';
import Michelson_JSON from './json';

export const michelineOfJSON = (json: MichelsonJSON): MichelsonMicheline => Michelson_JSON.toMicheline(json, '');

const Converter = {
    michelineOfJSON,
};

export default Converter;
