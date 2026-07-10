import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { AdminDataTable, type Column } from '../../components/admin/AdminDataTable';
import { GenericFormModal, type FormField } from '../../components/admin/GenericFormModal';
import { APP_NAME } from '../../constants';

interface AdminGenericPageProps {
  title: string;
  fetchData: () => Promise<any>;
  createData?: (data: any) => Promise<any>;
  updateData?: (id: string, data: any) => Promise<any>;
  deleteData?: (id: string) => Promise<any>;
  columns: Column<any>[];
  formFields?: FormField[];
}

const AdminGenericPage: React.FC<AdminGenericPageProps> = ({ title, fetchData, createData, updateData, deleteData, columns, formFields }) => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any | null>(null);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        setIsLoading(true);
        const res = await fetchData();
        if (!isMounted) return;
        
        let actualData = res?.data?.data;
        if (actualData && !Array.isArray(actualData)) {
           // Handle pagination objects like { blogs: [], pagination: {} }
           actualData = actualData.blogs || actualData.users || Object.values(actualData).find(Array.isArray) || [];
        }
        setData(Array.isArray(actualData) ? actualData : []);
      } catch (err) {
        console.error(`Error fetching data for ${title}:`, err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    load();
    return () => { isMounted = false; };
  }, [fetchData, title]); // title dependency helps reset when switching tabs

  const handleCreateOrUpdate = async (formData: any) => {
    if (editingRecord && updateData) {
      await updateData(editingRecord._id, formData);
    } else if (createData) {
      await createData(formData);
    } else {
      return;
    }
    
    // Refetch data after creation/update
    const res = await fetchData();
    let actualData = res?.data?.data;
    if (actualData && !Array.isArray(actualData)) {
       actualData = actualData.blogs || actualData.users || Object.values(actualData).find(Array.isArray) || [];
    }
    setData(Array.isArray(actualData) ? actualData : []);
  };

  const handleEdit = (row: any) => {
    setEditingRecord(row);
    setIsModalOpen(true);
  };
  

  const handleDelete = async (row: any) => {
    if (!deleteData) return;
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await deleteData(row._id);
        const res = await fetchData();
        let actualData = res?.data?.data;
        if (actualData && !Array.isArray(actualData)) {
           actualData = actualData.blogs || actualData.users || Object.values(actualData).find(Array.isArray) || [];
        }
        setData(Array.isArray(actualData) ? actualData : []);
      } catch (err) {
        console.error('Failed to delete:', err);
      }
    }
  };

  return (
    <>
      <Helmet><title>{title} — Admin | {APP_NAME}</title></Helmet>
      <div className="h-[calc(100vh-8rem)]">
        <AdminDataTable
          title={title}
          columns={columns}
          data={data}
          isLoading={isLoading}
          onEdit={updateData ? handleEdit : undefined}
          onDelete={deleteData ? handleDelete : undefined}
          onAdd={createData && formFields ? () => {
            setEditingRecord(null);
            setIsModalOpen(true);
          } : undefined}
          addLabel={`Add ${title.replace('Manage ', '')}`}
        />
      </div>

      {formFields && (
        <GenericFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={`${editingRecord ? 'Edit' : 'Add New'} ${title.replace('Manage ', '')}`}
          fields={formFields}
          initialData={editingRecord}
          onSubmit={handleCreateOrUpdate}
        />
      )}
    </>
  );
};

export default AdminGenericPage;
