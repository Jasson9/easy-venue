import type { Venue } from '@prisma/client';
import {client} from './client';

export const getVenues = async () => {
    return await client.venue.findMany();
}

export const searchVenue = async (name: string) => {
    return await client.venue.findMany({
        where: {
            name: {
                contains: name
            }
        }
    });
}

export const getVenue = async (id: string) => {
    return await client.venue.findUnique({
        where: {
            venueId: id
        }
    });
}

export const getVenueReviews = async (id: string) => {
    return await client.review.findMany({
        where: {
            venueId: id
        }
    });
}

export const addVenue = async (venue: Venue)=>{
    return await client.venue.create({
        data: venue
    });
}

export const deleteVenue = async (id: string)=>{
    return await client.venue.delete({
        where: {
            venueId: id
        }
    });
}

export const deleteAllVenues = async ()=>{
    return await client.venue.deleteMany();
}