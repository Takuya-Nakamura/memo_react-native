import Realm from 'realm'

const MemoSchema = {
    name: 'Memo',
    properties: {
        name: 'string',
        body: 'string',
    }
};

export const realm = Realm.open({ schema: [MemoSchema] });

