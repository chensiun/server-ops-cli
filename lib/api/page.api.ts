
import request from '../services/request'
import * as helper from '../services/helper'
import { serverApi } from '../config/global'
import { from, Observable } from 'rxjs'

/* ** 页面相关 ** */
/* // *********************************************************** // */
export function listActivityPages(): Observable<any> {
  return from(request.getInstance().get(serverApi.pageList, {
    params: helper.buildQuery({}),
  }).then(response => response.data))
}

// 创建页面
export const createPage = (pageData): Observable<any> => {
  return from(request.getInstance().request({
    method: 'post',
    url: serverApi.createPage,
    data: helper.buildQuery(pageData),
  }).then(response => response.data))
}

// 创建页面
export const updatePage = (pageId, pageData) : Observable<any> => {
  return from(request.getInstance().request({
    method: 'put',
    url: serverApi.updatePage,
    data: helper.buildQuery(Object.assign({
      page_id: pageId,
    }, pageData)),
  }).then(response => response.data))
}

// 单个页面配置
export const fetchPageData = (pageId) : Observable<any> => {
  return from(request.getInstance().get(serverApi.pageData, {
    params: helper.buildQuery({
      page_id: pageId,
    })
  }).then(response => response.data))
}

/* ** 货架相关 ** */
/* // *********************************************************** // */
export const addShelfPosition = (pageId, requestData) : Observable<any> => {
  const ajax = request.getInstance()
  return from(ajax.request({
    method: 'post',
    url: serverApi.addShelfPosition,
    data: helper.buildQuery(Object.assign({
      page_id: pageId,
    }, requestData))
  }).then(response => response.data))
}

export const createShelf = (pageId, shelfId, position) : Observable<any> => {
  const ajax = request.getInstance()
  return from(ajax.request({
    method: 'put',
    url: serverApi.setShelfAt,
    data: helper.buildQuery({
      page_id: pageId,
      shelf_id: shelfId,
      position,
    }),
  }).then(response => response.data))
}

// 普通商品货架
export const listShelf = (pageId) : Observable<any> => {
  const ajax = request.getInstance()
  return from(ajax.get(serverApi.shelfList, {
    params: helper.buildQuery({
      page_id: pageId,
    }),
  }).then(response => response.data))
}

/* ** 红包相关 ** */
/* // *********************************************************** // */

export const addCoupon = (pageId, requestData) : Observable<any> => {
  const ajax = request.getInstance()
  return from(ajax.request({
    method: 'post',
    url: serverApi.addCoupon,
    data: helper.buildQuery(Object.assign({
      page_id: pageId,
    }, requestData))
  }).then(response => response.data))
}

export const listCoupon = (pageId) : Observable<any> => {
  const ajax = request.getInstance()
  return from(ajax.get(serverApi.listCoupon, {
    params: helper.buildQuery({
      page_id: pageId,
    }),
  }).then(response => response.data))
}

/* ** 热卖商品相关 ** */
/* // *********************************************************** // */

export const addGoods = (pageId, requestData) : Observable<any> => {
  const ajax = request.getInstance()
  return from(ajax.request({
    method: 'post',
    url: serverApi.addGoodsPosition,
    data: helper.buildQuery(Object.assign({
      page_id: pageId,
    }, requestData))
  }).then(response => response.data))
}

export const setGoods = (pageId, requestData) : Observable<any> => {
  const ajax = request.getInstance()
  return from(ajax.request({
    method: 'put',
    url: serverApi.setGoodsAt,
    data: helper.buildQuery(Object.assign({
      page_id: pageId,
    }, requestData))
  }).then(response => response.data))
}

export const listGoods = (pageId, device) : Observable<any> => {
  const ajax = request.getInstance()
  return from(ajax.get(serverApi.listGoods, {
    params: helper.buildQuery({
      page_id: pageId,
      device,
    }),
  }).then(response => response.data))
}

export const setPageGoodsModule = (pageId, device, imagePath) : Observable<any> => {
  const ajax = request.getInstance()
  return from(ajax.request({
    method: 'post',
    url: serverApi.setGoodsModule,
    data: helper.buildQuery({
      page_id: pageId,
      image_path: imagePath,
      device,
    }),
  }).then(response => response.data))
}

/* ** 分享红包 ** */
/* // *********************************************************** // */
export const bindShareCouponPack = (pageId, shareId) : Observable<any> => {
  const ajax = request.getInstance()
  return from(ajax.request({
    method: 'put',
    url: serverApi.bindShareCoupon,
    data: helper.buildQuery(Object.assign({
      page_id: pageId,
      share_id: shareId,
    }))
  }).then(response => response.data))
}

export const fetchShareCouponPack = (pageId) : Observable<any> => {
  const ajax = request.getInstance()
  return from(ajax.get(serverApi.fetchShareCoupon, {
    params: helper.buildQuery({
      page_id: pageId,
    }),
  }).then(response => response.data))
}

/* ** 限时抢购相关 ** */
/* // *********************************************************** // */

