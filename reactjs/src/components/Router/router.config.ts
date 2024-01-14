import LoadableComponent from './../Loadable/index';
import {
  HomeOutlined, UserOutlined, TagsOutlined, AppstoreOutlined, InfoCircleOutlined,
  SolutionOutlined
} from '@ant-design/icons';

export const userRouter: any = [
  {
    path: '/user',
    name: 'user',
    title: 'User',
    component: LoadableComponent(() => import('../../components/Layout/UserLayout')),
    isLayout: true,
    showInMenu: false,
  },
  {
    path: '/user/login',
    name: 'login',
    title: 'LogIn',
    component: LoadableComponent(() => import('../../scenes/Login')),
    showInMenu: false,
  },
];

export const appRouters: any = [
  {
    path: '/',
    exact: true,
    name: 'home',
    permission: '',
    title: 'Home',
    component: LoadableComponent(() => import('../../components/Layout/AppLayout')),
    isLayout: true,
    showInMenu: false,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    permission: '',
    title: 'Dashboard',
    icon: HomeOutlined,
    showInMenu: true,
    component: LoadableComponent(() => import('../../scenes/Dashboard')),
  },
  {
    path: '/users',
    permission: 'Pages.Users',
    title: 'Users',
    name: 'user',
    icon: UserOutlined,
    showInMenu: false,
    component: LoadableComponent(() => import('../../scenes/Users')),
  },
  {
    path: '/teachers',
    permission: 'Pages.Users',
    title: 'Teachers',
    name: 'teacher',
    icon: SolutionOutlined,
    showInMenu: false,
    component: LoadableComponent(() => import('../../scenes/Teachers')),
  },
  {
    path: '/tenants',
    permission: 'Pages.Tenants',
    title: 'Tenants',
    name: 'tenant',
    icon: AppstoreOutlined,
    showInMenu: false,
    component: LoadableComponent(() => import('../../scenes/Tenants')),
  },
  {
    path: '/about',
    permission: '',
    title: 'About',
    name: 'about',
    icon: InfoCircleOutlined,
    showInMenu: false,
    component: LoadableComponent(() => import('../../scenes/About')),
  },
  {
    path: '/roles',
    permission: 'Pages.Roles',
    title: 'Roles',
    name: 'role',
    icon: TagsOutlined,
    showInMenu: true,
    component: LoadableComponent(() => import('../../scenes/Roles')),
  },
  {
    //path: '/teachers',
    permission: 'Pages.Users',
    title: 'Quản lý người dùng',
    name: 'Quản lý người dùng',
    icon: SolutionOutlined,
    showInMenu: true,
    // component: LoadableComponent(() => import('../../scenes/Teachers')),
    element: [
      {
        path: '/teachers',
        permission: 'Pages.Users',
        title: 'Teachers',
        name: 'teacher',
        icon: SolutionOutlined,
        showInMenu: true,
        component: LoadableComponent(() => import('../../scenes/Teachers')),
      },
      {
        path: '/users',
        permission: 'Pages.Users',
        title: 'Users',
        name: 'user',
        icon: UserOutlined,
        showInMenu: true,
        component: LoadableComponent(() => import('../../scenes/Users')),
      }
    ]
  },
  {
    path: '/tenants',
    permission: 'Pages.Tenants',
    title: 'Tenants',
    name: 'tenant',
    icon: AppstoreOutlined,
    showInMenu: true,
    component: LoadableComponent(() => import('../../scenes/Tenants')),
  },
  {
    path: '/about',
    permission: '',
    title: 'About',
    name: 'about',
    icon: InfoCircleOutlined,
    showInMenu: true,
    component: LoadableComponent(() => import('../../scenes/About')),
  },
  {
    path: '/logout',
    permission: '',
    title: 'Logout',
    name: 'logout',
    showInMenu: false,
    component: LoadableComponent(() => import('../../components/Logout')),
  },
  {
    path: '/exception?:type',
    permission: '',
    title: 'exception',
    name: 'exception',
    showInMenu: false,
    component: LoadableComponent(() => import('../../scenes/Exception')),
  },
  {
    path: '/teachers',
    permission: 'Pages.Users',
    title: 'Teachers',
    name: 'teacher',
    icon: SolutionOutlined,
    showInMenu: true,
    component: LoadableComponent(() => import('../../scenes/Teachers')),
    element: [
      {
        path: '/teachers',
        permission: 'Pages.Users',
        title: 'Teachers',
        name: 'teacher',
        icon: SolutionOutlined,
        showInMenu: true,
        component: LoadableComponent(() => import('../../scenes/Teachers')),
      },
      {
        path: '/users',
        permission: 'Pages.Users',
        title: 'Users',
        name: 'user',
        icon: UserOutlined,
        showInMenu: true,
        component: LoadableComponent(() => import('../../scenes/Users')),
      }
    ]
  }
];

export const routers = [...userRouter, ...appRouters];
