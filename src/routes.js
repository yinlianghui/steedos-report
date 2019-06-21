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
    },
    {
        path: '/designer/:id',
        exact: true,
        component: ReportDesigner,
    },
    {
        path: '/viewer/:id',
        exact: true,
        component: ReportViewer,
    },
    {
        component: NotFound
    }
];

export default Routes;