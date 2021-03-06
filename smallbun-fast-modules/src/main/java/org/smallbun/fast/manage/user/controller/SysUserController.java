/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2019 ‭‭‭‭‭‭‭‭‭‭‭‭[smallbun] www.smallbun.org
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

package org.smallbun.fast.manage.user.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.smallbun.fast.common.PageFactory;
import org.smallbun.fast.manage.user.entity.SysUserEntity;
import org.smallbun.fast.manage.user.service.SysUserService;
import org.smallbun.fast.manage.user.util.UserUtil;
import org.smallbun.fast.manage.user.vo.SysUserVO;
import org.smallbun.framework.annotation.AutoQueryDictValue;
import org.smallbun.framework.annotation.DemoEnvironment;
import org.smallbun.framework.annotation.LogAnnotation;
import org.smallbun.framework.base.BaseController;
import org.smallbun.framework.constant.OperateLogConstant;
import org.smallbun.framework.result.AjaxResult;
import org.smallbun.framework.result.PageableResult;
import org.smallbun.framework.result.ResponseResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static org.smallbun.framework.constant.ErrorMsgConstant.ID_NOT_BLANK_MSG;
import static org.smallbun.framework.constant.OperateLogConstant.*;
import static org.smallbun.framework.constant.UrlPrefixConstant.UNIQUE;
import static org.smallbun.framework.toolkit.AutoMapperUtil.mappingList;

/**
 * 用户控制器
 *
 * @author SanLi
 * Created by 2689170096@qq.com/SanLi on 2018/5/8
 */
@Validated
@RestController
@RequestMapping(value = "/user")
public class SysUserController extends BaseController {
	/**
	 * HTML页面路径前缀
	 */
	private static final String HTML_PREFIX = "modules/manage/user/";
	/**
	 * 模块名称
	 */
	private static final String MODEL = "用户模块";

	@Autowired
	public SysUserController(SysUserService sysUserService) {
		this.sysUserService = sysUserService;
	}

	@ModelAttribute
	protected SysUserVO model(HttpServletRequest request) {
		return sysUserService.model(request);
	}

	/**
	 * 列表页面
	 *
	 * @return {@link ModelAndView}
	 */
	@RequestMapping(value = {"", "/"})
	public ModelAndView list() {
		return new ModelAndView(HTML_PREFIX + "user_list.html");
	}


	/**
	 * form表单
	 *
	 * @return {@link ModelAndView}
	 */
	@GetMapping(value = "/form")
	@PreAuthorize("hasAuthority('manage:user:add') or hasAuthority('manage:user:edit')")
	@LogAnnotation(model = MODEL, action = OperateLogConstant.OPEN_VIEW_FORM)
	public ModelAndView form(SysUserVO user, Model model) {
		model.addAttribute("user", user);
		return new ModelAndView(HTML_PREFIX + "user_form.html");
	}

	/**
	 * 个人资料页面
	 *
	 * @return {@link ModelAndView}
	 */
	@GetMapping(value = "/profile")
	public ModelAndView profile(Model model) {
		//查询个人信息
		model.addAttribute("user", Objects.requireNonNull(UserUtil.getLoginUser()).getSysUser());
		return new ModelAndView(HTML_PREFIX + "profile.html");
	}

	/**
	 * 重置密码视图
	 * @return {@link ModelAndView}
	 */
	@GetMapping(value = "/settingPassword/view")
	public ModelAndView settingPassword(Model model) {
		model.addAttribute("username", Objects.requireNonNull(UserUtil.getLoginUser()).getUsername());
		return new ModelAndView(HTML_PREFIX + "setting_password.html");
	}

	/**
	 * 选择用户页面
	 * @return 地址
	 */
	@RequestMapping(value = "/selectUser")
	public ModelAndView selectUser() {
		return new ModelAndView(HTML_PREFIX + "select_user_list.html");
	}

	/**
	 * 获取当前用户个人信息
	 *
	 * @return {@link AjaxResult}
	 */
	@GetMapping(value = "/info")
	public AjaxResult info() {
		return AjaxResult.builder().result(Objects.requireNonNull(UserUtil.getLoginUser()).getSysUser()).build();
	}

	/**
	 * 保存或更新
	 *
	 * @param user 类型实体对象
	 * @return  {@link AjaxResult}
	 */
	@DemoEnvironment
	@PostMapping(value = "/saveOrUpdate")
	@PreAuthorize("hasAuthority('manage:user:add') or hasAuthority('manage:user:add')")
	@LogAnnotation(model = MODEL, action = OperateLogConstant.ADD_UPDATE)
	public AjaxResult saveOrUpdate(@Valid SysUserVO user) {
		return AjaxResult.builder().result(sysUserService.saveOrUpdate(user)).build();
	}

