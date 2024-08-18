import BinCardTable from 'src/components/systems/material/binCardTable.js';
import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Bin Card',
  },
];

const bincard = () => {
  return (
    <PageContainer title="Bin Card" description="this is bincard page">
      <Breadcrumb title="Bin Card" items={BCrumb} />
      <BinCardTable />
    </PageContainer>
  );
};

export default bincard;
