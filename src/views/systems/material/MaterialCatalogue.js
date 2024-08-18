import MaterialCatalogueTbale from 'src/components/systems/material/materialCatalogueTbale.js';
import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Material Catalogue',
  },
];

const MaterialCatalogue = () => {
  return (
    <PageContainer title="Material Catalogue" description="This is Material Catalogue  ">
      <Breadcrumb title="Material Catalogue" items={BCrumb} />
      <MaterialCatalogueTbale />
    </PageContainer>
  );
};

export default MaterialCatalogue;
