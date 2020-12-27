package com.hzj.myblog.model;

/**
 * 菜单实体
 *
 * @author hzj
 */
public class Menu {
    /**
     * 目录Id
     */
    private Integer id;

    /**
     * 父节点ID
     */
    private Integer parentId;

    /**
     * 父节点ID集合
     */
    private String parentIds;

    /**
     * 排序
     */
    private Integer sort;

    /**
     * 博客ID
     */
    private Integer blogId;

    /**
     * 目录菜单
     */
    private String title;

    public Menu() {
    }

    public Menu(Integer id, Integer parentId, String parentIds, Integer sort, Integer blogId, String title) {
        this.id = id;
        this.parentId = parentId;
        this.parentIds = parentIds;
        this.sort = sort;
        this.blogId = blogId;
        this.title = title;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getParentId() {
        return parentId;
    }

    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }

    public String getParentIds() {
        return parentIds;
    }

    public void setParentIds(String parentIds) {
        this.parentIds = parentIds;
    }

    public Integer getSort() {
        return sort;
    }

    public void setSort(Integer sort) {
        this.sort = sort;
    }

    public Integer getBlogId() {
        return blogId;
    }

    public void setBlogId(Integer blogId) {
        this.blogId = blogId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Override
    public String toString() {
        return "Menu{" +
                "id=" + id +
                ", parentId=" + parentId +
                ", parentIds='" + parentIds + '\'' +
                ", sort=" + sort +
                ", blogId=" + blogId +
                ", title='" + title + '\'' +
                '}';
    }
}
