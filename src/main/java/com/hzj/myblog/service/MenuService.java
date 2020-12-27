package com.hzj.myblog.service;

import com.hzj.myblog.model.Menu;

import java.util.List;

/**
 * 菜单service层
 *
 * @author hzj
 */
public interface MenuService {

    /**
     * 添加目录
     *
     * @param menu 目录信息
     */
    void addMenu(Menu menu);

    /**
     * 通过id删除目录
     *
     * @param id 目录id
     */
    void deleteMenu(Integer id);

    /**
     * 查询目录通过id
     *
     * @param id 菜单id
     * @return 菜单信息列表
     */
    List<Menu> findById(Integer id);

    /**
     * 查询目录信息通过父节点id
     *
     * @param parentId 父节点id
     * @return 菜单信息列表
     */
    List<Menu> findParentId(Integer parentId);

    /**
     * 更新目录信息
     *
     * @param menu 目录信息
     */
    void updateMenu(Menu menu);
}
