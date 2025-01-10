
import StartPage from './components/StartPage.vue'
import MyMindMap from './components/MindMap.vue'
import societyMenu from './components/model_file/index.vue'
import ProcessPage from './components/ProcessPage.vue'
import BpmnPage from './components/service_pattern_page/BPMN.vue'
import LogPage from './components/LogIn.vue'
import societyManagementMenu from './components/society_file/index.vue'
import societyPatternManagementMenu from './components/service_pattern_file/index.vue'
import MyMindMapSociety from './components/MindMapSociety.vue'
import BpmnSociety from './components/BPMNSociety.vue'
import societyRecommand from './components/Recommand.vue'

const routers = [
    {
        path: '/LogIn',
        name: 'LogInPage',
        component: LogPage,
    },
    {
        path: '/',
        name: 'startPage',
        component: StartPage,
    },
    {
        path: '/mindMap',
        name: 'mindMap',
        component: MyMindMap,
        children: [
        ]

    },
    {
        path: '/MyMindMapSociety',
        name: 'MyMindMapSociety',
        component: MyMindMapSociety,
        children: [
        ]

    },
    {
        path: '/mindMapEdit',
        name: 'mindMapEdit',
        component: MyMindMap,
        children: [
        ]

    },
    {
        path: '/societyMenu',
        name: 'societyMenu',
        component: societyMenu,
        children: [
        ]

    },
    {
        path: '/societyPatternProcessPage',
        name: 'societyPatternProcessPage',
        component: ProcessPage,
        children: [
        ],
        meta: { keepAlive: true }

    },
    {
        path: '/bppmDisplayPage',
        name: 'bpmnDisplayPage',
        component: BpmnPage,
        children: [
        ]

    },
    {
        path: '/bpmnSocietyDisplayPage',
        name: 'bpmnSocietyDisplayPage',
        component: BpmnSociety,
        children: [
        ]

    },
    {
        path: '/bppmDisplayPageEdit',
        name: 'bpmnDisplayPageEdit',
        component: BpmnPage,
        children: [
        ]

    },
    {
        path: '/societyCreatePage',
        name: 'societyCreatePage',
        component: societyManagementMenu,
        children: [
        ]

    },
    {
        path: '/societyPatternManagementPage',
        name: 'societyPatternManagementPage',
        component: societyPatternManagementMenu,
        children: [
        ]

    },
    {
        path: '/societyRecommand',
        name: 'societyRecommand',
        component: societyRecommand,
        children: [
        ]

    }
]
export default routers
