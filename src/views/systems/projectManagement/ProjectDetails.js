import React, { useState } from 'react';
import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import AppCard from 'src/components/shared/AppCard';
import ComProject from 'src/components/systems/projectManagement/projectDetails/ComProject';

const ProjectDetails = () => {
    return (
        <PageContainer title="Project Management" description="This is Project Management ">
            <Breadcrumb title="Project Management " subtitle="" />
            <AppCard />
            <ComProject/>
        </PageContainer>
    );
};

export default ProjectDetails; 