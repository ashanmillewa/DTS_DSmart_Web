import React, { useState } from 'react';
import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import AppCard from 'src/components/shared/AppCard';
import ComMrn from 'src/components/systems/stores-transactions/MRN-D/ComMrn'

const MRN = () => {
    return (
        <PageContainer title="MRN Details" description="This is MRN Details">
        <Breadcrumb title="Material Return Note (MRN)" subtitle="" />
        <AppCard />
        <ComMrn/>
    </PageContainer>
    );
};

export default MRN; 