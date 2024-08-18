import React from 'react';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import AppCard from 'src/components/shared/AppCard';
import PageContainer from '../../../components/container/PageContainer';
import ProjectMatCost from 'src/components/systems/material/projectMatCost';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Material Catalogue',
  },
];

const ProjectMaterialCost = () => {
  return (
    <PageContainer title="Project Material Cost" description="This is ProjectMatCost  ">
      <Breadcrumb title="Project Material Cost" items={BCrumb} />
      <AppCard />
      <ProjectMatCost />
    </PageContainer>
  );
};

export default ProjectMaterialCost;
