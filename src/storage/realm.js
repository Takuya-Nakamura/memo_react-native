const MemoSchema = {

    name: 'Memo',
    primaryKey: 'id',
    properties: {
        id: 'string',
        text: 'string',
        created: 'date',
        updated: 'date',
    }
};
const SettingSchema = {
    name: 'Setting',
    primaryKey: 'id',
    properties: {
        id: 'string',
        hand: 'string',
    }
}
export const realmOptions = {
    schemaVersion: 0,
    schema: [MemoSchema, SettingSchema]
}


