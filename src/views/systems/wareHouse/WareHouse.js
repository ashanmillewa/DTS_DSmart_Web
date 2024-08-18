import React, { useState } from 'react';
import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import AppCard from 'src/components/shared/AppCard';

const WareHouse = () => {
    return (
        <PageContainer title="WareHouse Management" description="This is WareHouse Management">
            <Breadcrumb title="WareHouse Management" subtitle="test page" />
            <AppCard />
        </PageContainer>
    );
};

export default WareHouse;