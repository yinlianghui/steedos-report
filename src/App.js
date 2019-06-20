import React from 'react';
import { Route } from 'react-router-dom'
import ReportList from './components/report-list';
import ReportDesigner from './components/report-designer';
import ReportViewer from './components/report-viewer';

import './App.css';

const App = () => (
  <div>
    <Route exact path="/" component={ReportList} />
    <Route exact path="/:id" component={ReportViewer} />
    <Route exact path="/designer/:id" component={ReportDesigner} />
    <Route exact path="/viewer/:id" component={ReportViewer} />
  </div>
);

export default App;
