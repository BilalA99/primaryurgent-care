import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import BookAppointmentForm from './ui/BookAppointmentForm'

const BookAnAppointmentPopup = ({children}: {children: React.ReactNode}) => {
  return (
    <Dialog>
        <DialogTrigger asChild>
            {children}
        </DialogTrigger>
        <DialogContent className='bg-[#F2F6FC]'>
            <DialogHeader>
                <DialogTitle></DialogTitle>
            </DialogHeader>
            <BookAppointmentForm />
        </DialogContent>
    </Dialog>
  )
}

export default BookAnAppointmentPopup