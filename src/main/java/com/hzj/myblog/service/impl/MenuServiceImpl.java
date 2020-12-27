package com.hzj.myblog.service.impl;

import com.hzj.myblog.mapper.MenuMapper;
import com.hzj.myblog.model.Menu;
import com.hzj.myblog.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuServiceImpl implements MenuService {

    @Autowired
    private MenuMapper menuMapper;

    /**
     * 添加目录
     *
     * @param menu 目录信息
     */
    @Override
    public void addMenu(Menu menu) {
        menuMapper.addMenu(menu);
    }

    /**
     * 通过id删除目录
     *
     * @param id 目录id
     */
    @Override
    public void deleteMenu(Integer id) {
        menuMapper.deleteMenu(id);
    }

    /**
     * 查询目录通过id
     *
     * @param id 菜单id
     * @return 菜单信息列表
     */
    @Override
    public List<Menu> findById(Integer id) {
        return menuMapper.findById(id);
    }

    /**
     * 查询目录信息通过父节点id
     *
     * @param parentId 父节点id
     * @return 菜单信息列表
     */
    @Override
    public List<Menu> findParentId(Integer parentId) {
        return menuMapper.findByParentId(parentId);
    }

    /**
     * 更新目录信息
     *
     * @param menu 目录信息
     */
    @Override
    public void updateMenu(Menu menu) {
        menuMapper.updateMenu(menu);
    }
}
