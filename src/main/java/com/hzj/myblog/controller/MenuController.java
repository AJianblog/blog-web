package com.hzj.myblog.controller;

import com.hzj.myblog.entity.ReturnResponse;
import com.hzj.myblog.model.Menu;
import com.hzj.myblog.service.MenuService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.apache.ibatis.jdbc.Null;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 菜单控制层
 *
 * @author hzj
 */
@RestController
@RequestMapping("/menu")
@Api(value = "菜单接口", tags = "菜单接口")
public class MenuController {

    @Autowired
    private MenuService menuService;

    @PostMapping("/add")
    @ApiOperation(value = "添加目录", notes = "添加目录")
    public ReturnResponse<Menu> addMenu(@RequestBody Menu menu) {
        menuService.addMenu(menu);
        return new ReturnResponse<>(200, "保存成功");
    }

    @DeleteMapping("/deleteMenu/{id}")
    @ApiOperation(value = "通过id删除目录", notes = "通过id删除目录")
    @ApiImplicitParam(name = "id", value = "目录id", required = true, paramType = "path", dataType = "Long", example = "1")
    public ReturnResponse<Null> deleteMenu(@PathVariable("id") Integer id) {
        menuService.deleteMenu(id);
        return new ReturnResponse<>(200, "删除成功");
    }

    @GetMapping("/findById/{id}")
    @ApiOperation(value = "通过id查询目录信息", notes = "通过id查询目录信息")
    @ApiImplicitParam(name = "id", value = "目录id", required = true, paramType = "path", dataType = "Long", example = "1")
    public ReturnResponse<List<Menu>> findById(@PathVariable("id") Integer id) {
        List<Menu> result = menuService.findById(id);
        return new ReturnResponse<>(200, "查询成功", result);
    }

    @GetMapping("/findByParentId/{parentId}")
    @ApiOperation(value = "通过父节点id查询目录信息", notes = "通过父节点id查询目录信息")
    @ApiImplicitParam(name = "parentId", value = "父节点id", required = true, paramType = "path", dataType = "Long", example = "1")
    public ReturnResponse<List<Menu>> findByParentId(@PathVariable("parentId") Integer parentId) {
        List<Menu> result = menuService.findParentId(parentId);
        return new ReturnResponse<>(200, "查询成功", result);
    }

    @PutMapping("/updateMenu")
    public ReturnResponse<Null> updateMenu(@RequestBody Menu menu) {
        menuService.updateMenu(menu);
        return new ReturnResponse<>(200, "更新成功");
    }
}
