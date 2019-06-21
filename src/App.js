import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ReportList from './components/report-list';
import ReportDesigner from './components/report-designer';
import ReportViewer from './components/report-viewer';
import NotFound from './components/not-found';

import './App.css';

const App = () => (
  <Switch>
    <Route exact path="/" component={ReportList} />
    <Route exact path="/:id" component={ReportViewer} />
    <Route exact path="/designer/:id" component={ReportDesigner} />
    <Route exact path="/viewer/:id" component={ReportViewer} />
    <Route component={NotFound} />
  </Switch>
);

export default App;
