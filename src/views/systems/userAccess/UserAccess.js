import React, { useState } from 'react';
import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import AppCard from 'src/components/shared/AppCard';

const UserAccess = () => {
    return (
        <PageContainer title="User Access" description="This is user access">
            <Breadcrumb title="User Access" subtitle="test page" />
            <AppCard />
            <h1>abc</h1>
        </PageContainer>
    );
};

export default UserAccess; 