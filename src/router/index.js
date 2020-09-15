import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store/index";
import { Message } from 'element-ui';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import * as pages from "../util/pages"


NProgress.configure({
    showSpinner: false,
})

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        component: pages.Login,
        beforeEnter: (to, from, next) => {
            next();
        }
    },
    {
        path: '/esc',
        component: () => import('../views/Home.vue'),
        meta: {
            requireAuth: true,
        },
        beforeEnter: (to, from, next) => {
            next()
        },
        children: [
            {
                path: 'center',
                component: pages.PageRouter,
                meta: {
                    requireAuth: true,
                    role: 1
                },
                beforeEnter: (to, from, next) => {
                    next();
                },
                children: [
                    {
                        path: '1',
                        name: '数据快报',
                        icon: 'el-icon-s-data',
                        meta: {
                            bread: [
                                { path: '/esc/center/1', name: '数据快报' }
                            ],
                            requireAuth: true,
                            role: 1
                        },
                        component: () => import('../views/Data.vue'),
                        beforeEnter: (to, from, next) => {
                            next();
                        },
                    },


                    // 下层有伪子路由
                    {
                        path: '3',
                        name: '培训人员列表',
                        icon: 'el-icon-user-solid',
                        meta: {
                            bread: [
                                { path: '/esc/center/3', name: '培训人员列表' }
                            ],
                            requireAuth: true,
                            role: 1
                        },
                        component: pages.StaffManage,
                        beforeEnter: (to, from, next) => {
                            next();
                        },
                    },
                    // 伪子路由
                    {
                        path: '3-1',
                        name: '人员详情',
                        meta: {
                            bread: [
                                { path: '/esc/center/3', name: '人员管理' },
                                { path: '/esc/center/3-1', name: '人员详情' }
                            ],
                            requireAuth: true,
                            role: 1,
                            isChild: true
                        },
                        component: pages.StaffDetail,
                        beforeEnter: (to, from, next) => {
                            next();
                        },
                    },

                    {
                        path: '2',
                        meta: {
                            bread: [
                                { path: '/esc/center/2', name: '服务中心' }
                            ],
                            requireAuth: true,
                            role: 1
                        },
                        hasChildName: '服务中心',
                        icon: 'el-icon-school',
                        component: pages.PageRouter,
                        beforeEnter: (to, from, next) => {
                            next();
                        },
                        children: [
                            {
                                path: '2-1',
                                hasChildName: '来电记录',
                                meta: {
                                    bread: [
                                        { path: '/esc/center/2', name: '服务中心' },
                                        { path: '/esc/center/2/2-1', name: '来电记录' }
                                    ],
                                    requireAuth: true,
                                    role: 1
                                },
                                component: pages.PageRouter,
                                beforeEnter: (to, from, next) => {
                                    next();
                                },
                                children: [
                                    {
                                        path: '',
                                        name: '来电记录',
                                        meta: {
                                            bread: [
                                                { path: '/esc/center/2', name: '服务中心' },
                                                { path: '/esc/center/2/2-1', name: '来电记录' },
                                            ],
                                            requireAuth: true,
                                            role: 1
                                        },
                                        component: pages.CallRecord,
                                        beforeEnter: (to, from, next) => {
                                            next();
                                        },
                                    },
                                    {
                                        path: '2-1-1',
                                        meta: {
                                            bread: [
                                                { path: '/esc/center/2', name: '服务中心' },
                                                { path: '/esc/center/2/2-1', name: '来电记录' },
                                                { path: '/esc/center/2/2-1/2-1-1', name: '来电详情' },
                                            ],
                                            requireAuth: true,
                                            role: 1
                                        },
                                        component: pages.CallRecordDetail,
                                        beforeEnter: (to, from, next) => {
                                            next();
                                        },
                                    },
                                    {
                                        path: '*',
                                        redirect: '../2-1'
                                    }
                                ]
                            },
                            {
                                path: '2-2',
                                hasChildName: '订单派工',
                                meta: {
                                    bread: [
                                        { path: '/esc/center/2', name: '服务中心' },
                                        { path: '/esc/center/2/2-2', name: '订单派工' }
                                    ],
                                    requireAuth: true,
                                    role: 1
                                },
                                component: pages.PageRouter,
                                beforeEnter: (to, from, next) => {
                                    next();
                                },
                                children: [
                                    {
                                        path: '',
                                        name: '订单派工',
                                        meta: {
                                            bread: [
                                                { path: '/esc/center/2', name: '服务中心' },
                                                { path: '/esc/center/2/2-2', name: '订单派工' },
                                            ],
                                            requireAuth: true,
                                            role: 1
                                        },
                                        component: pages.OrderDesignate,
                                        beforeEnter: (to, from, next) => {
                                            next();
                                        },
                                    },
                                    {
                                        path: '2-2-1',
                                        meta: {
                                            bread: [
                                                { path: '/esc/center/2', name: '服务中心' },
                                                { path: '/esc/center/2/2-2', name: '订单派工' },
                                                { path: '/esc/center/2/2-2/2-2-1', name: '订单详情' },
                                            ],
                                            requireAuth: true,
                                            role: 1
                                        },
                                        component: pages.OrderDesignateDetail,
                                        beforeEnter: (to, from, next) => {
                                            next();
                                        },
                                    },
                                    {
                                        path: '*',
                                        redirect: '../2-2'
                                    }
                                ]
                            },
                            {
                                path: '2-3',
                                meta: {
                                    bread: [
                                        { path: '/esc/center/2', name: '服务中心' },
                                        { path: '/esc/center/2/2-3', name: '其他需求' }
                                    ],
                                    requireAuth: true,
                                    role: 1
                                },
                                hasChildName: '其他需求',
                                component: pages.PageRouter,
                                beforeEnter: (to, from, next) => {
                                    next();
                                },
                                children: [
                                    {
                                        path: '',
                                        name: '其他需求',
                                        meta: {
                                            bread: [
                                                { path: '/esc/center/2', name: '服务中心' },
                                                { path: '/esc/center/2/2-3', name: '其他需求' },
                                            ],
                                            requireAuth: true,
                                            role: 1
                                        },
                                        component: pages.OrtherRequest,
                                        beforeEnter: (to, from, next) => {
                                            next();
                                        },
                                    },
                                    {
                                        path: '2-3-1',
                                        meta: {
                                            bread: [
                                                { path: '/esc/center/2', name: '服务中心' },
                                                { path: '/esc/center/2/2-3', name: '其他需求' },
                                                { path: '/esc/center/2/2-3/2-3-1', name: '需求详情' },
                                            ],
                                            requireAuth: true,
                                            role: 1
                                        },
                                        component: pages.OrtherRequestDetail,
                                        beforeEnter: (to, from, next) => {
                                            next();
                                        },
                                    },
                                    {
                                        path: '*',
                                        redirect: '../2-3'
                                    }
                                ]
                            },
                            {
                                path: '',
                                redirect: '2-1'
                            },
                            {
                                path: '*',
                                redirect: '2-1'
                            }
                        ]
                    },


                    // 下层有伪子路由
                    {
                        path: '4',
                        name: '服务记录',
                        icon: 'el-icon-s-claim',
                        meta: {
                            bread: [
                                { path: '/esc/center/4', name: '服务记录' }
                            ],
                            requireAuth: true,
                            role: 1
                        },
                        component: pages.ServiceRecord,
                        beforeEnter: (to, from, next) => {
                            next();
                        },
                    },
                    // 伪子路由
                    {
                        path: '4-1',
                        name: '服务详情',
                        meta: {
                            bread: [
                                { path: '/esc/center/4', name: '服务记录' },
                                { path: '/esc/center/4-1', name: '服务详情' }
                            ],
                            requireAuth: true,
                            role: 1,
                            isChild: true
                        },
                        component: pages.ServiceRecordOrderDetail,
                        beforeEnter: (to, from, next) => {
                            next();
                        },
                    },
                    // 伪子路由
                    {
                        path: '4-2',
                        name: '活动详情',
                        meta: {
                            bread: [
                                { path: '/esc/center/4', name: '服务记录' },
                                { path: '/esc/center/4-2', name: '活动详情' }
                            ],
                            requireAuth: true,
                            role: 1,
                            isChild: true
                        },
                        component: pages.ServiceRecordActivityDetail,
                        beforeEnter: (to, from, next) => {
                            next();
                        },
                    },

                    {
                        path: '5',
                        icon: 'el-icon-alarm-clock',
                        meta: {
                            bread: [
                                { path: '/esc/center/5', name: '活动管理' }
                            ],
                            requireAuth: true,
                            role: 1
                        },
                        hasChildName: '活动管理',
                        component: pages.PageRouter,
                        beforeEnter: (to, from, next) => {
                            next();
                        },
                        children: [
                            {
                                path: '5-1',
                                meta: {
                                    bread: [
                                        { path: '/esc/center/5', name: '活动管理' },
                                        { path: '/esc/center/5/5-1', name: '活动记录' }
                                    ],
                                    requireAuth: true,
                                    role: 1
                                },
                                hasChildName: '活动记录',
                                component: pages.PageRouter,
                                beforeEnter: (to, from, next) => {
                                    next();
                                },
                                children: [
                                    {
                                        path: '',
                                        name: '活动记录',
                                        meta: {
                                            bread: [
                                                { path: '/esc/center/5', name: '活动管理' },
                                                { path: '/esc/center/5/5-1', name: '活动记录' }
                                            ],
                                            requireAuth: true,
                                            role: 1
                                        },
                                        component: pages.ActivityManage,
                                        beforeEnter: (to, from, next) => {
                                            next();
                                        },
                                    },
                                    {
                                        path: '5-1-1',
                                        name: '活动详情',
                                        meta: {
                                            bread: [
                                                { path: '/esc/center/5', name: '活动管理' },
                                                { path: '/esc/center/5/5-1', name: '活动记录' },
                                                { path: '/esc/center/5/5-1/5-1-1', name: '活动详情' }
                                            ],
                                            requireAuth: true,
                                            role: 1
                                        },
                                        component: pages.ActivityManageDetail,
                                        beforeEnter: (to, from, next) => {
                                            next();
                                        },
                                    },
                                    {
                                        path: '*',
                                        redirect: '../5-1'
                                    }
                                ]
                            },
                            {
                                path: '5-2',
                                meta: {
                                    bread: [
                                        { path: '/esc/center/5', name: '活动管理' },
                                        { path: '/esc/center/5/5-2', name: '活动审批' }
                                    ],
                                    requireAuth: true,
                                    role: 1
                                },
                                hasChildName: '活动审批',
                                component: pages.PageRouter,
                                beforeEnter: (to, from, next) => {
                                    next();
                                },
                                children: [
                                    {
                                        path: '',
                                        name: '活动审批',
                                        meta: {
                                            bread: [
                                                { path: '/esc/center/5', name: '活动管理' },
                                                { path: '/esc/center/5/5-2', name: '活动审批' }
                                            ],
                                            requireAuth: true,
                                            role: 1
                                        },
                                        component: pages.ActivityApprove,
                                        beforeEnter: (to, from, next) => {
                                            next();
                                        },
                                    },
                                    {
                                        path: '5-2-1',
                                        name: '活动详情',
                                        meta: {
                                            bread: [
                                                { path: '/esc/center/5', name: '活动管理' },
                                                { path: '/esc/center/5/5-2', name: '活动审批' },
                                                { path: '/esc/center/5/5-2/5-2-1', name: '活动详情' }
                                            ],
                                            requireAuth: true,
                                            role: 1
                                        },
                                        component: pages.ActivityApproveDetail,
                                        beforeEnter: (to, from, next) => {
                                            next();
                                        },
                                    },
                                    {
                                        path: '*',
                                        redirect: '../5-2'
                                    }
                                ]
                            },
                            {
                                path: '',
                                redirect: '5-1'
                            },
                            {
                                path: '*',
                                redirect: '5-1'
                            }
                        ]
                    },
                    {
                        path: '6',
                        meta: {
                            bread: [
                                { path: '/esc/center/6', name: '机构管理' }
                            ],
                            requireAuth: true,
                            role: 1
                        },
                        hasChildName: '机构管理',
                        icon: 'el-icon-suitcase',
                        component: pages.PageRouter,
                        beforeEnter: (to, from, next) => {
                            next();
                        },
                        children: [
                            {
                                path: '6-1',
                                name: '中心信息',
                                meta: {
                                    bread: [
                                        { path: '/esc/center/6', name: '机构管理' },
                                        { path: '/esc/center/6/6-1', name: '中心信息' }
                                    ],
                                    requireAuth: true,
                                    role: 1
                                },
                                component: pages.ComponyMsg,
                                beforeEnter: (to, from, next) => {
                                    next();
                                },
                            },
                            {
                                path: '6-2',
                                name: '分支机构',
                                meta: {
                                    bread: [
                                        { path: '/esc/center/6', name: '机构管理' },
                                        { path: '/esc/center/6/6-2', name: '分支机构' }
                                    ],
                                    requireAuth: true,
                                    role: 1
                                },
                                component: pages.BranchOrg,
                                beforeEnter: (to, from, next) => {
                                    next();
                                },
                            },
                            {
                                path: '6-3',
                                name: '员工信息',
                                meta: {
                                    bread: [
                                        { path: '/esc/center/6', name: '机构管理' },
                                        { path: '/esc/center/6/6-3', name: '员工信息' }
                                    ],
                                    requireAuth: true,
                                    role: 1
                                },
                                component: pages.StaffInfo,
                                beforeEnter: (to, from, next) => {
                                    next();
                                },
                            },
                            {
                                path: '',
                                redirect: '6-1'
                            },
                            {
                                path: '*',
                                redirect: '6-1'
                            }
                        ]
                    },
                    {
                        path: '7',
                        meta: {
                            bread: [
                                { path: '/esc/center/7', name: '业务管理' }
                            ],
                            requireAuth: true,
                            role: 1
                        },
                        hasChildName: '业务管理',
                        icon: 'el-icon-document-copy',
                        component: pages.PageRouter,
                        beforeEnter: (to, from, next) => {
                            next();
                        },
                        children: [
                            {
                                path: '7-1',
                                name: '服务类型管理',
                                meta: {
                                    bread: [
                                        { path: '/esc/center/7', name: '业务管理' },
                                        { path: '/esc/center/7/7-1', name: '服务类型管理' }
                                    ],
                                    requireAuth: true,
                                    role: 1
                                },
                                component: pages.ServiceType,
                                beforeEnter: (to, from, next) => {
                                    next();
                                },
                            },
                            {
                                path: '7-2',
                                name: '服务项目管理',
                                meta: {
                                    bread: [
                                        { path: '/esc/center/7', name: '业务管理' },
                                        { path: '/esc/center/7/7-2', name: '服务项目管理' }
                                    ],
                                    requireAuth: true,
                                    role: 1
                                },
                                component: pages.ServiceItem,
                                beforeEnter: (to, from, next) => {
                                    next();
                                },
                            },
                            {
                                path: '',
                                redirect: '7-1'
                            },
                            {
                                path: '*',
                                redirect: '7-1'
                            }
                        ]
                    },
                    // 下层有伪子路由
                    {
                        path: '8',
                        name: '会员管理',
                        icon: 'el-icon-star-off',
                        meta: {
                            bread: [
                                { path: '/esc/center/8', name: '会员管理' }
                            ],
                            requireAuth: true,
                            role: 1
                        },
                        component: pages.MemberManage,
                        beforeEnter: (to, from, next) => {
                            next();
                        },
                    },
                    // 伪子路由
                    {
                        path: '8-1',
                        name: '会员详情',
                        meta: {
                            bread: [
                                { path: '/esc/center/8', name: '会员管理' },
                                { path: '/esc/center/8-1', name: '会员详情' }
                            ],
                            requireAuth: true,
                            role: 1,
                            isChild: true
                        },
                        component: pages.MemberManageDetail,
                        beforeEnter: (to, from, next) => {
                            next();
                        },
                    },

                    // // 下层有伪子路由
                    // {
                    //     path: '9',
                    //     name: '账号管理',
                    //     icon: 'el-icon-s-check',
                    //     meta: {
                    //         bread: [
                    //             {path: '/esc/center/9', name: '账号管理'}
                    //         ],
                    //         requireAuth: true,
                    //         role: 1
                    //     },
                    //     component: pages.AccountManage,
                    //     beforeEnter: (to, from, next) => {
                    //         next();
                    //     },
                    // },
                    // // 伪子路由
                    // {
                    //     path: '9-1',
                    //     name: '账号详情',
                    //     meta: {
                    //         bread: [
                    //             {path: '/esc/center/9', name: '账号管理'},
                    //             {path: '/esc/center/9-1', name: '账号详情'}
                    //         ],
                    //         requireAuth: true,
                    //         role: 1,
                    //         isChild: true
                    //     },
                    //     component: pages.AccountManageDetail,
                    //     beforeEnter: (to, from, next) => {
                    //         next();
                    //     },
                    // },
                    {
                        path: '10',
                        name: '结算管理',
                        icon: 'el-icon-bank-card',
                        meta: {
                            bread: [
                                { path: '/esc/center/10', name: '结算管理' }
                            ],
                            requireAuth: true,
                            role: 1
                        },
                        component: pages.SettlementManage,
                        beforeEnter: (to, from, next) => {
                            next();
                        },
                    },
                    {
                        path: '11',
                        name: '区域管理',
                        icon: 'el-icon-map-location',
                        meta: {
                            bread: [
                                { path: '/esc/center/11', name: '区域管理' }
                            ],
                            requireAuth: true,
                            role: 1,
                            isAdmin: true
                        },
                        component: pages.AreaManage,
                        beforeEnter: (to, from, next) => {
                            next();
                        },
                    },
                    // {
                    //     path: '11',
                    //     name: '系统日志',
                    //     icon: 'el-icon-document-checked',
                    //     meta: {
                    //         bread: [
                    //             {path: '/esc/center/11', name: '系统日志'}
                    //         ],
                    //         requireAuth: true,
                    //         role: 1
                    //     },
                    //     component: pages.SystemLog,
                    //     beforeEnter: (to, from, next) => {
                    //         next();
                    //     },
                    // },
                    {
                        path: '',
                        redirect: '1'
                    },
                    {
                        path: '*',
                        redirect: '1'
                    },
                ]
            },
            {
                path: 'org',
                component: pages.PageRouter,
                meta: {
                    requireAuth: true,
                    role: 2
                },
                beforeEnter: (to, from, next) => {
                    next();
                },
                children: [
                    {
                        path: '1',
                        name: '数据快报',
                        icon: 'el-icon-s-data',
                        meta: {
                            bread: [
                                { path: '/esc/org/1', name: '数据快报' }
                            ],
                            requireAuth: true,
                            role: 2
                        },
                        component: () => import('../views/Organization/OrgData.vue'),
                        beforeEnter: (to, from, next) => {
                            next();
                        },
                    },
                    // 下层有伪子路由
                    {
                        path: '2',
                        name: '服务派单',
                        icon: 'el-icon-phone',
                        meta: {
                            bread: [
                                { path: '/esc/org/2', name: '服务派单' }
                            ],
                            requireAuth: true,
                            role: 2
                        },
                        component: () => import('../views/Organization/OrgServiceDesignate.vue'),
                        beforeEnter: (to, from, next) => {
                            next();
                        },
                    },
                    // 伪子路由
                    {
                        path: '2-1',
                        name: '服务详情',
                        icon: 'el-icon-user-solid',
                        meta: {
                            bread: [
                                { path: '/esc/org/2', name: '服务派单' },
                                { path: '/esc/org/2-1', name: '服务详情' }
                            ],
                            requireAuth: true,
                            role: 2,
                            isChild: true
                        },
                        component: () => import('../views/Organization/OrgServiceDesignateDetail.vue'),
                        beforeEnter: (to, from, next) => {
                            next();
                        },
                    },
                    {
                        path: '3',
                        icon: 'el-icon-alarm-clock',
                        meta: {
                            bread: [
                                { path: '/esc/org/3', name: '活动管理' }
                            ],
                            requireAuth: true,
                            role: 2
                        },
                        hasChildName: '活动管理',
                        component: pages.PageRouter,
                        beforeEnter: (to, from, next) => {
                            next();
                        },
                        children: [
                            {
                                path: '3-1',
                                meta: {
                                    bread: [
                                        { path: '/esc/org/3', name: '活动管理' },
                                        { path: '/esc/org/3/3-1', name: '活动记录' }
                                    ],
                                    requireAuth: true,
                                    role: 2
                                },
                                hasChildName: '活动记录',
                                component: pages.PageRouter,
                                beforeEnter: (to, from, next) => {
                                    next();
                                },
                                children: [
                                    {
                                        path: '',
                                        name: '活动记录',
                                        meta: {
                                            bread: [
                                                { path: '/esc/org/3', name: '活动管理' },
                                                { path: '/esc/org/3/3-1', name: '活动记录' }
                                            ],
                                            requireAuth: true,
                                            role: 2
                                        },
                                        component: () => import('../views/Organization/OrgActivityManage.vue'),
                                        beforeEnter: (to, from, next) => {
                                            next();
                                        },
                                    },
                                    {
                                        path: '3-1-1',
                                        name: '活动详情',
                                        meta: {
                                            bread: [
                                                { path: '/esc/org/3', name: '活动管理' },
                                                { path: '/esc/org/3/3-1', name: '活动记录' },
                                                { path: '/esc/org/3/3-1/3-1-1', name: '活动详情' }
                                            ],
                                            requireAuth: true,
                                            role: 2
                                        },
                                        component: () => import('../views/Organization/OrgActivityManageDetail.vue'),
                                        beforeEnter: (to, from, next) => {
                                            next();
                                        },
                                    },
                                    {
                                        path: '*',
                                        redirect: '../3-1'
                                    }
                                ]
                            },
                            {
                                path: '3-2',
                                meta: {
                                    bread: [
                                        { path: '/esc/org/3', name: '活动管理' },
                                        { path: '/esc/org/3/3-2', name: '活动派单' }
                                    ],
                                    requireAuth: true,
                                    role: 2
                                },
                                hasChildName: '活动派单',
                                component: pages.PageRouter,
                                beforeEnter: (to, from, next) => {
                                    next();
                                },
                                children: [
                                    {
                                        path: '',
                                        name: '活动派单',
                                        meta: {
                                            bread: [
                                                { path: '/esc/org/3', name: '活动管理' },
                                                { path: '/esc/org/3/3-2', name: '活动派单' }
                                            ],
                                            requireAuth: true,
                                            role: 2
                                        },
                                        component: () => import('../views/Organization/OrgActivityDesignate.vue'),
                                        beforeEnter: (to, from, next) => {
                                            next();
                                        },
                                    },
                                    {
                                        path: '3-2-1',
                                        name: '活动详情',
                                        meta: {
                                            bread: [
                                                { path: '/esc/org/3', name: '活动管理' },
                                                { path: '/esc/org/3/3-2', name: '活动派单' },
                                                { path: '/esc/org/3/3-2/3-2-1', name: '活动详情' }
                                            ],
                                            requireAuth: true,
                                            role: 2
                                        },
                                        component: () => import('../views/Organization/OrgActivityDesignateDetail.vue'),
                                        beforeEnter: (to, from, next) => {
                                            next();
                                        },
                                    },
                                    {
                                        path: '*',
                                        redirect: '../3-2'
                                    }
                                ]
                            },
                            {
                                path: '',
                                redirect: '3-1'
                            },
                            {
                                path: '*',
                                redirect: '3-1'
                            }
                        ]
                    },
                    {
                        path: '4',
                        name: '业务管理',
                        icon: 'el-icon-document-copy',
                        meta: {
                            bread: [
                                { path: '/esc/org/4', name: '业务管理' }
                            ],
                            requireAuth: true,
                            role: 2
                        },
                        component: () => import('../views/Organization/OrgBusinessManage.vue'),
                        beforeEnter: (to, from, next) => {
                            next();
                        },
                    },
                    {
                        path: '5',
                        icon: 'el-icon-suitcase',
                        hasChildName: '企业管理',
                        meta: {
                            bread: [
                                { path: '/esc/org/5', name: '企业管理' }
                            ],
                            requireAuth: true,
                            role: 2
                        },
                        component: pages.PageRouter,
                        beforeEnter: (to, from, next) => {
                            next();
                        },
                        children: [
                            {
                                path: '5-1',
                                name: '机构信息',
                                meta: {
                                    bread: [
                                        { path: '/esc/org/5', name: '企业管理' },
                                        { path: '/esc/org/5/5-1', name: '机构信息' }
                                    ],
                                    requireAuth: true,
                                    role: 2
                                },
                                component: () => import('../views/Organization/OrgCompanyMsg.vue'),
                                beforeEnter: (to, from, next) => {
                                    next();
                                },
                            },
                            {
                                path: '5-2',
                                name: '员工管理',
                                meta: {
                                    bread: [
                                        { path: '/esc/org/5', name: '企业管理' },
                                        { path: '/esc/org/5/5-2', name: '员工管理' }
                                    ],
                                    requireAuth: true,
                                    role: 2
                                },
                                component: () => import('../views/Organization/OrgStaffManage.vue'),
                                beforeEnter: (to, from, next) => {
                                    next();
                                },
                            },
                            {
                                path: '',
                                redirect: '5-1'
                            },
                            {
                                path: '*',
                                redirect: '5-1'
                            }
                        ]
                    },

                    // 下有伪子路由
                    {
                        path: '6',
                        name: '会员管理',
                        icon: 'el-icon-star-off',
                        meta: {
                            bread: [
                                { path: '/esc/org/6', name: '会员管理' }
                            ],
                            requireAuth: true,
                            role: 2
                        },
                        component: () => import('../views/Organization/OrgMemberManage.vue'),
                        beforeEnter: (to, from, next) => {
                            next();
                        },
                    },
                    // 伪子路由
                    {
                        path: '6-2',
                        name: '会员详情',
                        meta: {
                            bread: [
                                { path: '/esc/org/6', name: '会员管理' },
                                { path: '/esc/org/6-2', name: '会员详情' }
                            ],
                            requireAuth: true,
                            role: 2,
                            isChild: true
                        },
                        component: () => import('../views/Organization/OrgMemberManageDetail.vue'),
                        beforeEnter: (to, from, next) => {
                            next();
                        },
                    },

                    // 下有伪子路由
                    {
                        path: '7',
                        name: '服务记录',
                        icon: 'el-icon-printer',
                        meta: {
                            bread: [
                                { path: '/esc/org/7', name: '服务记录' }
                            ],
                            requireAuth: true,
                            role: 2
                        },
                        component: () => import('../views/Organization/OrgServiceLog.vue'),
                        beforeEnter: (to, from, next) => {
                            next();
                        },
                    },
                    // 伪子路由
                    {
                        path: '7-2',
                        name: '服务详情',
                        meta: {
                            bread: [
                                { path: '/esc/org/7', name: '服务记录' },
                                { path: '/esc/org/7-2', name: '服务详情' }
                            ],
                            requireAuth: true,
                            role: 2,
                            isChild: true
                        },
                        component: () => import('../views/Organization/OrgServiceLogDetail.vue'),
                        beforeEnter: (to, from, next) => {
                            next();
                        },
                    },

                    {
                        path: '8',
                        name: '业绩统计',
                        icon: 'el-icon-data-line',
                        meta: {
                            bread: [
                                { path: '/esc/org/8', name: '业绩统计' }
                            ],
                            requireAuth: true,
                            role: 2
                        },
                        component: () => import('../views/Organization/OrgBusinessStatistic.vue'),
                        beforeEnter: (to, from, next) => {
                            next();
                        },
                    },
                    {
                        path: '',
                        redirect: '1'
                    },
                    {
                        path: '*',
                        redirect: '1'
                    },
                ]
            },
            {
                path: '',
                redirect: to => {
                    let role = JSON.parse(localStorage.getItem('Auth') || '{}').role;
                    // 未登录 跳转center requireAuth会要求登录
                    if (role === 1 || !role) {
                        return 'center'
                    } else if (role === 2) {
                        return 'org'
                    }
                }
            },
            {
                path: '*',
                redirect: to => {
                    let role = JSON.parse(localStorage.getItem('Auth') || '{}').role;
                    // 未登录 跳转center requireAuth会要求登录
                    if (role === 1 || !role) {
                        return 'center'
                    } else if (role === 2) {
                        return 'org'
                    }
                }
            }
        ]
    },
    {
        path: '/forgotPassword',
        component: pages.ForgotPassword,
        beforeEnter: (to, from, next) => {
            next();
        }
    },
    {
        path: '/setPassword',
        component: pages.SetPassword,
        beforeEnter: (to, from, next) => {
            next();
        }
    },
    {
        path: '',
        redirect: '/esc'
    },
    {
        path: '*',
        redirect: '/esc'
    }
]

