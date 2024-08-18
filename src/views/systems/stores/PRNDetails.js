import React, { useState } from 'react';
import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import AppCard from 'src/components/shared/AppCard';
import ComPrn from 'src/components/systems/stores-transactions/PRN-D/ComPrn'

const PRN = () => {
    return (
        <PageContainer title="PRN Details" description="This is PRN Details">
            <Breadcrumb title="Purchase Return Note (PRN)" subtitle="" />
            <AppCard />
            <ComPrn />
        </PageContainer>
    );
};

export default PRN; 