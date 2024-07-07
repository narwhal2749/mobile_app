import React from 'react';
import { useWorkstation } from '../WorkstationProvider';
import FormPage from '../form/components/Form';

export default function Form() {
  const { workstation } = useWorkstation();
  if(workstation){
    return (
      <FormPage workstation={workstation}></FormPage>
    )
  }

  return (
    <>The scanned workstation is not part of your organization</>
  )
}