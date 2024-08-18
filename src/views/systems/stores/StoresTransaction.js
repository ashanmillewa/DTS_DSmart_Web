import React from 'react';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../components/container/PageContainer';
import StoresTransactionTable from 'src/components/systems/material/storesTransactionTable.js';
import BlankCard from '../../../components/shared/BlankCard';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Stores Transacions',
  },
];

const bincard = () => {
  return (
    <PageContainer title="Stores Transacions" description="this is bincard page">
      <Breadcrumb title="Stores Transacions" items={BCrumb} />
      <BlankCard>
        <StoresTransactionTable />
      </BlankCard>
    </PageContainer>
  );
};

export default bincard;
