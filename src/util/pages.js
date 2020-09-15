import Home from '../views/Home.vue' // 主页
import Data from "../views/Data"  // 中心数据快报
import ComponyMsg from "../views/ComponyMsg" // 中心信息
import PageRouter from "../views/PageRouter"  // 中间路由
import ServiceItem from "../views/ServiceItem" // 中心服务项目管理
import ServiceType from "../views/ServiceType" // 中心服务类型管理
import BranchOrg from "../views/BranchOrg" // 中心分支机构
import CallRecord from "../views/CallRecord" // 中心来电记录
import CallRecordDetail from "../views/CallRecordDetail" // 中心来电记录详情
import OrderDesignate from "../views/OrderDesignate" // 中心订单派工
import OrderDesignateDetail from "../views/OrderDesignateDetail" // 中心订单派工详情
import OrtherRequest from "../views/OrtherRequest" // 中心其他需求
import OrtherRequestDetail from "../views/OrtherRequestDetail"// 中心其他需求详情
import StaffManage from "../views/StaffManage"  // 中心人员管理
import ServiceRecord from "../views/ServiceRecord" // 中心服务记录
import ServiceRecordOrderDetail from "../views/ServiceRecordOrderDetail" // 中心服务记录详情
import ServiceRecordActivityDetail from "../views/ServiceRecordActivityDetail" // 中心活动记录详情
import ActivityManage from "../views/ActivityManage" // 中心活动管理
import StaffInfo from "../views/StaffInfo" // 中心员工信息
import StaffDetail from "../views/StaffDetail" // 中心员工详情
import MemberManage from "../views/MemberManage" // 中心会员管理
import MemberManageDetail from "../views/MemberManageDetail" // 中心会员详情
import AccountManage from "../views/AccountManage" // 中心账号管理
import AccountManageDetail from "../views/AccountManageDetail" // 中心账号管理详情
import SettlementManage from "../views/SettlementManage" // 中心结算管理
import ActivityApprove from "../views/ActivityApprove" // 中心活动审批
import ActivityApproveDetail from "../views/ActivityApproveDetail" // 中心活动审批详情
import ActivityManageDetail from "../views/ActivityManageDetail" // 中心活动管理详情
import SystemLog from "../views/SystemLog" // 系统日志
import SetPassword from "../views/SetPassword" // 修改密码
import AreaManage from "../views/AreaManage" // 区域管理



// 构建时views文件夹下的页面会被构建，但是views文件夹下的文件夹下的组件不会被构建，所以路由找不到，使用异步组件，问题可解决。
import OrgActivityManage from "../views/Organization/OrgActivityManage"

import Login from "../views/Login"
import ForgotPassword from "../views/ForgotPassword"




export {
    Home,
    Data,
    ComponyMsg,
    PageRouter,
    ServiceItem,
    ServiceType,
    BranchOrg,
    CallRecord,
    CallRecordDetail,
    OrderDesignate,
    OrderDesignateDetail,
    OrtherRequest,
    OrtherRequestDetail,
    StaffManage,
    ServiceRecord,
    ServiceRecordOrderDetail,
    ServiceRecordActivityDetail,
    ActivityManage,
    StaffInfo,
    StaffDetail,
    MemberManage,
    MemberManageDetail,
    AccountManage,
    AccountManageDetail,
    SettlementManage,
    SystemLog,
    ActivityApprove,
    SetPassword,
    ActivityApproveDetail,
    ActivityManageDetail,
    Login,
    ForgotPassword,
    AreaManage
}
