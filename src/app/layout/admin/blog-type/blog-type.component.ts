import { Component, OnInit } from '@angular/core';
import { BlogTypeService } from '../../../@core/interface/blog-type.service';
import { BlogType } from '../../../model/blog-type';
import { CodeEnum } from '../../../entity/code-enum';
import { MatDialog } from '@angular/material/dialog';
import {
    EditBlogTypeDialogComponent,
    EditBlogTypeDialogInputModule
} from './edit-blog-type-dialog/edit-blog-type-dialog.component';
import { SnackBarService } from '../../../service/snackBar.service';
import {
    ConfirmDialogComponent,
    ConfirmDialogInputModule
} from '../../../@theme/component/confirm-dialog/confirm-dialog.component';
import { BaseTable, ToolButton } from 'z-table';
import { BlogTypeConfig } from './blog-type.config';

@Component( {
    selector: 'app-blog-type',
    templateUrl: './blog-type.component.html',
    styleUrls: [ './blog-type.component.scss' ]
} )
export class BlogTypeComponent implements OnInit {
    tableModule: BaseTable = BlogTypeConfig;

    constructor( private blogTypeService: BlogTypeService, private dialog: MatDialog, private snackbarService: SnackBarService ) {
    }

    ngOnInit() {
        this.findAllBlogType();
    }

    handleToolsClick( tool: ToolButton ): void {
        if ( tool.type === 'add' ) {
            this.create();
        }
    }

    handleOperatorClick( data: any ): void {
        if (data.operator.type === 'delete') {
            this.deleteBlogType(data.rowData);
        } else if (data.operator.type === 'edit') {
            this.editBlogType(data.rowData);
        }
    }

    findAllBlogType() {
        this.blogTypeService.findAllBlogType().subscribe( data => {
            if ( data.code === CodeEnum.SUCCESS ) {
                this.tableModule.dataSource = data.data;
            }

        } );
    }

    /**
     * 编辑博客分类
     * @param blogType 博客分类内容
     */
    editBlogType( blogType: BlogType ) {
        const dialogData: EditBlogTypeDialogInputModule = { dialogTitle: '编辑博客分类', typeName: blogType.typeName };
        const dialogRef = this.dialog.open( EditBlogTypeDialogComponent, {
            width: '520px',
            data: dialogData
        } );
        dialogRef.afterClosed().subscribe( result => {
            if ( result ) {
                blogType = Object.assign( blogType, result );
                this.blogTypeService.updateBlogType( blogType ).subscribe( data => {
                    if ( data.code === CodeEnum.SUCCESS ) {
                        this.snackbarService.success( data.message );
                        this.findAllBlogType();
                    }
                } );
            }
        } );
    }

    /**
     * 删除博客分类
     * @param blogType 博客分类
     */
    deleteBlogType( blogType: BlogType ) {
        const dialogData: ConfirmDialogInputModule = new ConfirmDialogInputModule( '删除提示', `你确定要删除${ blogType.typeName }这个分类吗?` );
        const dialogRef = this.dialog.open( ConfirmDialogComponent, {
            width: '520px',
            data: dialogData
        } );
        dialogRef.afterClosed().subscribe( result => {
            if ( result ) {
                this.blogTypeService.deleteBlogType( blogType.id ).subscribe( data => {
                    if ( data.code === CodeEnum.SUCCESS ) {
                        this.findAllBlogType();
                    }
                    this.snackbarService.success( data.message );
                } );
            }
        } );
    }

    /**
     *
     */
    create() {
        const dialogData: EditBlogTypeDialogInputModule = { dialogTitle: '创建博客分类' };
        const dialogRef = this.dialog.open( EditBlogTypeDialogComponent, {
            width: '520px',
            data: dialogData
        } );
        dialogRef.afterClosed().subscribe( result => {
            if ( result ) {
                this.addBlogType( result.typeName );
            }
        } );
    }

    /**
     * 添加博客分类
     * @param typeName 分类名称
     */
    addBlogType( typeName: string ) {
        this.blogTypeService.addBlogType( typeName ).subscribe( data => {
            if ( data.code === CodeEnum.SUCCESS ) {
                this.snackbarService.success( data.message );
                this.findAllBlogType();
            }
        } );
    }

}