const router = new VueRouter({
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    NProgress.start();
    // 未登录(没有localstorage) 且访问不是login
    if (to.meta.requireAuth && !localStorage.getItem('Auth')) {
        Message({
            type: 'warning',
            message: '请登录!'
        });
        next('/login')
        NProgress.done();
    } else {
        if (localStorage.getItem('Auth')) {
            // 已经登录 访问的不是login和forgotPassword 鉴权 meta.role 1 需要服务中心Auth.role  2 需要服务机构Auth.role
            if (!(to.path === '/login' || to.path === '/forgotPassword' || to.path === '/setPassword') && to.meta.role !== JSON.parse(localStorage.getItem('Auth')).role ||
                // 区域管理只能admin才能显示
                (to.meta.isAdmin && JSON.parse(localStorage.getItem('Auth')).userName !== 'admin')) {
                Message({
                    type: 'warning',
                    message: '无权访问!'
                });
                next(false);
                NProgress.done();
            } else if (to.path === '/login') {
                Message({
                    type: 'warning',
                    message: '您已经登录'
                });
                next(false);
                NProgress.done();
            } else { // 鉴权ok 访问的不是login
                // 12-30 admin不访问其他路由 只走区域管理 /esc/center/11;
                if (to.fullPath !== '/esc/center/11' && JSON.parse(localStorage.getItem('Auth')).userName === 'admin') {
                    next({ path: '/esc/center/11' })
                    NProgress.done();
                } else {
                    next()
                }

            }
        } else {
            next();
        }
    }
})

router.afterEach(() => {
    NProgress.done();
})

export default router
