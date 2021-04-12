import { BaseTable, CellTypeEnum, TableHeader, ToolButton } from 'z-table';

const header: TableHeader[] = [
    {
        type: CellTypeEnum.text,
        name: '编号',
        key: 'id',
    },
    {
        type: CellTypeEnum.text,
        name: '分类',
        key: 'typeName'
    },
    {
        type: CellTypeEnum.operator,
        name: '操作',
        key: 'operator',
        operators: [
            {
                name: '删除',
                type: 'delete'
            },
            {
                name: '编辑',
                type: 'edit'
            }
        ]
    }
];

const tools: ToolButton[] = [
    {
        name: '新增',
        type: 'add'
    }
];

const displayedColumns: string[] = header.map(item => item.key);

export const BlogTypeConfig: BaseTable = new BaseTable( [], header, displayedColumns, tools, '分类管理' );
