import {Component, OnInit} from '@angular/core';
import {CodeEnum} from "../../../entity/code-enum";
import {TagService} from "../../../@core/interface/tag-service";
import {TagBlogTypeGroup} from "../../../entity/group/TagBlogTypeGroup";
import {MatDialog} from "@angular/material/dialog";
import {
    EditBlogLabelDialogComponent,
    EditBlogLabelDialogInputModule
} from "./edit-blog-label-dialog/edit-blog-label-dialog.component";
import {Tag} from "../../../model/tag";
import {SnackBarService} from "../../../service/snackBar.service";
import {PageResult} from "../../../entity/page-result";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";

@Component({
    selector: 'app-blog-label',
    templateUrl: './blog-label.component.html',
    styleUrls: ['./blog-label.component.scss']
})
export class BlogLabelComponent implements OnInit {

    displayedColumns: string[] = ['id', 'tagName', 'blogType', 'operation'];

    description: any = {
        id: '编号',
        tagName: '标签',
        operation: '操作'
    };

    /**
     * 页数
     */
    pageIndex: number = 1;

    /**
     * 页条数
     */
    pageSize: number = 10;

    /**
     * 分页结果
     */
    pageResult: PageResult<TagBlogTypeGroup>;

    constructor(private tagService: TagService, private dialog: MatDialog, private snackbarService: SnackBarService,
                private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        this.route.queryParamMap.subscribe((params: Params) => {
            this.pageIndex = params.get('pageIndex') || 1;
            this.pageSize = params.get('pageSize') || 10;
            this.findAllTag();
        });
    }

    /**
     * 分页查找标签信息
     */
    findAllTag() {
        this.tagService.findAllTag(this.pageIndex, this.pageSize).subscribe(data => {
            if (data.code === CodeEnum.SUCCESS) {
                this.pageResult = data.data;
            }
        })
    }

    /**
     * 编辑博客标签
     * @param tagBlogTypeGroup 博客标签
     */
    edit(tagBlogTypeGroup: TagBlogTypeGroup) {
        let tag: Tag = {
            tagName: tagBlogTypeGroup.tagName,
            blogTypeId: tagBlogTypeGroup.blogTypeId,
            id: tagBlogTypeGroup.id
        };
        const dialogInputData: EditBlogLabelDialogInputModule = {
            dialogTitle: '更改标签名称',
            tag
        };
        const dialogRef = this.dialog.open(EditBlogLabelDialogComponent, {
            width: '520px',
            data: dialogInputData
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                tag = Object.assign(tag, result);
                this.tagService.updateTag(tag).subscribe(data => {
                    if (data.code === CodeEnum.SUCCESS) {
                        this.snackbarService.success(data.message);
                        this.findAllTag();
                    }
                })
            }
        })
    }

    /**
     * 点击新建事件
     */
    create() {
        const dialogInputData: EditBlogLabelDialogInputModule = {
            dialogTitle: '新建博客标签'
        };
        const dialogRef = this.dialog.open(EditBlogLabelDialogComponent, {
            width: '520px',
            data: dialogInputData
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.addTag(result);
            }
        })
    }

    /**
     * 添加博客标签
     * @param tag 博客标签
     */
    addTag(tag: Tag) {
        this.tagService.addTag(tag).subscribe(data => {
            console.log(data);
            if (data.code === CodeEnum.SUCCESS) {
                this.snackbarService.success(data.message);
            }
            this.findAllTag();
        })
    }

    /**
     * 分页改变事件
     */
    page(pageEvent: PageEvent) {
        this.router.navigate(['./'], {
            queryParams: {
                pageIndex: pageEvent.pageIndex + 1,
                pageSize: pageEvent.pageSize
            },
            relativeTo: this.route
        })
    }
}
