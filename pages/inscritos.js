import React from 'react'
import { ListSubscribers } from '../src/components/subscribers/listSubscribers'
import { getSubscribers } from '../firebase'

export const getServerSideProps = async () => {
  const data = []
  const getListOfSusbcribers = await getSubscribers()
  getListOfSusbcribers.forEach(doc => {
    data.push({ id: doc.id, ...doc.data() })
  })
  return {
    props: { data }
  }
}

const Inscritos = ({ data }) => {
  return (
    <div className="card mt-6">
      <div className="card-header is-flex is-justify-content-center">
        <h2 className="is-size-3">Lista de inscritos</h2>
      </div>
      <div className="card-content">
        <ListSubscribers data={data} />
      </div>
    </div>
  )
}

export default Inscritos
