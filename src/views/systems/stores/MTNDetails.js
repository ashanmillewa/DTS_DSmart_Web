import React, { useState } from 'react';
import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import AppCard from 'src/components/shared/AppCard';
import ComMtn from 'src/components/systems/stores-transactions/MTN-D/ComMtn'

const MTN = () => {
    return (
        <PageContainer title="MTN Details" description="This is MTN Details">
            <Breadcrumb title="Purchase Return Note (MTN)" subtitle="" />
            <AppCard />
            <ComMtn />
        </PageContainer>
    );
};

export default MTN; 