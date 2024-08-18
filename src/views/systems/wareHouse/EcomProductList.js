import React from 'react';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../components/container/PageContainer';
import ProductTableList from 'src/components/systems/warehouse/warehouseManagementDetails.js';
import BlankCard from '../../../components/shared/BlankCard';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Shop',
  },
];

const EcomProductList = () => {
  return (
    <PageContainer title="WareHouse Management Details" description="this is warehouse Management Details page">
      <Breadcrumb title="WareHouse Management Details" items={BCrumb} />
      <BlankCard>
        <ProductTableList />
      </BlankCard>
    </PageContainer>
  );
};

export default EcomProductList;
