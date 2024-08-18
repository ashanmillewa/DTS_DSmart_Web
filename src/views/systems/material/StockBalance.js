import React from 'react';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../components/container/PageContainer';
import StockBalanceTable from 'src/components/systems/material/stockBalanceTable.js';
import BlankCard from '../../../components/shared/BlankCard';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Stock Balance',
  },
];

const bincard = () => {
  return (
    <PageContainer title="Stock Balance" description="this is bincard page">
      <Breadcrumb title="Stock Balance" items={BCrumb} />
      <BlankCard>
        <StockBalanceTable />
      </BlankCard>
    </PageContainer>
  );
};

export default bincard;
