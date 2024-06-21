import { addVenue, deleteAllVenues } from "$lib/venues"
import dummyVenues from './dummy-venues.json'

export async function load(event){
    await deleteAllVenues()
    for (let venue of dummyVenues){
        let newVenue = venue as any
        newVenue.updatedAt = new Date()
        newVenue.createdAt = new Date()
        await addVenue(newVenue)
    }
}
