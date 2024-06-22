<script lang="ts">
    export let data;
    import Button from "$components/button.svelte"
    import VenueCard from "$components/venueCard.svelte";
    import type { Venue } from "@prisma/client"
    let venues:Venue[] = [];
    let loading = false;
    let recommendationCriteria = "";
    let criteriaLabel = "";
    async function getRecommendation(){
        loading = true;
        const res = await fetch("/api/recommendation", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                criteria: recommendationCriteria
            }),
        });
        venues = (await res.json()).venues;
        criteriaLabel = String(recommendationCriteria);
        loading = false;
    }
</script>

<main>
    <div class="container md mx-auto py-4">
        <form class="flex flex-col gap-4 items-center" on:submit={getRecommendation}>
            <label for="recommendationCriteria">Recommendation Criteria</label>
            <input placeholder="Hotel" bind:value={recommendationCriteria} type="text" id="recommendationCriteria" class="rounded-lg border border-gray-300 p-2 w-4/6"/>
            <!-- <button type="submit" class="rounded-lg bg-blue-500 text-white p-2 w-full mt-2"></button> -->
            <Button class="orange" type="submit">Get Recommendation</Button>
        </form>
        {#if loading}
            <p>Loading...</p>
        {/if}
        {#if venues.length > 0}
            <h1 class="text-3xl font-bold text-center">Recommendation for: {criteriaLabel}</h1>
                <div class="flex flex-wrap gap-16 place-content-center">
                {#each venues as venue}
                    <VenueCard
                        venueName={venue.name}
                        venueLocation={venue.state}
                        price={"Rp "+String(venue.price)}
                        capacity={String(venue.capacity)+" people"}
                        venueRating={String(venue.rating)}
                        imageSrc={venue?.image||""}
                        data={data}
                        wishlistId={data.wishlist.find(wish => wish.venueId == venue.venueId)?.wishlistId}
                        venueId={venue.venueId}
                    ></VenueCard>
                {/each}
            </div>
        {/if}        
    </div>
</main>