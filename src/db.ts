import { Dexie, type Table } from 'dexie';

export interface MageInfo {
    id?: number,
    mageName: string,
    pfp: string | File,
}

export interface MageNote {
    id?: number;
    mageId: number;    
    title: string;
    content: string;   
    category: string;  
    createdAt: number;
    updatedAt: number;
}

export class MyDatabase extends Dexie {
    mageInfo!: Table<MageInfo>
    constructor() {
        super('MagicLibrary')
        this.version(1).stores({
            mageInfo: '++id, mageName',
        })
    }
}

export const db = new MyDatabase()
