'use client'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

export default function CalendarClient( { events } : { events: any[] }) {
    return (
        <FullCalendar
            plugins={[ dayGridPlugin ]}
            initialView="dayGridMonth"
            weekends={false}
            events={events}
            displayEventTime={false}
        />
    )
}