export const addFlashGoods = (pageId, requestData) : Observable<any> => {
  const ajax = request.getInstance()
  return from(ajax.request({
    method: 'post',
    url: serverApi.addFlashGoodsPosition,
    data: helper.buildQuery(Object.assign({
      page_id: pageId,
    }, requestData))
  }).then(response => response.data))
}

export const setFlashGoods = (pageId, position, skuId) : Observable<any> => {
  const ajax = request.getInstance()
  return from(ajax.request({
    method: 'put',
    url: serverApi.setFlashGoodsAt,
    data: helper.buildQuery({
      page_id: pageId,
      position,
      sku_id: skuId,
    }),
  }).then(response => response.data))
}

export const reloadFlashGoods = (pageId, position) : Observable<any> => {
  const ajax = request.getInstance()
  return from(ajax.request({
    method: 'put',
    url: serverApi.reloadFlashCache,
    data: helper.buildQuery({
      page_id: pageId,
      position,
    }),
  }).then(response => response.data))
}

export const listFlashGoods = (pageId) : Observable<any> => {
  const ajax = request.getInstance()
  return from(ajax.get(serverApi.listFlashGoods, {
    params: helper.buildQuery({
      page_id: pageId,
    }),
  }).then(response => response.data))
}

/* ** 预售商品相关 ** */
/* // *********************************************************** // */

export const addPresaleGoods = (pageId, requestData) : Observable<any> => {
  const ajax = request.getInstance()
  return from(ajax.request({
    method: 'post',
    url: serverApi.addPresaleGoodsPosition,
    data: helper.buildQuery(Object.assign({
      page_id: pageId,
    }, requestData))
  }).then(response => response.data))
}

export const setPresaleGoods = (pageId, requestData) : Observable<any> => {
  const ajax = request.getInstance()
  return from(ajax.request({
    method: 'put',
    url: serverApi.setPresaleGoodsAt,
    data: helper.buildQuery(Object.assign({
      page_id: pageId,
    }, requestData))
  }).then(response => response.data))
}

export const listPresaleGoods = (pageId, device) : Observable<any> => {
  const ajax = request.getInstance()
  return from(ajax.get(serverApi.listPresaleGoods, {
    params: helper.buildQuery({
      page_id: pageId,
      device,
    }),
  }).then(response => response.data))
}

export const setPagePresaleModule = (pageId, device, imagePath) : Observable<any> => {
  const ajax = request.getInstance()
  return from(ajax.request({
    method: 'post',
    url: serverApi.setPresaleModule,
    data: helper.buildQuery({
      page_id: pageId,
      device,
      image_path: imagePath,
    }),
  }).then(response => response.data))
}

export const reloadPagePresaleCached = (pageId) : Observable<any> => {
  const ajax = request.getInstance()
  return from(ajax.request({
    method: 'post',
    url: serverApi.reloadPresaleCache,
    data: helper.buildQuery({
      page_id: pageId,
    }),
  }).then(response => response.data))
}

/* ** 多楼层预售 ** */
/* // *********************************************************** // */

export const listFloorPresale = (pageId) => {
  const ajax = request.getInstance()
  return ajax.get(serverApi.listFloorPresale, {
    params: helper.buildQuery({
      page_id: pageId,
    }),
  }).then(response => response.data)
}

export const createPresaleFloor = (pageId, requestData) => {
  const ajax = request.getInstance()
  return ajax.request({
    method: 'post',
    url: serverApi.createPresaleFloor,
    data: helper.buildQuery(Object.assign({
      page_id: pageId,
    }, requestData))
  }).then(response => response.data)
}

export const addFloorPresaleGoods = (pageId, requestData) => {
  const ajax = request.getInstance()
  return ajax.request({
    method: 'post',
    url: serverApi.addFloorPresaleGoods,
    data: helper.buildQuery(Object.assign({
      page_id: pageId,
    }, requestData))
  }).then(response => response.data)
}

export const fetchFloorPresaleData = (pageId, index) => {
  const ajax = request.getInstance()
  return ajax.get(serverApi.fetchFloorPresaleData, {
    params: helper.buildQuery({
      page_id: pageId,
      index,
    }),
  }).then(response => response.data)
}

export const setFloorPresaleGoods = (pageId, requestData) => {
  const ajax = request.getInstance()
  return ajax.request({
    method: 'put',
    url: serverApi.setFloorPresaleGoods,
    data: helper.buildQuery(Object.assign({
      page_id: pageId,
    }, requestData))
  }).then(response => response.data)
}

export const setFloorPresaleConfig = (pageId, index, poster) => {
  const ajax = request.getInstance()
  return ajax.request({
    method: 'put',
    url: serverApi.setFloorPresaleConfig,
    data: helper.buildQuery({
      page_id: pageId,
      index,
      poster,
    })
  }).then(response => response.data)
}

export const reloadPageFloorPresaleCached = (pageId) => {
  const ajax = request.getInstance()
  return ajax.request({
    method: 'post',
    url: serverApi.reloadPageFloorPresaleCached,
    data: helper.buildQuery({
      page_id: pageId,
    }),
  }).then(response => response.data)
}
