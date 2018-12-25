import moment from 'moment'

export const DateFormat = (date, type) => {
    let time =  moment( new Date(date) ).format( type )
    return time
}

export const DateTimeStamp = (date) => {
    let timeStamp = moment( new Date(date) ).valueOf()
    return timeStamp
}