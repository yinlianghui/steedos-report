import ReportList from './components/report-list';
import ReportDesigner from './components/report-designer';
import ReportViewer from './components/report-viewer';
import NotFound from './components/not-found';

import loadData from './helpers/load-data';

const Routes = [
    {
        path: '/',
        exact: true,
        component: ReportList,
        loadData: () => loadData('list', true)
    },
    {
        path: '/:id',
        exact: true,
        component: ReportViewer,
        isReport: true
    },
    {
        path: '/designer/:id',
        exact: true,
        component: ReportDesigner,
        isReport: true
    },
    {
        path: '/viewer/:id',
        exact: true,
        component: ReportViewer,
        isReport: true
    },
    {
        component: NotFound
    }
];

export default Routes;