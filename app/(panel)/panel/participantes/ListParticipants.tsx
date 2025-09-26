"use client";

import { useState, useEffect } from "react";

import { getSubscribers } from "@/lib/firebase";
import { Subscriber, Unsubscribe } from "./ListParticipants.type";
import ActionButtons from "@/components/ActionButtons/ActionButtons";

export default function ParticipantesList({
  initialData,
}: {
  initialData: Subscriber[];
}) {
  const [data, setData] = useState<Subscriber[]>(initialData);

  useEffect(() => {
    const getClientData = getSubscribers("register") as (
      callback: (data: Subscriber[]) => void
    ) => Unsubscribe;
    const unsubscribe = getClientData(setData);

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      {data.map((sub) => {
        const {
          id,
          name,
          phone,
          modalidity,
          coreografy,
          professor,
          category,
          division,
          subDivision,
          status,
          song,
          notes,
          add,
        } = sub;

        return (
          <div key={id}>
            <div className='grid gap-3 grid-cols-5 bg-white p-5 rounded-md shadow-sm my-3'>
              <div className='flex flex-col'>
                <p className='font-semibold'>{name}</p>
                <span className='text-sm'>{phone}</span>
              </div>
              <div className='text-sm'>
                <strong>Modalidad: </strong> {modalidity} <br />
                <strong>Categoria: </strong> {category} <br />
                <strong>Division: </strong> {division} <br />
                <strong>Sub Division: </strong> {subDivision} <br />
              </div>
              <div className='text-sm'>
                <strong>Coreografía: </strong>
                <br /> {coreografy}
                <br />
                <strong>Nombre de la canción: </strong>
                <br /> {song}
                <br />
                <strong>Profesor / Coreografo: </strong>
                <br />
                {professor}
              </div>
              <div className='text-sm'>
                <p>
                  <strong>Aclaraciones sobre la modalidad: </strong>
                  <br />
                  {notes === "" ? "Ninguna" : notes}
                </p>
                <p>
                  <strong>Información adicional:</strong>
                  <br />
                  {add === "" ? "Ninguna" : add}
                </p>
              </div>
              <div className='flex justify-center'>
                <ActionButtons id={id} status={status} collection='register' />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
