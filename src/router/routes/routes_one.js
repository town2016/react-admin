export default [
  {
    name: '进件模板管理',
    id: 'templateMag',
    path: '/templateMag',
    component: 'TemplateMag',
    icon: 'file',
    keyPath: ['home','templateMag']
  },
  {
    name: '进件模板详情',
    id: 'templateDetail',
    path: '/templateDetail/:templateId',
    component: 'TemplateDetail',
    keyPath: ['home','templateMag', 'templateDetail']
  },
  {
    name: '进件模板编辑',
    id: 'templateEdit',
    path: '/templateEdit/:templateId?',
    component: 'TemplateEdit',
    keyPath: ['home','templateMag', 'templateEdit']
  },
  {
    name: '测试页',
    id: 'testPage',
    path: '/testPage',
    component: 'TestPage',
    keyPath: ['home','testPage']
  }
]
