import asyncComponent from '../../asyncComponent'
const TemplateMag = asyncComponent(() => import('../../views/templateMag/templateMag'))
const TemplateDetail = asyncComponent(() => import('../../views/templateMag/templateDetail'))
const TemplateEdit = asyncComponent(() => import('../../views/templateMag/templateEdit'))
const TestPage = asyncComponent(() => import('../../testPage'))

export default {
  TemplateMag,
  TemplateDetail,
  TemplateEdit,
  TestPage
}
