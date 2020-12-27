package com.hzj.myblog.mapper;

import com.hzj.myblog.model.Menu;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface MenuMapper {

    /**
     * 添加目录
     *
     * @param menu 菜单信息
     */
    @Insert("INSERT INTO menu(parentId, parentIds, sort, blogId, title) VALUE (#{parentId}, #{parentIds}, #{sort}, #{blogId}, #{title})")
    void addMenu(Menu menu);

    /**
     * 删除目录
     *
     * @param id 目录ID
     */
    @Delete("DELETE FROM menu where id = #{id}")
    void deleteMenu(@Param("id") Integer id);

    /**
     * 通过id查询目录信息
     *
     * @param id 目录id
     * @return 菜单列表
     */
    @Select("SELECT id, parentId, parentIds, title, sort, blogId from menu where id = #{id}")
    List<Menu> findById(@Param("id") Integer id);

    /**
     * 通过父节点id查询目录信息
     *
     * @param parentId 父节点id
     * @return 菜单信息列表
     */
    @Select("SELECT id, parentId, parentIds, title, sort, blogId from menu where parentId = #{parentId}")
    List<Menu> findByParentId(@Param("parentId") Integer parentId);

    @Update("UPDATE menu SET parentIds = #{parentIds}, parentIds = #{parentIds}, title = #{title}, sort = #{sort}, blogId = #{blogId} where id = #{id}")
    void updateMenu(Menu menu);
}