	/**
	 * 删除单条记录
	 *
	 * @param id 主键ID
	 * @return  {@link AjaxResult}
	 */
	@DemoEnvironment
	@PostMapping(value = "/removeById")
	@PreAuthorize("hasAuthority('manage:user:del')")
	@LogAnnotation(model = DEL_MODEL + MODEL, action = OperateLogConstant.DEL)
	public AjaxResult removeById(@NotBlank(message = ID_NOT_BLANK_MSG) @RequestParam(value = "id") String id) {
		return AjaxResult.builder().result(sysUserService.removeById(id)).build();
	}

	/**
	 * 删除多条记录
	 *
	 * @param id 主键ID集合
	 * @return  {@link AjaxResult}
	 */
	@DemoEnvironment
	@PostMapping(value = "/removeByIds")
	@PreAuthorize("hasAuthority('manage:user:del')")
	@LogAnnotation(model = DEL_MODEL + MODEL, action = OperateLogConstant.DEL)
	public AjaxResult removeByIds(@NotEmpty(message = ID_NOT_BLANK_MSG) @RequestParam(value = "ids") List<String> ids) {
		return AjaxResult.builder().result(sysUserService.removeByIds(ids)).build();
	}


	/**
	 * 分页查询
	 * @param page {@link Page}
	 * @param vo {@link SysUserVO}
	 * @return  {@link ResponseResult<SysUserEntity>}
	 */
	@AutoQueryDictValue
	@PostMapping(value = "/page")
	@LogAnnotation(model = MODEL + SELECT_PAGE_MODEL, action = OperateLogConstant.SELECT_PAGE)
	public ResponseResult<SysUserEntity> selectPage(Page<SysUserEntity> page, SysUserVO vo) {
		return new ResponseResult<>(sysUserService.selectPage(new PageFactory<SysUserEntity>().defaultPage(page), vo));
	}

	/**
	 * 查询全部
	 *
	 * @return AjaxResult
	 */
	@AutoQueryDictValue
	@RequestMapping(value = "/list")
	@LogAnnotation(model = MODEL + SELECT_LIST_MODEL, action = OperateLogConstant.SELECT_LIST)
	public AjaxResult list(QueryWrapper<SysUserEntity> wrapper) {
		return AjaxResult.builder()
				.result(mappingList(sysUserService.list(wrapper), new ArrayList<>(), SysUserVO.class)).build();
	}

	/**
	 * 唯一
	 * @param vo
	 * @return
	 */
	@RequestMapping(value = UNIQUE)
	public AjaxResult unique(SysUserVO vo) {
		return AjaxResult.builder().result(sysUserService.unique(vo)).build();
	}

	/**
	 * 修改密码
	 * @param oldPassword oldPassword
	 * @param newPassword newPassword
	 * @param confirmPassword confirmPassword
	 * @return AjaxResult
	 */
	@DemoEnvironment
	@PostMapping(value = "/changPassword")
	public AjaxResult changePassword(
			@NotBlank(message = "原密码不能为空") @RequestParam(value = "oldPassword", required = false) String oldPassword,
			@NotBlank(message = "新密码不能为空") @RequestParam(value = "newPassword", required = false) String newPassword,
			@NotBlank(message = "确认密码不能为空") @RequestParam(value = "confirmPassword", required = false) String confirmPassword) {
		return AjaxResult.builder().result(sysUserService.changePassword(oldPassword, newPassword, confirmPassword))
				.build();
	}

	/**
	 * 验证原密码
	 * @param oldPassword oldPassword
	 * @return AjaxResult
	 */
	@PostMapping(value = "/verifyOldPassword")
	public AjaxResult verifyOldPassword(
			@NotBlank(message = "原密码不能为空") @RequestParam(value = "oldPassword", required = false) String oldPassword) {
		return AjaxResult.builder().result(sysUserService.verifyOldPassword(oldPassword)).build();
	}

	/**
	 * 更新头像
	 * @param id
	 * @param url
	 * @return
	 */
	@PostMapping(value = "/updateHeadPortrait")
	public AjaxResult updateHeadPortrait(
			@NotBlank(message = ID_NOT_BLANK_MSG) @RequestParam(value = "id", required = false) String id,
			@NotBlank(message = "头像URL不能为空") @RequestParam(value = "url", required = false) String url) {
		return AjaxResult.builder().result(sysUserService.updateHeadPortrait(id, url)).build();
	}

	/**
	 * 设置密码
	 * @param password
	 * @return
	 */
	@DemoEnvironment
	@PostMapping(value = "/settingPassword")
	public AjaxResult settingPassword(
			@NotBlank(message = "密码不能为空") @RequestParam(value = "password", required = false) String password) {
		return AjaxResult.builder().result(sysUserService.changPassword(password)).build();
	}

	/**
	 * 注入SysUserService
	 */
	private final SysUserService sysUserService;
}
