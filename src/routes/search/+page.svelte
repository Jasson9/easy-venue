<script>
    export let data;
    import VenueCard from "$components/venueCard.svelte";
    
</script>

<main>
    <div class="container md mx-auto py-4">
        <h1 class="text-3xl font-bold text-center">Search Result for: {data.searchKeyword}</h1>
        <div class="flex flex-wrap gap-16 place-content-center">

        {#each data.venues as venue}
            <VenueCard
                venueName={venue.name}
                venueLocation={venue.state}
                price={"Rp "+String(venue.price)}
                capacity={String(venue.capacity)+" people"}
                venueRating={String(venue.rating)}
                imageSrc={venue.image||""}
                data={data}
                wishlistId={data.wishlist.find(wish => wish.venueId == venue.venueId)?.wishlistId}
                venueId={venue.venueId}
            ></VenueCard>
        {/each}
        </div>
    </div>
</main>