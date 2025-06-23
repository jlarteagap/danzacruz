import { updateRegister, deleteRegister } from '@/lib/firebase'

import DeleteConfirmationDialog from './DeleteConfirmationDialog'
import UpdateStatusButton from './UpdateStatusButton'

export default function ActionButtons({ id, status, collection }) {
  const updateDoc = (id, status) => {
    updateRegister(id, { status }, collection)
  }

  const deleteDoc = id => {
    deleteRegister(id, collection)
  }

  return (
    <>
      <DeleteConfirmationDialog id={id} onDelete={deleteDoc} />
      <UpdateStatusButton id={id} status={status} onUpdate={updateDoc} />
    </>
  )
}
