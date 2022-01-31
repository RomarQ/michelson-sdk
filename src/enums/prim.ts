/**
 * @see https://tezos.gitlab.io/alpha/michelson.html#full-grammar
 */
export enum Prim {
    // Type
    unit = 'unit',
    never = 'never',
    nat = 'nat',
    int = 'int',
    mutez = 'mutez',
    timestamp = 'timestamp',
    string = 'string',
    address = 'address',
    key = 'key',
    key_hash = 'key_hash',
    signature = 'signature',
    option = 'option',
    bytes = 'bytes',
    chain_id = 'chain_id',
    bool = 'bool',
    list = 'list',
    pair = 'pair',
    or = 'or',
    set = 'set',
    operation = 'operation',
    contract = 'contract',
    ticket = 'ticket',
    lambda = 'lambda',
    map = 'map',
    big_map = 'big_map',
    bls12_381_g1 = 'bls12_381_g1',
    bls12_381_g2 = 'bls12_381_g2',
    bls12_381_fr = 'bls12_381_fr',
    sapling_transaction = 'sapling_transaction',
    sapling_state = 'sapling_state',
    chest = 'chest',
    chest_key = 'chest_key',
    // Value
    Unit = 'Unit',
    True = 'True',
    False = 'False',
    Some = 'Some',
    None = 'None',
    Pair = 'Pair',
    Elt = 'Elt',
    Left = 'Left',
    Right = 'Right',
    // Root fields
    storage = 'storage',
    parameter = 'parameter',
    code = 'code',
    // Instructions
    DROP = 'DROP',
    DUP = 'DUP',
    SWAP = 'SWAP',
    DIG = 'DIG',
    DUG = 'DUG',
    PUSH = 'PUSH',
    SOME = 'SOME',
    NONE = 'NONE',
    UNIT = 'UNIT',
    NEVER = 'NEVER',
    IF_NONE = 'IF_NONE',
    PAIR = 'PAIR',
    CAR = 'CAR',
    CDR = 'CDR',
    UNPAIR = 'UNPAIR',
    LEFT = 'LEFT',
    RIGHT = 'RIGHT',
    IF_LEFT = 'IF_LEFT',
    NIL = 'NIL',
    CONS = 'CONS',
    IF_CONS = 'IF_CONS',
    SIZE = 'SIZE',
    EMPTY_SET = 'EMPTY_SET',
    EMPTY_MAP = 'EMPTY_MAP',
    EMPTY_BIG_MAP = 'EMPTY_BIG_MAP',
    MAP = 'MAP',
    ITER = 'ITER',
    MEM = 'MEM',
    GET = 'GET',
    UPDATE = 'UPDATE',
    IF = 'IF',
    LOOP = 'LOOP',
    LOOP_LEFT = 'LOOP_LEFT',
    LAMBDA = 'LAMBDA',
    EXEC = 'EXEC',
    APPLY = 'APPLY',
    DIP = 'DIP',
    FAILWITH = 'FAILWITH',
    CAST = 'CAST',
    RENAME = 'RENAME',
    CONCAT = 'CONCAT',
    SLICE = 'SLICE',
    PACK = 'PACK',
    UNPACK = 'UNPACK',
    ADD = 'ADD',
    SUB = 'SUB',
    MUL = 'MUL',
    EDIV = 'EDIV',
    ABS = 'ABS',
    ISNAT = 'ISNAT',
    INT = 'INT',
    NEG = 'NEG',
    LSL = 'LSL',
    LSR = 'LSR',
    OR = 'OR',
    AND = 'AND',
    XOR = 'XOR',
    NOT = 'NOT',
    COMPARE = 'COMPARE',
    EQ = 'EQ',
    NEQ = 'NEQ',
    LT = 'LT',
    GT = 'GT',
    LE = 'LE',
    GE = 'GE',
    SELF = 'SELF',
    SELF_ADDRESS = 'SELF_ADDRESS',
    CONTRACT = 'CONTRACT',
    TRANSFER_TOKENS = 'TRANSFER_TOKENS',
    SET_DELEGATE = 'SET_DELEGATE',
    CREATE_CONTRACT = 'CREATE_CONTRACT',
    IMPLICIT_ACCOUNT = 'IMPLICIT_ACCOUNT',
    VOTING_POWER = 'VOTING_POWER',
    NOW = 'NOW',
    LEVEL = 'LEVEL',
    AMOUNT = 'AMOUNT',
    BALANCE = 'BALANCE',
    CHECK_SIGNATURE = 'CHECK_SIGNATURE',
    BLAKE2B = 'BLAKE2B',
    KECCAK = 'KECCAK',
    SHA3 = 'SHA3',
    SHA256 = 'SHA256',
    SHA512 = 'SHA512',
    HASH_KEY = 'HASH_KEY',
    SOURCE = 'SOURCE',
    SENDER = 'SENDER',
    ADDRESS = 'ADDRESS',
    CHAIN_ID = 'CHAIN_ID',
    TOTAL_VOTING_POWER = 'TOTAL_VOTING_POWER',
    PAIRING_CHECK = 'PAIRING_CHECK',
    SAPLING_EMPTY_STATE = 'SAPLING_EMPTY_STATE',
    SAPLING_VERIFY_UPDATE = 'SAPLING_VERIFY_UPDATE',
    TICKET = 'TICKET',
    READ_TICKET = 'READ_TICKET',
    SPLIT_TICKET = 'SPLIT_TICKET',
    JOIN_TICKETS = 'JOIN_TICKETS',
    OPEN_CHEST = 'OPEN_CHEST',
}