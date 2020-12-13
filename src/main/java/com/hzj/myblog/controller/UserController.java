package com.hzj.myblog.controller;

import com.google.gson.Gson;
import com.hzj.myblog.entity.ReturnResponse;
import com.hzj.myblog.model.User;
import com.hzj.myblog.entity.request.Login;
import com.hzj.myblog.service.UserService;
import com.hzj.myblog.utils.Constant;
import com.hzj.myblog.utils.CusAccessObjectUtil;
import com.hzj.myblog.utils.JwtUtil;
import com.hzj.myblog.utils.TCaptchaVerify;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 用户控制层
 *
 * @author hzj
 */
@RestController
@RequestMapping("/user")
@Api(value = "用户接口", tags = "用户接口")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;


    /**
     * 用户登录
     *
     * @param login 登录信息
     * @return 登录结果和信息
     */
    @PostMapping("/login")
    @ApiOperation(value = "登录", notes = "用户登录")
    public ReturnResponse<User> login(@Validated @RequestBody Login login) {
        User user = this.userService.findUserByAccountAndPassword(login);
        if (user != null) {
            String token = jwtUtil.createJwt(user.getUserId(), new Gson().toJson(user), Constant.JWT_TTL);
            return new ReturnResponse<>(1, token, user);
        }
        return new ReturnResponse<>(0, "用户名或密码错误", null);
    }

    @PostMapping("/register")
    @ApiOperation(value = "注册", notes = "用户注册")
    public ReturnResponse<User> register(@Validated @RequestBody Login register) {

        if (userService.findUserByAccount(register.getAccount()) != null) {
            return new ReturnResponse<>(0, "该邮箱已经被注册");
        }
        userService.addUser(register);
        return new ReturnResponse<>(1, "注册成功");
    }

    /**
     * 查询所有的用户
     *
     * @return 用户信息
     */
    @GetMapping("/findAllUser")
    @ApiOperation(value = "查询所有用户", notes = "查询所有用户")
    public List<User> findAllUser() {
        return userService.findAllUser();
    }

    @GetMapping("/findUserByNickname/{nickName}")
    @ApiOperation(value = "通过用户的昵称查询用户信息", notes = "通过用户的昵称查询用户信息")
    public ReturnResponse<User> findUserByNickname(@PathVariable("nickName") String nickName) {
        User user = userService.findUserByNickname(nickName);
        if (user == null) {
            return new ReturnResponse<>(0, "查询失败");
        }
        return new ReturnResponse<>(1, "查询成功", user);
    }

    /**
     * 发送注册邮件
     *
     * @param email 发送邮件
     * @return 返回结果
     */
    @GetMapping("/sendEmail/{email}")
    @ApiOperation(value = "发送注册验证码", notes = "注册码有效时间为5分钟")
    @ApiImplicitParam(name = "email", value = "邮箱地址", required = true, dataType = "String", paramType = "path", example = "1305696249@qq.com")
    public ReturnResponse<Object> sendEmail(@PathVariable("email") String email) {
        if (userService.findUserByAccount(email) != null) {
            return new ReturnResponse<>(0, "该邮箱已经被注册");
        }
        try {
            userService.sendRegisterEmail(email);
        } catch (MessagingException e) {
            e.printStackTrace();
            return new ReturnResponse<>(0, "邮件发送失败");
        }
        return new ReturnResponse<>(1, "邮件发送成功");
    }

    @GetMapping("/verifyTicket/{ticket}/{rand}")
    public ReturnResponse<Object> verifyTicket(@PathVariable("ticket") String ticket, @PathVariable("rand") String rand, HttpServletRequest request) {
        String ipAddress = CusAccessObjectUtil.getIpAddress(request);
        int verifyTicket = TCaptchaVerify.verifyTicket(ticket, rand, ipAddress);
        if (verifyTicket == -1) {
            return new ReturnResponse<>(0, "验证失败");
        }
        return new ReturnResponse<>(verifyTicket, "验证成功");
    }
}
