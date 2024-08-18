import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import AppCard from 'src/components/shared/AppCard';
import ComSupllier from 'src/components/systems/supplier/ComSupplier'

const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    {
      title: 'Supplier',
    },
  ];

const ComSupplier = () => {
    return (
        <PageContainer title="Suppliers" description="This is suppliers ">
            <Breadcrumb title="SUPPLIER CATALOGUE" items={BCrumb} />
            <ComSupllier/>
        </PageContainer>
    );
};

export default ComSupplier; 