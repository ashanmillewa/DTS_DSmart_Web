import React, { useState } from 'react';
import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import AppCard from 'src/components/shared/AppCard';
import ComGrn from 'src/components/systems/stores-transactions/GRN-D/ComGrn'

const GRN = () => {
    return (
        <PageContainer title="GRN Details" description="This is GRN Details">
        <Breadcrumb title="Good Received Details (GRN)" subtitle="" />
        <AppCard />
        <ComGrn />
        
    </PageContainer>
    );
};

export default GRN;