/**
 * @author hzj
 * 博客分类实体
 */
export class BlogType {
    /**
     * 分类的id,主键
     */
    id: number;
    /**
     * 分类的名称
     */
    typeName: string;


    constructor() {
        this.id = 0;
        this.typeName = null;
    }
}
