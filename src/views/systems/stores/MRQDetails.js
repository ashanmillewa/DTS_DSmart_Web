import React, { useState } from 'react';
import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import AppCard from '../../../components/shared/AppCard';
import ComMrq from '../../../components/systems/stores-transactions/MRQ-D/ComMrq'

const MRQ = () => {
    return (
        <PageContainer title="MRQ Details" description="This is MRQ Details">
            <Breadcrumb title="Material Requisition (MRQ)" subtitle="" />
            <AppCard />
            <ComMrq />
        </PageContainer>
    );
};

export default MRQ; 