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

package org.smallbun.fast.manage.org.service;

import org.smallbun.fast.common.base.BaseTreeService;
import org.smallbun.fast.manage.org.entity.SysOrgEntity;
import org.smallbun.fast.manage.org.vo.SysOrgVO;

import javax.servlet.http.HttpServletRequest;
import java.io.Serializable;
import java.util.List;

/**
 * 部门service接口
 *
 * @author SanLi
 * Created by 2689170096@qq.com on 2018/8/3
 */
public interface SysOrgService extends BaseTreeService<SysOrgEntity> {
	/**
	 * model
	 * @param request
	 * @return
	 */
	SysOrgVO model(HttpServletRequest request);

	/**
	 * 根据角色id获取菜单
	 *
	 * @param id
	 * @return
	 */
	List<SysOrgEntity> findByRoleId(Serializable id);

	/**
	 * 唯一
	 * @param org
	 * @return
	 */
	@Override
	Boolean unique(SysOrgEntity org);
}
